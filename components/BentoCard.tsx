import { useState } from "react";
import { StoryContent } from "@/types/types";
import { AIChat } from "./AiChat";

interface BentoCardProps {
  storyContent: StoryContent;
}

export const BentoCard: React.FC<BentoCardProps> = ({ storyContent }) => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="relative size-full">
      {storyContent.type === "video" && storyContent.src ? (
        <video
          src={storyContent.src}
          loop
          muted
          autoPlay
          className="absolute left-0 top-0 size-full object-cover object-center"
        />
      ) : (
        <div
          className="absolute left-0 top-0 size-full"
          style={{ backgroundColor: storyContent.backgroundColor || "#000" }}
        />
      )}

      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{storyContent.title}</h1>
          <p className="mt-3 max-w-64 text-xs md:text-base">
            {storyContent.description}
          </p>
        </div>
      </div>

      {showChat && <AIChat onClose={() => setShowChat(false)} />}
    </div>
  );
};
