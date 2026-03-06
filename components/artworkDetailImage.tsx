import Image from "next/image";
import type { MetObject } from "@/lib/met-api";

type Props = {
  artwork: MetObject;
};

export default function ArtworkDetailImage({ artwork }: Props) {
  return (
    <div className="flex items-center justify-center h-full">
      {artwork.primaryImage && artwork.isPublicDomain ? (
        <div className="relative w-full h-[500px]">
          <Image
            src={artwork.primaryImageSmall}
            alt={artwork.title}
            fill
            className="object-contain"
          />
        </div>
      ) : (
        <div className="w-full h-[500px] bg-stone-800 flex items-center justify-center">
          <p className="text-stone-400 text-sm">No art available</p>
        </div>
      )}
    </div>
  );
}
