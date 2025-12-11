"use client";

import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import Image from "next/image";

const items = [
  {
    id: 1,
    url: "/merch-2.png",
    title: "Urban Explorer",
    desc: "Streetwear Collection",
  },
  {
    id: 2,
    url: "/merch-3.png",
    title: "Casual Friday",
    desc: "Autumn Essentials",
  },
  {
    id: 3,
    url: "/merch-4.png",
    title: "Minimalist",
    desc: "Clean Lines",
  },
  {
    id: 4,
    url: "/merch-5.png",
    title: "Soft Tones",
    desc: "Pastel Palette",
  },
  {
    id: 5,
    url: "/merch.png",
    title: "Accessories",
    desc: "Finishing Touches",
  },
];

export default function HorizontalScrollGallery() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen -mt-15 items-center overflow-hidden">
        {/* Moving Track */}
        <motion.div
          style={{ x }}
          className="flex gap-10 pl-10 sm:pl-20 [&>div]:even:mt-10"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative h-[400px] w-[300px] sm:h-[500px] sm:w-[400px] flex-shrink-0 overflow-hidden"
            >
              <Image
                src={item.url}
                alt={item.title}
                unoptimized
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Optional Overlay Text */}
              <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
              <div className="absolute bottom-0 left-0 p-6 text-white drop-shadow-md">
                <h3 className="text-2xl font-bold uppercase tracking-widest">
                  {item.title}
                </h3>
                <p className="text-sm font-medium opacity-90">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
