"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/common/Logo";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ShoppingCart, Heart, Menu, X, ChevronDown,
  Phone, MapPin, Clock,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useUIStore } from "@/store/ui-store";
import ThemeToggle from "@/components/common/ThemeToggle";
import { useHydrated } from "@/lib/use-hydrated";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Interior Paints", href: "/products?category=interior-paints" },
      { label: "Exterior Paints", href: "/products?category=exterior-paints" },
      { label: "Wood Finishes", href: "/products?category=wood-finishes" },
      { label: "Primers", href: "/products?category=primers" },
      { label: "Textures", href: "/products?category=textures" },
      { label: "Waterproofing", href: "/products?category=waterproofing" },
      { label: "View All Products", href: "/products" },
    ],
  },
  { label: "Calculator", href: "/calculator" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { mobileMenuOpen, setMobileMenuOpen, setCartDrawerOpen, setSearchOpen } = useUIStore();
  const cartCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const hydrated = useHydrated();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-xs text-text-muted">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Phone size={12} className="text-accent-brand" /> +92 324 5555630
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="text-accent-brand" /> Ari Syedan, Islamabad
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-accent-brand" /> Mon–Sat: 9AM–8PM
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-accent-brand font-medium">
              ✦ Authorized Gobis Paints Dealer
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-strong shadow-lg shadow-black/10 dark:shadow-black/40"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" aria-label="Ali Paint & Hardware home" className="group cursor-pointer">
              <Logo size={36} showName className="hidden sm:flex group-hover:opacity-90 transition-opacity" />
              <Logo size={36} className="sm:hidden group-hover:opacity-90 transition-opacity" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    item.children && setActiveDropdown(item.label)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 rounded-none hover:bg-bg-secondary cursor-pointer"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-56 glass-strong rounded-none p-2 shadow-xl shadow-black/10 dark:shadow-black/40"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-3 py-2 text-sm text-text-secondary hover:text-accent-brand hover:bg-bg-secondary rounded-none transition-all duration-200"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-none hover:bg-bg-secondary transition-colors text-text-secondary hover:text-text-primary cursor-pointer"
                aria-label="Search products"
              >
                <Search size={20} />
              </button>

              <Link
                href="/products"
                className="relative p-2.5 rounded-none hover:bg-bg-secondary transition-colors text-text-secondary hover:text-text-primary cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {hydrated && wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-none bg-accent-brand text-primary-foreground text-[10px] font-bold flex items-center justify-center border border-border">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={() => setCartDrawerOpen(true)}
                className="relative p-2.5 rounded-none hover:bg-bg-secondary transition-colors text-text-secondary hover:text-text-primary cursor-pointer"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                {hydrated && cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-none bg-accent-brand text-primary-foreground text-[10px] font-bold flex items-center justify-center border border-border">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-none hover:bg-bg-secondary transition-colors text-text-secondary cursor-pointer"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-bg-primary/98 backdrop-blur-xl lg:hidden"
          >
            <div className="pt-24 px-6 pb-8 h-full overflow-y-auto">
              <nav className="space-y-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-3 px-4 text-lg font-medium text-text-secondary hover:text-accent-brand transition-colors border-b border-border"
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="pl-8 space-y-1 py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2 text-sm text-text-muted hover:text-accent-brand transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>

              <div className="mt-8 pt-8 border-t border-border space-y-4">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchOpen(true);
                  }}
                  className="w-full flex items-center gap-2 py-3 px-4 text-sm text-text-secondary hover:text-accent-brand border border-border hover:border-accent-brand/40 transition-colors cursor-pointer"
                >
                  <Search size={16} /> Search Products
                </button>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">Appearance</span>
                  <ThemeToggle />
                </div>
                <p className="text-text-muted text-sm flex items-center gap-2">
                  <Phone size={14} className="text-accent-brand" /> +92 324 5555630
                </p>
                <p className="text-text-muted text-sm flex items-center gap-2">
                  <MapPin size={14} className="text-accent-brand" /> Ari Syedan, Islamabad
                </p>
                <p className="text-accent-brand text-sm font-medium mt-4">
                  ✦ Authorized Gobis Paints Dealer
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
