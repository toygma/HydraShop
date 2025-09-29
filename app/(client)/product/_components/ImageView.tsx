"use client";
import {
  internalGroqTypeReferenceTo,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface ImageProps {
  asset?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
  };
  media?: unknown;
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  _type: "image";
  _key: string;
}

interface Props {
  images?: Array<ImageProps>;
}

const ImageView = ({ images = [] }: Props) => {
  const [activeImage, setActiveImage] = useState<ImageProps | undefined>(
    images[0]
  );

  if (!activeImage) return null;

  return (
    <div className="w-full md:w-1/2 space-y-3">
      <div className="relative w-full aspect-square border border-gray-200 rounded-xl overflow-hidden shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage._key}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            <Image
              src={urlFor(activeImage).url()}
              alt="Product Image"
              width={500}
              height={500}
              className="p-2 bg-white w-full h-full object-cover rounded-xl"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-6 gap-3">
        {images.map((image) => (
          <button
            key={image._key}
            onClick={() => setActiveImage(image)}
            className={`
              relative aspect-square rounded-lg overflow-hidden transition-all duration-200
              ${
                activeImage._key === image._key
                  ? "ring-2 ring-indigo-600 ring-offset-2 scale-105"
                  : "hover:ring-1 hover:ring-gray-400 opacity-80"
              }
              cursor-pointer
            `}
          >
            <Image
              src={urlFor(image).url()}
              alt={`Image ${image._key}`}
              width={500}
              height={500}
              className="bg-white object-cover w-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageView;
