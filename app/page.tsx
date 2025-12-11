"use client";
import {
  CarouselContainer,
  CarouselItem,
  CarouselNext,
  CarouselPrev,
} from "@/components/carousel";
import { Footer } from "@/components/footer";
import HorizontalGallery from "@/components/horizontal-gallery";
import { ProductCard } from "@/components/product-card";
import { ProductCardSkeleton } from "@/components/product-card-skeleton";
import SearchInput from "@/components/search-input";
import { useProducts } from "@/hooks/use-products";
import { CarouselRoot } from "@/providers/carousel-provider";
import { useProductModal } from "@/providers/product-modal-provider";
import { Product } from "@/types";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { openProduct } = useProductModal();

  const { products, loading } = useProducts({
    collections: ["new"],
  });
  const xivCollection = products && products.slice(4, 7);
  return (
    <div className="flex min-h-screen items-center justify-center font-sans flex-col">
      <main className="flex min-h-screen w-full flex-col items-center gap-24 py-16 px-6 dark:bg-black sm:items-start mx-auto max-w-7xl">
        <div className="w-full">
          <ul className="text-base flex flex-col gap-2">
            <li>
              <Link href={"/shop?tags=men"}>MEN</Link>
            </li>
            <li>
              <Link href={"/shop?tags=women"}>WOMEN</Link>
            </li>
            <li>
              <Link href={"/shop?tags=kids"}>KIDS</Link>
            </li>
            <li className="mt-2">
              <form onSubmit={() => router.push(`/shop?q=${searchQuery}`)}>
                <SearchInput
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                ></SearchInput>
              </form>
            </li>
          </ul>
        </div>
        <section className="flex flex-col md:flex-row justify-between gap-4 py-8 max-w-full overflow-auto">
          <CarouselRoot>
            <div className="flex flex-col md:justify-between gap-8 ">
              <div className="flex flex-col gap-2">
                <h1 className="font-extrabold text-5xl">
                  NEW <br />
                  COLLECTION
                </h1>
                <p className="font-base">
                  SUMMER <br />
                  {new Date().getFullYear()}
                </p>
              </div>
              <div className=" flex justify-between gap-8">
                <button
                  className="bg-[#D9D9D9] px-4 h-10 w-66 flex justify-between items-center rounded-none text-black hover:text-[#5E5E5E] cursor-pointer group transition-all"
                  onClick={() => router.push(`/shop?q=${searchQuery}`)}
                >
                  <p className=" font-medium">GO TO SHOP</p>
                  <Image
                    src={"/arrow-right.svg"}
                    alt="button arrow"
                    width={50}
                    height={12}
                    className="group-hover:translate-x-1 transition-transform"
                  ></Image>
                </button>
                <div className="flex gap-4">
                  <CarouselPrev />
                  <CarouselNext />
                </div>
              </div>
            </div>
            <div className="h-full flex overflow-auto flex-nowrap max-w-full">
              <CarouselContainer>
                <CarouselItem>
                  <Image
                    src={"/merch.png"}
                    alt="merch"
                    width={1000}
                    height={1000}
                    className="h-94 min-w-92"
                  ></Image>
                </CarouselItem>
                <CarouselItem>
                  <Image
                    src={"/merch.png"}
                    alt="merch"
                    width={1000}
                    height={1000}
                    className="h-94 min-w-92"
                  ></Image>
                </CarouselItem>{" "}
                <CarouselItem>
                  <Image
                    src={"/merch.png"}
                    alt="merch"
                    width={1000}
                    height={1000}
                    className="h-94 min-w-92"
                  ></Image>
                </CarouselItem>{" "}
                <CarouselItem>
                  <Image
                    src={"/merch.png"}
                    alt="merch"
                    width={1000}
                    height={1000}
                    className="h-94 min-w-92"
                  ></Image>
                </CarouselItem>{" "}
                <CarouselItem>
                  <Image
                    src={"/merch.png"}
                    alt="merch"
                    width={1000}
                    height={1000}
                    className="h-94 min-w-92"
                  ></Image>
                </CarouselItem>
              </CarouselContainer>
            </div>
          </CarouselRoot>
        </section>
        <section className="flex flex-col gap-7 w-full max-w-full overflow-auto">
          <div className="flex justify-between">
            <h1 className="font-extrabold text-5xl">
              <p>NEW</p>
              <p>THIS WEEK</p>
            </h1>
            <Link className="text-[#5E5E5E] justify-end self-end" href={"#"}>
              See All
            </Link>
          </div>
          <div className="w-full max-w-full overflow-auto">
            <CarouselRoot>
              <div className="flex flex-col gap-8 w-full overflow-auto">
                <div className="overflow-auto max-w-full">
                  <CarouselContainer className="no-scrollbar">
                    {loading && !products ? (
                      <ProductCardSkeleton count={3} />
                    ) : (
                      products.map((product: Product) => (
                        <CarouselItem key={product._id}>
                          <ProductCard
                            product={product}
                            onClick={() => openProduct(product)}
                            className="w-76  max-h-[430px]"
                            imageWidth="305px"
                            imageheight="313px"
                          ></ProductCard>
                        </CarouselItem>
                      ))
                    )}
                  </CarouselContainer>
                </div>
                <div className="flex gap-4 justify-center">
                  <CarouselPrev />
                  <CarouselNext />
                </div>
              </div>
            </CarouselRoot>
          </div>
        </section>
        <section className="flex flex-col gap-7 w-full max-w-full overflow-auto">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <h1 className="font-extrabold text-5xl">
              <p>XIV</p>
              <p>COLLECTIONS</p>
              <p>23-25</p>
            </h1>
            <div className="gap-16 flex">
              <div>
                <p>Filters(+)</p>
              </div>
              <div className="flex flex-col gap-2">
                <p>Sorts(-)</p>
                <div className="flex flex-col gap-1 ">
                  <button className="bg-transparent hover:bg-none text-[#5E5E5E] cursor-pointer">
                    Less to more
                  </button>
                  <button className="bg-transparent hover:bg-none text-[#5E5E5E] cursor-pointer">
                    More to less
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-full overflow-auto">
            <div className="flex flex-col gap-8 w-full overflow-auto">
              <div className="overflow-auto max-w-full">
                <div className="no-scrollbar grid md:grid-cols-3 grid-cols-1 gap-8">
                  {xivCollection.map((product: Product) => (
                    <ProductCard
                      onClick={() => openProduct(product)}
                      key={product._id}
                      product={product}
                      className="w-full"
                      imageheight="376px"
                    ></ProductCard>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => router.push(`/shop`)}
                  className="flex flex-col justify-center items-center p-2 hover:text-[#5E5E5E] cursor-pointer"
                >
                  <span className="text-[#5E5E5E]">More</span>
                  <ChevronDown size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full">
          <div className="max-w-2xl text-center flex flex-col gap-2 mx-auto">
            <h3 className="font-base font-beatrice text-5xl">
              Our Approach to fashion design
            </h3>
            <p className="font-light text-base">
              At elegant vogue , we blend creativity with craftsmanship to
              create fashion that transcends trends and stands the test of time
              each design is meticulously crafted, ensuring the highest quelity
              exqulsite finish
            </p>
          </div>
          <div>
            <HorizontalGallery></HorizontalGallery>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
