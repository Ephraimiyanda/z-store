"use client";

import { Handbag, Heart, UserRound, Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useProductModal } from "@/providers/product-modal-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { useCart } from "@/providers/cart-provider";

export function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { closeProduct } = useProductModal();
  const { totalItems } = useCart();
  const isProductView = searchParams.has("product");

  return (
    <nav className="top-0 sticky z-80 bg-white">
      {/* mobile view */}
      <div className="md:hidden grid grid-cols-[1fr_auto_1fr] items-center px-4 py-4 w-full border-b border-gray-100">
        <div className="flex justify-start">
          {isProductView ? (
            <button
              onClick={closeProduct}
              className="flex justify-center items-center cursor-pointer"
            >
              <Image
                src={"/arrow-back.svg"}
                alt="back"
                width={24}
                height={24}
                className="w-12 h-6"
              />
            </button>
          ) : (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button
                  onClick={closeProduct}
                  className="flex justify-center items-center cursor-pointer relative"
                >
                  <Image
                    src={"/hamburger.svg"}
                    alt="back"
                    width={24}
                    height={24}
                    className="w-12 h-6"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 flex flex-col gap-2 justify-around px-2 ml-4 py-4 relative top-8">
                <DropdownMenuItem asChild>
                  <Link href="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/shop">Shop</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/shop?tags=new">New</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <div className="flex justify-center">
          <Image
            src={"/logo.svg"}
            alt="logo"
            height={40}
            width={40}
            className="w-8 h-8"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => router.push("/check-out")}
            className="w-9 h-9 rounded-full border-4 border-black flex items-center justify-center bg-white text-black relative"
          >
            <Handbag className="w-4 h-4" />
            {totalItems > 0 && (
              <Badge
                variant={"outline"}
                className="absolute -top-2 -right-2 z-10 bg-white text-black font-bold border-2"
              >
                {totalItems}
              </Badge>
            )}
          </button>

          <button className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white">
            <UserRound className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* desktop view */}
      <div className="hidden md:block">
        <NavigationMenu className="py-4 px-4 flex justify-between gap-4 mx-auto max-w-7xl items-center w-full ">
          {isProductView && (
            <NavigationMenuItem className="flex justify-center items-center fixed left-10 z-50 ">
              <button
                onClick={closeProduct}
                className="flex justify-center items-center rounded-none cursor-pointer px-2 py-3 self-start"
              >
                <Image
                  src={"/arrow-back.svg"}
                  alt="arrow-back"
                  width={100}
                  height={100}
                  className="h-4 w-12 m-auto "
                ></Image>
              </button>
            </NavigationMenuItem>
          )}

          <NavigationMenuItem className=" w-full flex justify-normal items-center gap-4 text-medium text-sm  flex-1">
            <ul className="flex gap-4">
              <NavigationMenuLink href="/">Home</NavigationMenuLink>
              <NavigationMenuLink href="/shop">Shop</NavigationMenuLink>
              <NavigationMenuLink href="/shop?tags=new">New</NavigationMenuLink>
            </ul>
          </NavigationMenuItem>

          <NavigationMenuItem className="flex justify-center items-center px-4 flex-1">
            <Image
              src={"/logo.svg"}
              alt="logo"
              height={100}
              width={100}
              className="w-9 h-9"
            ></Image>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex gap-4 flex-1 justify-end">
            <Button
              size={"icon-lg"}
              className="rounded-[50%] -rotate-36 text-medium text-sm text-white cursor-pointer"
            >
              <Heart />
            </Button>

            <Button
              size={"lg"}
              className="relative rounded-3xl text-medium font-normal text-sm text-white px-2 cursor-pointer"
              onClick={() => router.push("/check-out")}
            >
              Cart
              <Handbag size={28} className="w-18" />
              {totalItems > 0 && (
                <Badge
                  variant={"outline"}
                  className="absolute -top-2 -right-2 z-10 bg-white text-black font-bold border-2"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>

            <Button
              size={"icon-lg"}
              className="rounded-[50%]  text-medium text-sm text-white  cursor-pointer"
            >
              <UserRound />
            </Button>
          </NavigationMenuItem>
        </NavigationMenu>
      </div>
    </nav>
  );
}
