"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

// Mock Cart Data
const CART_ITEMS = [
  {
    id: 1,
    name: "Basic Heavy T-Shirt",
    variant: "Black / L",
    price: 99,
    quantity: 1,
    image: "/api/placeholder/400/500", // Replace with your image
  },
  {
    id: 2,
    name: "Basic Fit T-Shirt",
    variant: "Black / L",
    price: 99,
    quantity: 1,
    image: "/api/placeholder/400/500", // Replace with your image
  },
];

export default function CheckoutPage() {
  const subtotal = CART_ITEMS.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = "Calculated at next step";
  const total = subtotal; // Shipping is TBD

  return (
    <div className=" py-12 flex justify-center ">
      <div className="max-w-7xl w-full md:px-6 px-4">
        <h1 className="text-3xl font-bold tracking-tight mb-6">CHECKOUT</h1>
        <div className="  w-full overflow-y-auto mx-auto flex flex-col-reverse md:grid grid-cols-1 gap-4  lg:gap-8 md:grid-cols-13 min-h-screen">
          {/* LEFT COLUMN: CHECKOUT FORM */}
          <div className="md:col-span-6 lg:col-span-6 py-12   overflow-y-auto min-h-screen">
            {/* Contact Info Section */}
            <div className="mb-10">
              <h2 className="text-sm font-semibold mb-4 uppercase tracking-wide">
                Contact Info
              </h2>
              <div className="space-y-4">
                <Input placeholder="Email" type="email" />
                <Input placeholder="Phone" type="tel" />
              </div>
            </div>

            {/* Shipping Address Section */}
            <div className="mb-10">
              <h2 className="text-sm font-semibold mb-4 uppercase tracking-wide">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {/* Name Row */}
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="First Name" />
                  <Input placeholder="Last Name" />
                </div>

                {/* Country Select */}
                <div className="relative">
                  <select className="w-full p-3.5 bg-transparent border border-[#A3A3A3] text-gray-700 text-sm appearance-none focus:outline-none focus:border-black rounded-none">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>

                {/* Address Fields */}
                <div className="space-y-4">
                  <Input placeholder="State / Region" />
                  <Input placeholder="Address" />
                </div>

                {/* City/Zip Row */}
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="City" />
                  <Input placeholder="Postal Code" />
                </div>
              </div>
            </div>
            <div className="mb-10">
              <h2 className="text-sm font-semibold mb-4 uppercase tracking-wide">
                Payment Details
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {/* Name Row */}
                <div className="grid grid-cols-1 gap-4">
                  <Input placeholder="Cardholder Name" />
                  <Input placeholder="1234 5678 9876 5432" />
                </div>

                <div className="flex justify-between flex-col sm:flex-row  gap-4">
                  <div className="relative w-full">
                    <select className="w-full p-3.5 bg-transparent border border-[#A3A3A3] text-gray-700 text-sm appearance-none focus:outline-none focus:border-black rounded-none">
                      <option>MM</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                  <div className="relative w-full">
                    <select className="w-full p-3.5 bg-transparent border border-[#A3A3A3] text-gray-700 text-sm appearance-none focus:outline-none focus:border-black rounded-none">
                      <option>YYYY</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                  <Input placeholder="CVC" />
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="flex justify-end mt-12">
              <button className="group flex items-center gap-4 bg-[#D8D0CE] hover:bg-[#c2b8b6] px-8 py-4 text-sm font-semibold uppercase tracking-widest transition-all">
                Place Order
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY (Cart) */}
          <div className=" sm:col-start-7 lg:col-start-8 md:col-end-12 relative md:min-h-screen top-0 h-fit">
            <div className="border lg:fixed border-[#A3A3A3] w-full md:max-w-[468px] px-4  py-12 sm:px-10">
              <div className="flex justify-between items-end mb-8 border-b  pb-4">
                <span className="text-gray-500 text-sm">
                  ({CART_ITEMS.length})
                </span>
              </div>

              {/* Cart Items List */}
              <div className="space-y-8 mb-10">
                {CART_ITEMS.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    {/* Image */}
                    <div className="relative w-20 h-24 bg-gray-200 shrink-0 border border-gray-200">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex justify-between">
                      <div className="flex flex-col justify-between py-1">
                        <div>
                          <h3 className="font-medium text-sm text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {item.variant}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-blue-900">
                          ({item.quantity})
                        </p>
                      </div>

                      <div className="flex flex-col justify-between items-end py-1">
                        <button className="text-xs underline text-gray-500 hover:text-black">
                          Change
                        </button>
                        <p className="text-sm font-medium">${item.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals Calculation */}
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-xs text-gray-400 italic">
                    {shipping}
                  </span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="border-t border-gray-200 mt-6 pt-6 flex justify-between items-center">
                <span className="text-md font-medium">Total</span>
                <div className="flex items-end gap-2">
                  <span className="text-xs text-gray-500 mb-1">USD</span>
                  <span className="text-xl font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Component for Inputs to keep code clean
const Input = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className="w-full p-3.5 bg-transparent border border-[#A3A3A3] placeholder:text-gray-400 text-sm focus:outline-none focus:border-black transition-colors rounded-none"
    />
  );
};
