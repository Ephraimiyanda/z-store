"use client";
import { useCarousel } from "@/providers/carousel-provider";
import { HTMLAttributes, ReactNode, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
interface CarouselItemProps {
  children: React.ReactNode;
}
interface CarouselContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CarouselContainer({
  children,
  ...props
}: CarouselContainerProps) {
  const { containerRef } = useCarousel();

  return (
    <div
      {...props}
      ref={containerRef}
      className={`carousel-container flex justify-normal gap-8 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory  w-full ${props.className}`}
    >
      {children}
    </div>
  );
}

export function CarouselItem({ children }: CarouselItemProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { registerItem, activeIndex } = useCarousel();

  // Scroll motion
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    registerItem(ref);
  }, []);

  return (
    <motion.div
      ref={ref}
      className="carousel-item w-auto h-full rounded-xl"
      // style={{ opacity, scale }}

      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
export function CarouselNext({ ...props }: HTMLAttributes<HTMLButtonElement>) {
  const { next } = useCarousel();
  return (
    <Button
      className="carousel-next-button bg-transparent border border-[#1E1E1E] rounded-none hover:border-[#A3A3A3] hover:bg-[#A3A3A3]/10 cursor-pointer"
      size={"icon-lg"}
      onClick={next}
      {...props}
    >
      <ChevronRight size={10} className="text-black hover:text-white" />
    </Button>
  );
}

export function CarouselPrev({ ...props }: HTMLAttributes<HTMLButtonElement>) {
  const { prev } = useCarousel();
  return (
    <Button
      className="carousel-prev-button bg-transparent border border-[#1E1E1E] rounded-none hover:border-[#A3A3A3] hover:bg-[#A3A3A3]/10 cursor-pointer"
      size={"icon-lg"}
      onClick={prev}
      {...props}
    >
      <ChevronLeft size={10} className="text-black hover:text-white" />
    </Button>
  );
}
