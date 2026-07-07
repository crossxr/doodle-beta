"use client";

import { useEffect, useRef, useState, ReactNode, MouseEvent } from "react";
import { ArrowBigLeft } from "lucide-react";
import { GlitchText } from "../GlitchText";
import Hls from "hls.js";

interface BentoTiltProps {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps {
  src: string;
  title: ReactNode;
  description?: string;
}

export const BentoTilt: React.FC<BentoTiltProps> = ({
  children,
  className = "",
}) => {
  const [transformStyle, setTransformStyle] = useState<string>("");
  const itemRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>): void => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = (): void => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard: React.FC<BentoCardProps> = ({
  src,
  title,
  description,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true, startLevel: -1 });

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => undefined);
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          video.play().catch(() => undefined);
        }
      });

      return () => {
        hls.destroy();
      };
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.load();
      video.play().catch(() => undefined);
    }
  }, [src, isInView]);

  return (
    <div ref={containerRef} className="relative size-full">
      <video
        ref={videoRef}
        loop
        muted
        autoPlay
        playsInline
        preload={isInView ? "auto" : "none"}
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Features: React.FC = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10 p-4">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">Hii ...</p>
        <GlitchText
          className="max-w-md font-circular-web text-lg text-blue-50 opacity-50"
          text="Nothing much here...!! Happy birthday!"
        />
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="/videos/summer.mp4"
          title={
            <>
              vacati<b>o</b>n
            </>
          }
          description="Travelling with you will be the most amazing thing I will ever do."
        />
      </BentoTilt>

      <div className="grid h-[350vh] w-full grid-cols-2 grid-rows-7 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
              src="/videos/latte.mp4"
            title={
              <>
                Lo<b>v</b>e
              </>
            }
            description="How beautiful it is to find someone who wants nothing but your company:)"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 ms-0">
          <BentoCard
              src="/videos/bakery.mp4"
            title={
              <>
                yu<b>m</b>my
              </>
            }
            description="Tere aankhone ke siwa is duniya mein aur rakha kya he?"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 md:col-span-1 md:me-0">
          <BentoCard
              src="/videos/happy.mp4"
            title={
              <>
                cr<b>a</b>zy
              </>
            }
            description="When you smile, everything around me stops for a while"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
            </h1>

            <ArrowBigLeft className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <video
            src="/videos/vietnam.mp4"
            loop
            muted
            autoPlay
            playsInline
            preload="metadata"
            className="size-full object-cover object-center"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-2 md:row-span-2">
          <BentoCard
              src="/videos/alright.mp4"
            title={
              <>
                Cu<b>t</b>e
              </>
            }
            description="Koi no yokan - means closer to love at second sight! It is the feeling when you meet someone that you are going to fall in love with"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 ms-0">
          <BentoCard
              src="/videos/kisses.mp4"
            title={
              <>
                Ki<b>s</b>s
              </>
            }
            description="The most intimate moments we share together are the ones that mean the most."
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 md:row-span-2 md:col-span-1 ms-0">
          <BentoCard
              src="/videos/hugs.mp4"
            title={
              <>
                H<b>u</b>gs
              </>
            }
            description="Jab koi baat bigaad jaye, jab koi mushkil pad jaye..tum dena saath mera, O humnavaaa!"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 ms-0">
          <BentoCard
              src="/videos/funplay.mp4"
            title={
              <>
                <b>H</b>appy
              </>
            }
            description="Love meant when someone gets you more than you get yourself. The person who knows you better than you know yourself."
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
