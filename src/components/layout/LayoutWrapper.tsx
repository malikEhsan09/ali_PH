"use client";

import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "../cart/CartDrawer";
import CompareDrawer from "../products/CompareDrawer";
import QuickViewModal from "../products/QuickViewModal";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary bg-noise">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <CartDrawer />
      <CompareDrawer />
      <QuickViewModal />
    </div>
  );
}
