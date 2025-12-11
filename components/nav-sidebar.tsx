"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import { siteConfig } from "@/config/site";

type Filters = {
  searchQuery: string;
  sizes: string[];
  availability: string[];
  categories: string[];
  colors: string[];
  price: number[];
  collections: string[];
  tags: string[];
  ratings: string[];
};

interface NavSidebarProps {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  toggleArray: (key: string, value: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function NavSidebar({
  filters,
  setFilters,
  toggleArray,
  isOpen,
  onClose,
}: NavSidebarProps) {
  const [localPrice, setLocalPrice] = useState(filters.price || [0, 300]);

  // Sync local state
  useEffect(() => {
    if (filters?.price) {
      setLocalPrice(filters.price);
    }
  }, [filters?.price]);

  // Apply price handler
  const updatePrice = (range: number[]) =>
    setFilters((prev) => ({ ...prev, price: range }));

  const handleApplyPrice = () => {
    updatePrice(localPrice);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <div className="fixed z-50 ">
      {/* 1. Mobile Backdrop Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      />

      {/* 2. Sidebar Container */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-[85vw] overflow-x-hidden sm:w-[350px] pt-20 pr-2  md:pt-0 md:w-72
          bg-white md:bg-transparent 
          md:px-0 px-4 pb-36 overflow-y-auto 
          transition-transform duration-300 ease-in-out border-r border-[#C9C9C9]/50 md:border-none
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:static md:translate-x-0 md:block
        `}
      >
        {/* 3. Mobile Header (Close Button) */}
        <div className="flex items-center justify-between md:hidden mb-6 border-b border-[#C9C9C9] pb-4">
          <span className="font-bold text-lg uppercase tracking-widest">
            Filters
          </span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/5 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Title (Hidden on mobile to avoid duplication with header) */}
        <p className="font-bold text-black text-base hidden md:block mb-4">
          Filters
        </p>

        {/* --- Content Starts Here --- */}
        <div className="flex flex-col gap-4 py-6 border-b border-[#C9C9C9] border-dashed pt-0 md:pt-6">
          <p className="font-bold text-black text-sm">Size</p>
          <div className="flex flex-wrap gap-2">
            {siteConfig.sizes.map((size) => {
              const isSelected = filters?.sizes?.includes(size.id);
              return (
                <button
                  key={size.id}
                  onClick={() => toggleArray("sizes", size.id)}
                  className={`w-10 h-10 flex justify-center items-center text-xs border rounded-none transition-colors ${
                    isSelected
                      ? "border-[#1E1E1E] bg-[#A3A3A3]/10 text-black font-semibold"
                      : "border-[#A3A3A3] text-gray-600 hover:border-[#1E1E1E]"
                  }`}
                >
                  {size.label}
                </button>
              );
            })}
          </div>
        </div>

        <Accordion type="multiple" className="w-full">
          {/* Availability */}
          <AccordionItem
            value="item-1"
            className="border-[#C9C9C9] border-dashed"
          >
            <AccordionTrigger className="font-bold text-black text-sm">
              Availability
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 pl-1">
              {[
                { id: "available", label: "Available" },
                { id: "outOfStock", label: "Out of stock" },
              ].map((cat) => (
                <div key={cat.id} className="flex items-center gap-3">
                  <Checkbox
                    id={`cat-${cat.id}`}
                    checked={filters.availability?.includes(cat.id)}
                    onCheckedChange={() => toggleArray("availability", cat.id)}
                    className="w-5 h-5 rounded-none border-[#A3A3A3] data-[state=checked]:bg-black data-[state=checked]:border-black"
                  />
                  <Label
                    htmlFor={`cat-${cat.id}`}
                    className="cursor-pointer font-normal"
                  >
                    {cat.label}
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* Category */}
          <AccordionItem
            value="item-2"
            className="border-[#C9C9C9] border-dashed"
          >
            <AccordionTrigger className="font-bold text-black text-sm">
              Category
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 pl-1">
              {[
                { id: "shirts", label: "Shirts" },
                { id: "t-shirts", label: "T-Shirts" },
                { id: "jeans", label: "Jeans" },
                { id: "jackets", label: "Jackets" },
              ].map((cat) => (
                <div key={cat.id} className="flex items-center gap-3">
                  <Checkbox
                    id={`cat-${cat.id}`}
                    checked={filters.categories?.includes(cat.id)}
                    onCheckedChange={() => toggleArray("categories", cat.id)}
                    className="w-5 h-5 rounded-none border-[#A3A3A3] data-[state=checked]:bg-black"
                  />
                  <Label
                    htmlFor={`cat-${cat.id}`}
                    className="cursor-pointer font-normal"
                  >
                    {cat.label}
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* Colors */}
          <AccordionItem
            value="item-3"
            className="border-[#C9C9C9] border-dashed"
          >
            <AccordionTrigger className="font-bold text-black text-sm">
              Colors
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <div className="flex gap-3 flex-wrap">
                {siteConfig.colors.map((c) => {
                  const isSelected = filters?.colors?.includes(c.id);
                  return (
                    <div
                      key={c.id}
                      className="cursor-pointer group relative"
                      onClick={() => toggleArray("colors", c.id)}
                    >
                      <button
                        className={`w-10 h-10 rounded-none border ${
                          isSelected && "border-black border"
                        }`}
                        style={{ backgroundColor: c.value }}
                      />
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Price Range */}
          <AccordionItem
            value="item-4"
            className="border-[#C9C9C9] border-dashed"
          >
            <AccordionTrigger className="font-bold text-black text-sm">
              Price Range
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-6 pt-2 px-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">${localPrice[0]}</span>
                  <span className="font-medium text-sm">${localPrice[1]}</span>
                </div>
                <Slider
                  value={localPrice}
                  onValueChange={setLocalPrice}
                  min={0}
                  max={300}
                  step={5}
                  className="w-full"
                />
                <button
                  onClick={handleApplyPrice}
                  className="w-full py-2 text-xs font-bold uppercase tracking-widest border border-black hover:bg-black hover:text-white transition-colors"
                >
                  Apply Price
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Collections */}
          <AccordionItem
            value="item-5"
            className="border-[#C9C9C9] border-dashed"
          >
            <AccordionTrigger className="font-bold text-black text-sm">
              Collections
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 pl-1">
              {[
                { id: "summer", label: "Summer Collection" },
                { id: "winter", label: "Winter Collection" },
                { id: "classic", label: "Classics" },
              ].map((col) => (
                <div className="flex items-center gap-3" key={col.id}>
                  <Checkbox
                    id={`col-${col.id}`}
                    checked={filters.collections.includes(col.id)}
                    onCheckedChange={() => toggleArray("collections", col.id)}
                    className="w-5 h-5 rounded-none border-[#A3A3A3] data-[state=checked]:bg-black"
                  />
                  <Label
                    htmlFor={`col-${col.id}`}
                    className="cursor-pointer font-normal"
                  >
                    {col.label}
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* Tags */}
          <AccordionItem
            value="item-6"
            className="border-[#C9C9C9] border-dashed"
          >
            <AccordionTrigger className="font-bold text-black text-sm">
              Tags
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 pl-1">
              {[
                { id: "sale", label: "Sale" },
                { id: "new", label: "New Arrival" },
                { id: "limited", label: "Limited Edition" },
              ].map((tag) => (
                <div className="flex items-center gap-3" key={tag.id}>
                  <Checkbox
                    id={`tag-${tag.id}`}
                    checked={filters.tags?.includes(tag.id)}
                    onCheckedChange={() => toggleArray("tags", tag.id)}
                    className="w-5 h-5 rounded-none border-[#A3A3A3] data-[state=checked]:bg-black"
                  />
                  <Label
                    htmlFor={`tag-${tag.id}`}
                    className="cursor-pointer font-normal"
                  >
                    {tag.label}
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* Ratings */}
          <AccordionItem
            value="item-7"
            className="border-[#C9C9C9] border-dashed border-b-0"
          >
            <AccordionTrigger className="font-bold text-black text-sm">
              Ratings
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 pl-1">
              {["5", "4", "3"].map((rating) => (
                <div key={rating} className="flex items-center gap-3">
                  <Checkbox
                    id={`rate-${rating}`}
                    checked={filters.ratings?.includes(rating)}
                    onCheckedChange={() => toggleArray("ratings", rating)}
                    className="w-5 h-5 rounded-none border-[#A3A3A3] data-[state=checked]:bg-black"
                  />
                  <Label
                    htmlFor={`rate-${rating}`}
                    className="cursor-pointer font-normal"
                  >
                    {rating} Stars & Up
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </aside>
    </div>
  );
}
