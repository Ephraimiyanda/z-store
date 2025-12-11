"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Suspense,
  ReactNode,
} from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { ProductDetailsModal } from "@/components/product-details"; // Check path
import { Product } from "@/types";
import { useSingleProduct } from "@/hooks/use-single-product";

interface ProductModalContextType {
  selectedProduct: Product | null;
  openProduct: (product: Product) => void;
  closeProduct: () => void;
}

const ProductModalContext = createContext<ProductModalContextType | undefined>(
  undefined
);

// --- URL SYNCHRONIZER ---
// This component listens to the URL to handle Back Button & Deep Links.
// It NEVER pushes to the URL, preventing infinite loops.
const UrlSynchronizer = ({
  selectedProduct,
  setSelectedProduct,
}: {
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
}) => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");

  // 1. Get isLoading from your hook
  const { product, loading } = useSingleProduct(productId);

  useEffect(() => {
    // 2. If there is NO ID in the URL, clear selection immediately.
    if (!productId) {
      if (selectedProduct) setSelectedProduct(null);
      return;
    }
    if (loading) return;

    if (product) {
      // Optional: Prevent unnecessary re-renders
      const currentId = selectedProduct?._id;
      const newId = product._id;

      if (currentId !== newId) {
        setSelectedProduct(product);
      }
    }
  }, [productId, product, loading, selectedProduct, setSelectedProduct]);

  return null;
};

// --- MAIN PROVIDER ---
export const ProductModalProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const openProduct = (product: Product) => {
    setSelectedProduct(product);

    router.push(`${pathname}?product=${product._id}`, { scroll: false });
  };

  const closeProduct = () => {
    setSelectedProduct(null);
    router.push(pathname, { scroll: false });
  };

  return (
    <ProductModalContext.Provider
      value={{ selectedProduct, openProduct, closeProduct }}
    >
      <Suspense fallback={null}>
        <UrlSynchronizer
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      </Suspense>

      {children}

      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailsModal
            product={selectedProduct}
            onClose={closeProduct}
          />
        )}
      </AnimatePresence>
    </ProductModalContext.Provider>
  );
};

export const useProductModal = () => {
  const context = useContext(ProductModalContext);
  if (!context) {
    throw new Error(
      "useProductModal must be used within a ProductModalProvider"
    );
  }
  return context;
};
