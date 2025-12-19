import { Filters } from "@/types";
import { useEffect, useState } from "react";

export function useProducts(filters: Filters) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      const query = new URLSearchParams();

      if (filters.searchQuery) query.set("q", filters.searchQuery);
      if (filters.colors?.length) query.set("colors", filters.colors.join(","));
      if (filters.sizes?.length) query.set("sizes", filters.sizes?.join(","));
      if (filters.availability?.length)
        query.set("availability", filters.availability.join(","));
      if (filters.categories?.length)
        query.set("categories", filters.categories.join(","));
      if (filters.colors?.length) query.set("colors", filters.colors.join(","));
      if (filters.collections?.length)
        query.set("collections", filters.collections.join(","));
      if (filters.tags?.length) query.set("tags", filters.tags.join(","));
      if (filters.ratings?.length)
        query.set("ratings", filters.ratings.join(","));
      if (filters.price && filters.price[0])
        query.set("minPrice", String(filters.price[0]));
      if (filters.price && filters.price[1])
        query.set("maxPrice", String(filters.price[1]));
      try {
        const res = await fetch(`/api/products?${query.toString()}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        if (data) {
          setProducts(data);
        }
      } catch (e: unknown) {
        //@ts-ignore
        if (e.name !== "AbortError") console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();

    return () => controller.abort();
  }, [JSON.stringify(filters)]);

  return { products, loading };
}
