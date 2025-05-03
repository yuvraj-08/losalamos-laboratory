"use client";

import { useState } from "react";
import { CartButton } from "./CartButton";
import { CartModal } from "./CartModal";

export function CartContainer() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <CartButton onClick={() => setIsCartOpen(true)} />
      </div>
      <CartModal open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}
