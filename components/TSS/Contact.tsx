"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import confetti from "canvas-confetti";

interface ImageClipBoxProps {
  src: string;
  clipClass: string;
}

const ImageClipBox: React.FC<ImageClipBoxProps> = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} alt={src.split("/").pop()} />
  </div>
);

const Modal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const handleDownload = () => {
    // File URLs to be downloaded
    const files = [
      { name: "1.jpg", url: "/downloads/images/1.jpg" },
      { name: "2.jpg", url: "/downloads/images/2.jpg" },
      { name: "3.jpg", url: "/downloads/images/3.jpg" },
      { name: "4.jpg", url: "/downloads/images/4.jpg" },
      { name: "5.jpg", url: "/downloads/images/5.jpg" },
      { name: "6.jpg", url: "/downloads/images/6.jpg" },
      { name: "7.jpg", url: "/downloads/images/7.jpg" },
      { name: "8.jpg", url: "/downloads/images/8.jpg" },
      { name: "9.jpg", url: "/downloads/images/9.jpg" },
      { name: "10.jpg", url: "/downloads/images/10.jpg" },
      { name: "11.jpg", url: "/downloads/images/11.jpg" },
      { name: "12.jpg", url: "/downloads/images/12.jpg" },
      { name: "heal.mp4", url: "/downloads/videos/heal.mp4" },
      { name: "kissie.mp4", url: "/downloads/videos/kissie.mp4" },
      { name: "wall-1.jpg", url: "/downloads/wallpapers/wall-1.jpg" },
      { name: "wall-2.jpg", url: "/downloads/wallpapers/wall-2.jpg" },
    ];

    files.forEach((file) => {
      const link = document.createElement("a");
      link.href = file.url;
      link.download = file.name; // Specify the filename
      link.click();
    });

    onClose(); // Close the modal after triggering the download
  };

  const handleClick = () => {
    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
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

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="relative w-full max-w-lg rounded-lg bg-white p-6 text-black shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="mb-4 text-2xl font-bold">Download Memories</h2>
          <p className="mb-6 text-lg">
            Memories will be downloaded to your device!
          </p>
          <div className="flex justify-end gap-4">
            <button
              className="rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
              onClick={handleDownload}
              onMouseOver={handleClick}
            >
              Download
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Contact: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
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
          <Button
            title="Download Memories"
            containerClass="mt-10 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Contact;
