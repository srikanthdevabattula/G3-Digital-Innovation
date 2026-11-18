"use client";

import { useState } from "react";

export function ProductGallery({
  title,
  images,
}: {
  title: string;
  images: string[];
}) {
  const photos = images.length > 0 ? images : [];
  const [active, setActive] = useState(0);

  if (photos.length === 0) {
    return (
      <p className="rounded-2xl bg-slate-50 p-8 text-center text-sm text-slate-500">
        No images.
      </p>
    );
  }

  return (
    <div role="group" aria-label={"Images for " + title}>
      <img
        src={photos[active]}
        alt={title}
        className="mb-3 h-64 w-full rounded-2xl bg-slate-50 object-contain"
      />

      <div className="flex flex-wrap gap-2">
        {photos.map((src, index) => (
          <button
            key={src + index}
            type="button"
            onClick={() => setActive(index)}
            aria-label={"Show image " + (index + 1) + " of " + photos.length}
            aria-pressed={index === active}
            className={
              index === active
                ? "rounded-lg border-2 border-indigo-600 p-0.5"
                : "rounded-lg border border-slate-200 p-0.5 hover:border-indigo-300"
            }
          >
            <img
              src={src}
              alt=""
              width={56}
              height={56}
              className="h-14 w-14 rounded-md object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
