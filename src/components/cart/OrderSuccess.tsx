"use client";

import Link from "next/link";
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function OrderSuccess() {
  const orderNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="py-24 text-center max-w-lg mx-auto px-4 sm:px-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-16 h-16 rounded-none bg-success/10 border border-success/20 flex items-center justify-center mx-auto text-success"
      >
        <CheckCircle size={36} />
      </motion.div>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold font-heading text-text-primary">Order Confirmed!</h2>
        <p className="text-sm text-text-secondary">
          Thank you for choosing ALI Paint & Hardware. Your cash on delivery order has been received and is currently being processed.
        </p>
      </div>

      <div className="p-4 rounded-none bg-bg-secondary border border-border space-y-2 text-xs">
        <div className="flex justify-between text-text-secondary">
          <span>Order Number</span>
          <span className="font-bold text-text-primary">#{orderNumber}</span>
        </div>
        <div className="flex justify-between text-text-secondary">
          <span>Estimated Delivery</span>
          <span className="font-bold text-text-primary">1 - 2 Business Days</span>
        </div>
        <div className="flex justify-between text-text-secondary">
          <span>Payment Status</span>
          <span className="font-bold text-accent-brand">Cash on Delivery</span>
        </div>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row gap-4">
        <Link
          href="/products"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-accent-brand hover:bg-accent-light text-primary-foreground font-bold py-3 rounded-none transition-all duration-300"
        >
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-bg-secondary hover:bg-bg-tertiary border border-border text-text-primary py-3 rounded-none transition-all duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
