"use client"

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { GlitchText } from "@/components/GlitchText";
import { STORY_DATA } from "@/constants/storyData";

export const StoryPage: React.FC<{ storyId: string }> = ({ storyId }) => {
  const router = useRouter();
  const story = STORY_DATA.find(s => s.id === storyId);

  if (!story) return null;

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="w-full mx-auto px-4 py-8">
        <a
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-blue-50 hover:text-blue-200"
        >
          <ArrowLeft size={20} />
          Back to Stories
        </a>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative h-[50vh] overflow-hidden rounded-lg md:h-[70vh]">
            {story.type === 'video' && story.src ? (
              <video
                src={story.src}
                loop
                muted
                autoPlay
                className="size-full object-cover"
              />
            ) : (
              <div 
                className="size-full"
                style={{ backgroundColor: story.backgroundColor || '#000' }}
              />
            )}
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h1 className="mb-4 text-4xl font-bold">{story.title}</h1>
              {story.fullStory && (
                <GlitchText
                  className="text-lg text-blue-50"
                  text={story.fullStory}
                />
              )}
            </div>

            <a
              href="/"
              className="mt-8 inline-flex w-full rounded-full bg-blue-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-600 md:w-auto"
            >
              Go to Story Section
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};