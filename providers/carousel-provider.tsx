"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
  MutableRefObject,
  useEffect,
} from "react";

interface CarouselContextType {
  registerItem: (ref: MutableRefObject<HTMLDivElement | null>) => void;
  containerRef: MutableRefObject<HTMLDivElement | null>;
  activeIndex: number;
  next: () => void;
  prev: () => void;
}

const CarouselContext = createContext<CarouselContextType | null>(null);

export function useCarousel() {
  const ctx = useContext(CarouselContext);
  if (!ctx) {
    throw new Error("Carousel components must be used inside <Carousel.Root>");
  }
  return ctx;
}

interface RootProps {
  children: ReactNode;
}

export function CarouselRoot({ children }: RootProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<MutableRefObject<HTMLDivElement | null>[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const registerItem = (ref: MutableRefObject<HTMLDivElement | null>) => {
    itemsRef.current.push(ref);
  };

  const next = () => {
    setActiveIndex((i) => (i + 1) % itemsRef.current.length);
  };

  const prev = () => {
    setActiveIndex(
      (i) => (i - 1 + itemsRef.current.length) % itemsRef.current.length
    );
  };

  useEffect(() => {
    const container = containerRef.current;
    const item = itemsRef.current[activeIndex]?.current;
    if (!container || !item) return;

    const itemLeft =
      item.offsetLeft -
      container.offsetLeft -
      (container.clientWidth / 2 - item.clientWidth / 2);

    container.scrollTo({
      left: itemLeft,
      behavior: "smooth",
    });
  }, [activeIndex]);

  return (
    <CarouselContext.Provider
      value={{
        registerItem,
        containerRef,
        activeIndex,
        next,
        prev,
      }}
    >
      {children}
    </CarouselContext.Provider>
  );
}
