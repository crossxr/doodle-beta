"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import AnimatedTitle from "./AnimatedTitle";

interface ImageClipBoxProps {
  src: string;
  clipClass: string;
}

const ImageClipBox: React.FC<ImageClipBoxProps> = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} alt={src.split("/").pop()} />
  </div>
);

const triggerConfetti = () => {
  const duration = 4 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 28, spread: 360, ticks: 60, zIndex: 0 };

  const randomInRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      window.clearInterval(interval);
      return;
    }

    const particleCount = 40 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
};

const Contact: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    triggerConfetti();
    setIsModalOpen(true);
  };

  return (
    <>
      <div id="contact" className="my-20 min-h-96 w-screen px-10">
        <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
          <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
            <ImageClipBox src="/img/sleep.jpg" clipClass="contact-clip-path-1" />
            <ImageClipBox
              src="/img/sleep.jpg"
              clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
            />
          </div>
          <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
            <ImageClipBox
              src="/img/field.jpg"
              clipClass="sword-man-clip-path md:scale-125"
            />
          </div>
          <div className="flex flex-col items-center text-center">
            <p className="mb-10 font-general text-[10px] uppercase">promise</p>
            <AnimatedTitle
              title="I know y<b>o</b>u are <br /> staying! <br /> a<b>r</b>e y<b>o</b>u?"
              containerClass="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
            />
            <button
              type="button"
              onClick={handleButtonClick}
              className="mt-10 inline-flex rounded-full bg-blue-50 px-7 py-3 font-general text-xs uppercase text-black"
            >
              I love you the most papa
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute right-3 top-3 z-10 rounded-full bg-black/70 px-3 py-1 text-sm text-white"
              >
                Close
              </button>
              <img
                src="https://ucarecdn.com/b6e8cb4f-4445-4b2e-b6e5-77fa09150e1f/-/preview/1000x562/"
                alt="Memory"
                className="h-auto w-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Contact;
