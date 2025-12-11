"use client";
import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";
import { X, Heart, ImageOff } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function ProductDetailsModal({
  product,
  onClose,
}: {
  product: any;
  onClose: () => void;
}) {
  // We remove the artificial loading state for images to allow instant zoom
  const [selectedColor, setSelectedColor] = useState<string>(
    siteConfig?.colors?.[0]?.id || ""
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    siteConfig?.sizes?.[0]?.id || "s"
  );
  const [activeImage, setActiveImage] = useState(0);

  // 1. Early Return Safety
  if (!product) return null;

  // 2. Safe Data Extraction (Prevents crashes)
  const images = product.images || [];
  const currentImageSrc = images[activeImage] || null;
  const safeId = product._id || product.id || "unknown"; // Fallback ID

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm overflow-y-auto md:overflow-hidden pt-12"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans relative">
        <div className="max-w-7xl w-full flex justify-center flex-col md:flex-row gap-8 md:gap-20">
          {/* LEFT SIDE: IMAGES */}
          <div className="flex flex-col gap-6 items-center md:items-start w-full md:w-1/2">
            <div className="relative w-full max-w-[550px]">
              <motion.div
                layoutId={`product-image-${safeId}`}
                className="flex flex-col md:flex-row gap-10 justify-center items-start h-full"
                transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
              >
                <div className="flex justify-center w-full h-full relative">
                  {currentImageSrc && (
                    <Image
                      src={currentImageSrc}
                      alt={product.name || "Product"}
                      width={1000}
                      height={1000}
                      className="object-cover object-center h-[438px] w-full md:w-92 md:max-w-92"
                      priority
                    />
                  )}
                </div>

                {/* Thumbnails */}
                {/* We can hide these or animate them in separately */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex md:flex-col flex-row flex-nowrap md:justify-center overflow-x-auto md:overflow-x-hidden gap-4 w-full px-1"
                >
                  {images.map((img: string, idx: number) =>
                    img ? (
                      <div
                        key={idx}
                        className={`relative min-w-[72px] h-[75px] cursor-pointer transition-opacity hover:opacity-100 ${
                          activeImage === idx
                            ? "opacity-100 border border-black"
                            : "opacity-60"
                        }`}
                        onClick={() => setActiveImage(idx)}
                      >
                        <Image
                          src={img}
                          alt="thumb"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : null
                  )}
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT SIDE: DETAILS */}
          {/* We animate this section in slightly later to look nice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex flex-col pt-4 w-full md:max-w-75 border border-[#A3A3A3] px-4 py-2 h-fit bg-white relative"
          >
            <div className="flex justify-end mb-4">
              <Heart className="w-5 h-5 text-gray-600" />
            </div>

            {/* Use Fallbacks (||) to prevent undefined errors */}
            <h1 className="text-xl font-medium tracking-wide uppercase text-gray-900">
              {product.name || "Loading..."}
            </h1>

            <div className="mt-2 flex flex-col">
              <span className="text-lg font-medium text-gray-900">
                ${product.price || 0}
              </span>
              <span className="text-xs text-gray-500 mt-1">
                MRP incl. of all taxes
              </span>
            </div>

            <div className="mt-8">
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.description || "No description available."}
              </p>
            </div>

            {/* Colors */}
            <div className="mt-8">
              <h3 className="text-sm font-light text-gray-600 mb-3">Color</h3>
              <div className="flex gap-1 flex-wrap">
                {siteConfig?.colors?.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => setSelectedColor(c.id)}
                  >
                    <div
                      className={`w-10 h-10 border ${
                        selectedColor === c.id ? "border-black" : ""
                      }`}
                      style={{ backgroundColor: c.value }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-8">
              <h3 className="text-sm font-light text-gray-600 mb-3">Size</h3>
              <div className="flex gap-1 flex-wrap">
                {siteConfig?.sizes?.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedSize(s.id)}
                    className="cursor-pointer"
                  >
                    <div
                      className={`w-10 h-10 border flex items-center justify-center text-xs ${
                        selectedSize === s.id ? "bg-gray-100 border-black" : ""
                      }`}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <button className="w-full bg-[#D8D0CE] py-4 px-8 text-black text-sm font-medium uppercase tracking-widest hover:bg-[#c2b8b6]">
                Add
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
