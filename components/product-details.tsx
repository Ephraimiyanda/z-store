"use client";
import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";
import { X, Heart, ImageOff, Minus, Plus } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/providers/cart-provider";
export function ProductDetailsModal({
  product,
  onClose,
}: {
  product: any;
  onClose: () => void;
}) {
  const [selectedSize, setSelectedSize] = useState<string>(
    siteConfig?.sizes?.[0]?.id || "s"
  );
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const images = product.images || [];
  const currentImageSrc = images[activeImage] || null;
  const { addToCart } = useCart();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white backdrop-blur-sm overflow-y-auto md:overflow-hidden pt-12"
    >
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans relative">
        <div className="max-w-7xl w-full flex justify-center flex-col md:flex-row gap-8 md:gap-20">
          {/* LEFT SIDE: IMAGES */}
          <div className="flex flex-col gap-6 items-center md:items-start w-full md:w-1/2">
            <div className="relative w-full max-w-[550px]">
              <motion.div
                layoutId={
                  product._id ? `product-image-${product._id}` : undefined
                }
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

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex md:flex-col flex-row flex-nowrap md:justify-start items-start overflow-x-auto md:overflow-x-hidden gap-4 w-fit h-full px-1"
                >
                  {images.map((img: string, idx: number) =>
                    img ? (
                      <div
                        key={idx}
                        className={`relative cursor-pointer transition-opacity hover:opacity-100 ${
                          activeImage === idx
                            ? "opacity-100 border border-black"
                            : "opacity-60"
                        }`}
                        onClick={() => setActiveImage(idx)}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} image`}
                          width={100}
                          height={100}
                          className="object-cover  w-[72px] h-[75px]"
                          priority
                        />
                      </div>
                    ) : null
                  )}
                </motion.div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex flex-col pt-4 w-full md:max-w-75 sm:border sm:border-[#A3A3A3] sm:px-4 py-2 h-fit bg-white relative"
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
            <div className="mt-8">
              <h3 className="text-sm font-light text-gray-600 mb-3">
                Quantity
              </h3>
              <div className="flex items-center  justify-normal gap-4  w-full">
                <button
                  onClick={() =>
                    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                  className="w-10 h-10 flex items-center justify-center border border-[#A3A3A3] hover:bg-gray-100 hover:border-black transition-colors disabled:opacity-50 cursor-pointer"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>

                <span className="w-12 h-10 flex items-center justify-center text-lg font-medium ">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-[#A3A3A3] hover:bg-gray-100 hover:border-black transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            {/* Sizes */}
            <div className="mt-8">
              <h3 className="text-sm font-light text-gray-600 mb-3">Size</h3>
              <div className="flex gap-1 flex-wrap">
                {product.sizes?.map((size: string, index: number) => (
                  <div
                    key={size + index}
                    onClick={() => setSelectedSize(size)}
                    className="cursor-pointer"
                  >
                    <div
                      className={`w-10 h-10 border flex items-center justify-center text-xs ${
                        selectedSize === size ? "bg-gray-100 border-black" : ""
                      }`}
                    >
                      {size}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-4 my-3 text-[10px] text-gray-500 tracking-wide capitalize">
              <button className="hover:underline uppercase">
                Find your size
              </button>
              <span>|</span>
              <button className="hover:underline uppercase">
                Measurement Guide
              </button>
            </div>
            <div className="mt-4">
              <button
                onClick={() => {
                  addToCart(product, selectedSize, quantity);
                }}
                className="w-full bg-[#D8D0CE] py-4 px-8 text-black text-sm font-medium uppercase tracking-widest hover:bg-[#c2b8b6] cursor-pointer"
              >
                Add
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
