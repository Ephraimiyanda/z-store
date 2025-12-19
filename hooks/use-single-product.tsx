import { Filters, Product } from "@/types";
import { useEffect, useState } from "react";

export function useSingleProduct(_id: string | null) {
  const [product, setProduct] = useState<Product | null>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!_id) {
      setProduct(null);
      setLoading(false);
      return;
    }
    const controller = new AbortController();

    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${_id}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setProduct(data);
      } catch (e: unknown) {
        //@ts-ignore
        if (e.name !== "AbortError") console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();

    return () => controller.abort();
  }, [_id]);

  return { product, loading };
}
