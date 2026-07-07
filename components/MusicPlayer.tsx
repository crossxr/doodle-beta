'use client';

import { useState, useEffect, useRef } from 'react';

interface MusicPlayerProps {
  audioSource: string;
  autoplay?: boolean;
}

export const MusicPlayer = ({ audioSource, autoplay = true }: MusicPlayerProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && autoplay) {
      // Attempt to autoplay only after component is mounted
      const playPromise = audioRef.current?.play();
      if (playPromise !== undefined) {
        playPromise
          .catch(() => {
            return;
          });
      }
    }
  }, [autoplay, isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <audio
      ref={audioRef}
      src={audioSource}
      loop
      className="hidden"
    />
  );
};