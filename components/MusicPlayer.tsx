'use client';

import { useState, useEffect, useRef } from 'react';

interface MusicPlayerProps {
  audioSource: string;
  autoplay?: boolean;
}

export const MusicPlayer = ({ audioSource, autoplay = true }: MusicPlayerProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [needsManualPlay, setNeedsManualPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const startPlayback = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    try {
      await audio.play();
      setNeedsManualPlay(false);
    } catch {
      setNeedsManualPlay(true);
    }
  };

  useEffect(() => {
    if (isMounted && autoplay) {
      void startPlayback();

      const resumeOnFirstGesture = () => {
        void startPlayback();
      };

      window.addEventListener("pointerdown", resumeOnFirstGesture, {
        once: true,
      });
      window.addEventListener("touchstart", resumeOnFirstGesture, {
        once: true,
      });

      return () => {
        window.removeEventListener("pointerdown", resumeOnFirstGesture);
        window.removeEventListener("touchstart", resumeOnFirstGesture);
      };
    }
  }, [autoplay, isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <audio ref={audioRef} src={audioSource} loop className="hidden" />

      {needsManualPlay && (
        <button
          type="button"
          onClick={() => void startPlayback()}
          className="fixed bottom-4 left-4 z-[60] rounded-full bg-black/80 px-4 py-2 text-xs font-medium text-white shadow-lg backdrop-blur"
        >
          Tap to play music
        </button>
      )}
    </>
  );
};