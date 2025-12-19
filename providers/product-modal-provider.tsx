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
import { ProductDetailsModal } from "@/components/product-details";
import { Product } from "@/types";
import { useSingleProduct } from "@/hooks/use-single-product";

interface ProductModalContextType {
  selectedProduct: Product | null;
  setLocalProducts: (products: Product[]) => void;
  openProduct: (product: Product) => void;
  closeProduct: () => void;
}

const ProductModalContext = createContext<ProductModalContextType | undefined>(
  undefined
);

const UrlSynchronizer = ({
  selectedProduct,
  setSelectedProduct,
  localProducts,
}: {
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  localProducts: Product[];
}) => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");

  const { product: fetchedProduct, loading } = useSingleProduct(
    !selectedProduct && !localProducts.find((p) => p._id === productId)
      ? productId
      : null
  );

  useEffect(() => {
    if (!productId) {
      if (selectedProduct) setSelectedProduct(null);
      return;
    }
    const localMatch = localProducts.find((p) => p._id === productId);

    if (localMatch) {
      if (selectedProduct?._id !== localMatch._id) {
        setSelectedProduct(localMatch);
      }
      return;
    }
    if (!loading && fetchedProduct) {
      if (selectedProduct?._id !== fetchedProduct._id) {
        setSelectedProduct(fetchedProduct);
      }
    }
  }, [
    productId,
    fetchedProduct,
    loading,
    localProducts,
    selectedProduct,
    setSelectedProduct,
  ]);

  return null;
};

export const ProductModalProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
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
      value={{ selectedProduct, openProduct, closeProduct, setLocalProducts }}
    >
      <Suspense fallback={null}>
        <UrlSynchronizer
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          localProducts={localProducts}
        />
      </Suspense>

      {children}

      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailsModal
            key={selectedProduct._id}
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
  if (!context)
    throw new Error(
      "useProductModal must be used within a ProductModalProvider"
    );
  return context;
};
