"use client"

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Hls from "hls.js";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const [videoReady, setVideoReady] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamUrl =
    "https://ucarecdn.com/d41bcd92-cf4a-45f2-a82c-4de915a3cbd3/adaptive_video/";

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        startLevel: -1,
      });

      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => undefined);
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          setVideoReady(true);
        }
      });

      return () => {
        hls.destroy();
      };
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;
      video.play().catch(() => undefined);
    }
  }, []);

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={`absolute left-0 top-0 size-full object-cover object-center transition-opacity duration-700 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoReady(true)}
        />

        {!videoReady && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/15 backdrop-blur-[2px]">
            <div className="flex items-center gap-3 rounded-full bg-white/60 px-4 py-2 text-sm text-black shadow-sm">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
              Loading video
            </div>
          </div>
        )}

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-white">
          LOVE
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              A Real story by anshu <br /> For his beloved
            </p>

            <span className="inline-flex rounded-full bg-yellow-300 px-7 py-3 font-general text-xs uppercase text-black">
              Watch trailer
            </span>
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        LOVE
      </h1>
    </div>
  );
};

export default Hero;