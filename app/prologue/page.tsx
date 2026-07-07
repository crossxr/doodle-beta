"use client";

import { useEffect } from "react";

export default function VideoTextPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Image Background */}
      <div className="absolute inset-0 h-full w-full">
        <img
          src="/hero.png"
          alt="Hero background"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-3xl rounded-xl backdrop-blur-md transition-all duration-300">
          {/* Semi-transparent background with gradient */}
          <div
            className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-white/10"
            style={{ backdropFilter: "blur(4px)" }}
          ></div>

          {/* Text Content */}
          <div className="relative z-20 p-6 sm:p-8">
            <h1 className="mb-6 text-4xl font-bold text-gray-900">
              You Are My Everything
            </h1>

            <p className="text-lg leading-relaxed text-gray-800">
            Love will not save you. But it will hold your hand while you save yourself. And in a world that sometimes seems void of goodness, in a world that sometimes feels too heavy to bear, I think that is all we are really searching for. Someone by our side. Someone who grounds us. Someone who will quietly hug us for twenty minutes straight while we figure it all out. I think that is all anyone really needs. Someone who sees them. Someone who stays. And I want you to stay! I want you to stay, because you are the only person I have ever met who has made me want to be the happiest version of myself. I think that, if I am ever really going to become a better person, it will be because you are the one by my side.
              <br />
              <br />
              And I promise Until the stars burn out and all worlds end until the planets collide and the suns wither until the moon&apos;s light dies and the rivers and seas run out until I grow so old that my memories fade away and my tongue cannot say your name until my heart beats for the last time, only then perhaps i would stop loving you perhaps: but even then, I would still love you.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
