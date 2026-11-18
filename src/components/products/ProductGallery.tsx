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
    return <p>No images.</p>;
  }

  return (
    <div role="group" aria-label={"Images for " + title}>
      <img
        src={photos[active]}
        alt={title}
        className="mb-3 h-64 w-full max-w-md object-contain"
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
              index === active ? "border-2 border-white p-0.5" : "border p-0.5"
            }
          >
            <img src={src} alt="" width={56} height={56} />
          </button>
        ))}
      </div>
    </div>
  );
}
