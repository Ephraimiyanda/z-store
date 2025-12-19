"use client";

import { CartProvider } from "./cart-provider";
import { ProductModalProvider } from "./product-modal-provider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <ProductModalProvider>{children}</ProductModalProvider>
    </CartProvider>
  );
}
