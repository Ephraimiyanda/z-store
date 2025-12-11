"use client";
import { NavSidebar } from "@/components/nav-sidebar";
import { PaginationBlock } from "@/components/pagination-block";
import { ProductCard } from "@/components/product-card";
import SearchInput from "@/components/search-input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { siteConfig } from "@/config/site";
import { useDebounce } from "@/hooks/use-debounce";
import { useProducts } from "@/hooks/use-products";
import { useProductModal } from "@/providers/product-modal-provider";
import { Product } from "@/types";
import { ChevronRight, SlashIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Shop() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { openProduct } = useProductModal();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number | any>(
    searchParams.get("page") || 1
  );

  const [filters, setFilters] = useState({
    searchQuery: searchParams.get("q") || "",
    sizes: searchParams.get("sizes")?.split(",") || [],
    availability: searchParams.get("availability")?.split(",") || [],
    categories: searchParams.get("categories")?.split(",") || [],
    colors: searchParams.get("colors")?.split(",") || [],
    price: [
      Number(searchParams.get("minPrice")),
      Number(searchParams.get("maxPrice")),
    ],
    collections: searchParams.get("collections")?.split(",") || [],
    tags: searchParams.get("tags")?.split(",") || [],
    ratings: searchParams.get("ratings")?.split(",") || [],
  });

  const { products } = useProducts(filters);
  console.log(products);
  //pagination logic

  const maxNoOfProducts = 16;
  const totalPages = Math.ceil(products.length / maxNoOfProducts);
  const startPage = (currentPage - 1) * maxNoOfProducts;
  const endPage = startPage + maxNoOfProducts;

  function changePage(page: number) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const paginatedProducts = products?.slice(startPage, endPage);

  const toggleArray = (key: string, value: string) => {
    setFilters((prev: any) => {
      const exists = prev[key].includes(value);
      return {
        ...prev,
        [key]: exists
          ? prev[key].filter((v: string) => v !== value)
          : [...prev[key], value],
      };
    });
  };

  const updateURL = useDebounce((updated) => {
    const params = new URLSearchParams();
    if (updated.page) params.set("page", updated.page);
    if (updated.searchQuery) params.set("q", updated.searchQuery);
    if (updated.sizes.length) params.set("sizes", updated.sizes.join(","));
    if (updated.availability.length)
      params.set("availability", updated.availability.join(","));
    if (updated.categories.length)
      params.set("categories", updated.categories.join(","));
    if (updated.colors.length) params.set("colors", updated.colors.join(","));
    if (updated.collections.length)
      params.set("collections", updated.collections.join(","));
    if (updated.tags.length) params.set("tags", updated.tags.join(","));
    if (updated.ratings.length)
      params.set("ratings", updated.ratings.join(","));

    if (updated.price[0]) params.set("minPrice", String(updated.price[0]));

    if (updated.price[1]) params.set("maxPrice", String(updated.price[1]));

    router.replace(`${pathname}?${params.toString()}`);
  }, 500);

  useEffect(() => {
    updateURL(filters);
  }, [filters, currentPage]);

  return (
    <section className="relative overflow-y-auto flex justify-center w-full h-full flex-nowrap items-center gap-24 py-16  dark:bg-black :ditems-start ">
      <div className="flex md:gap-8  w-full mx-auto max-w-7xl md:px-6 px-4">
        <div className="relative w-0 md:min-w-70 h-full overflow-y-auto overflow-x-hidden">
          <NavSidebar
            filters={filters}
            setFilters={setFilters}
            toggleArray={toggleArray}
            isOpen={isSidebarOpen} // <--- Pass State
            onClose={() => setIsSidebarOpen(false)}
          ></NavSidebar>
        </div>
        <main className="relative w-full">
          <div className="w-full flex flex-col justify-center items-center sm:justify-normal sm:items-start gap-4">
            <div>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <SlashIcon />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Products</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <h1 className="text-xl font-bold">PRODUCTS</h1>
            <div className="flex  flex-col w-full gap-4">
              <SearchInput
                value={filters.searchQuery}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    searchQuery: e.target.value,
                  }))
                }
              ></SearchInput>
              <div className="md:hidden flex">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="flex items-center gap-6 cursor-pointer  px-4 py-2 uppercase text-sm font-bold tracking-widest hover:bg-black hover:text-white transition-colors"
                >
                  <span>Filters</span>
                  <ChevronRight />
                </button>
              </div>
              <div className="overflow-x-auto w-full">
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {siteConfig.categories.map((category) => {
                    const isSelected = filters?.categories?.includes(
                      category.toLocaleLowerCase()
                    );
                    return (
                      <button
                        key={category}
                        onClick={() =>
                          toggleArray(
                            "categories",
                            category.toLocaleLowerCase()
                          )
                        }
                        className={`w-25 px-2 py-1 h-6 cursor-pointer flex justify-center items-center  border hover:border-[#1E1E1E] rounded-none hover:bg-[#A3A3A3]/10 text-xs tracking-wide ${
                          isSelected
                            ? "border-[#1E1E1E] bg-[#A3A3A3]/10"
                            : "border-[#A3A3A3]"
                        }`}
                      >
                        <span className="text-nowrap">{category} </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 grid-cols-2 md:gap-x-12 gap-4 pt-4 py-40 w-full">
            {paginatedProducts &&
              paginatedProducts.map((product: Product) => (
                <ProductCard
                  onClick={() => openProduct(product)}
                  key={product._id}
                  product={product}
                  className="min-w-42 "
                  imageheight="314px"
                ></ProductCard>
              ))}
          </div>
          <PaginationBlock
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={changePage}
          />
        </main>
      </div>
    </section>
  );
}
