"use client";

import { useState } from "react";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import SectionHeading from "@/components/common/SectionHeading";
import { useCartStore } from "@/store/cart-store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import OrderSuccess from "@/components/cart/OrderSuccess";
import { ShoppingBag, CreditCard, ShieldCheck } from "lucide-react";

const schema = zod.object({
  firstName: zod.string().min(2, { message: "First name is required" }),
  lastName: zod.string().min(2, { message: "Last name is required" }),
  email: zod.string().email({ message: "Please enter a valid email address" }),
  phone: zod.string().min(10, { message: "Please enter a valid phone number" }),
  address: zod.string().min(5, { message: "Address is too short" }),
  city: zod.string().min(2, { message: "City is required" }),
  state: zod.string().min(2, { message: "State/Province is required" }),
  zipCode: zod.string().min(5, { message: "Invalid zip code" }),
});

export default function CheckoutPage() {
  const { items, getSubtotal, getTotal, clearCart } = useCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isPlaced, setIsPlaced] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema)
  });

  const subtotal = getSubtotal();
  const shipping = subtotal > 5000 ? 0 : 350;
  const total = Math.max(0, subtotal + shipping - discountAmount);

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "GOBIS10") {
      setDiscountAmount(Math.round(subtotal * 0.1));
    } else {
      alert("Invalid coupon code. Try GOBIS10 for 10% off!");
    }
  };

  const onSubmit = () => {
    setIsPlaced(true);
    clearCart();
  };

  if (isPlaced) {
    return (
      <LayoutWrapper>
        <OrderSuccess />
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <div className="py-20 bg-noise min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading 
            title="Complete Your Order" 
            subtitle="Checkout" 
            centered={true}
          />

          {items.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <p className="text-sm text-text-muted">Your cart is empty. Please add items before checking out.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Form Column */}
              <div className="lg:col-span-2 p-6 rounded-none bg-bg-card border border-border space-y-6 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                <h3 className="text-xl font-bold font-heading text-text-primary border-b border-border pb-4">
                  Shipping Information
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-text-secondary">First Name</label>
                      <input
                        type="text"
                        {...register("firstName")}
                        className={`w-full bg-bg-secondary border ${errors.firstName ? 'border-error' : 'border-border focus:border-accent-brand/40'} rounded-none py-2 px-3 text-xs text-text-primary focus:outline-none transition-colors`}
                      />
                      {errors.firstName && <p className="text-[10px] text-error">{errors.firstName.message}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-text-secondary">Last Name</label>
                      <input
                        type="text"
                        {...register("lastName")}
                        className={`w-full bg-bg-secondary border ${errors.lastName ? 'border-error' : 'border-border focus:border-accent-brand/40'} rounded-none py-2 px-3 text-xs text-text-primary focus:outline-none transition-colors`}
                      />
                      {errors.lastName && <p className="text-[10px] text-error">{errors.lastName.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-text-secondary">Email Address</label>
                      <input
                        type="email"
                        {...register("email")}
                        className={`w-full bg-bg-secondary border ${errors.email ? 'border-error' : 'border-border focus:border-accent-brand/40'} rounded-none py-2 px-3 text-xs text-text-primary focus:outline-none transition-colors`}
                      />
                      {errors.email && <p className="text-[10px] text-error">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-text-secondary">Phone Number</label>
                      <input
                        type="text"
                        {...register("phone")}
                        className={`w-full bg-bg-secondary border ${errors.phone ? 'border-error' : 'border-border focus:border-accent-brand/40'} rounded-none py-2 px-3 text-xs text-text-primary focus:outline-none transition-colors`}
                      />
                      {errors.phone && <p className="text-[10px] text-error">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-text-secondary">Shipping Address</label>
                    <input
                      type="text"
                      {...register("address")}
                      className={`w-full bg-bg-secondary border ${errors.address ? 'border-error' : 'border-border focus:border-accent-brand/40'} rounded-none py-2 px-3 text-xs text-text-primary focus:outline-none transition-colors`}
                    />
                    {errors.address && <p className="text-[10px] text-error">{errors.address.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-text-secondary">City</label>
                      <input
                        type="text"
                        {...register("city")}
                        className={`w-full bg-bg-secondary border ${errors.city ? 'border-error' : 'border-border focus:border-accent-brand/40'} rounded-none py-2 px-3 text-xs text-text-primary focus:outline-none transition-colors`}
                      />
                      {errors.city && <p className="text-[10px] text-error">{errors.city.message}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-text-secondary">State / Province</label>
                      <input
                        type="text"
                        {...register("state")}
                        className={`w-full bg-bg-secondary border ${errors.state ? 'border-error' : 'border-border focus:border-accent-brand/40'} rounded-none py-2 px-3 text-xs text-text-primary focus:outline-none transition-colors`}
                      />
                      {errors.state && <p className="text-[10px] text-error">{errors.state.message}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-text-secondary">Zip / Postal Code</label>
                      <input
                        type="text"
                        {...register("zipCode")}
                        className={`w-full bg-bg-secondary border ${errors.zipCode ? 'border-error' : 'border-border focus:border-accent-brand/40'} rounded-none py-2 px-3 text-xs text-text-primary focus:outline-none transition-colors`}
                      />
                      {errors.zipCode && <p className="text-[10px] text-error">{errors.zipCode.message}</p>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-accent-brand hover:bg-accent-light text-primary-foreground font-bold py-3.5 rounded-none transition-all duration-300 shadow-lg shadow-accent-brand/10 hover:shadow-accent-brand/20 text-xs uppercase tracking-wider mt-4"
                  >
                    <CreditCard size={14} /> {isSubmitting ? "Processing..." : "Place Cash on Delivery Order"}
                  </button>
                </form>
              </div>

              {/* Summary Column */}
              <div className="space-y-6">
                <div className="p-6 rounded-none bg-bg-card border border-border space-y-6 relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                  <h3 className="text-lg font-bold font-heading text-text-primary border-b border-border pb-3">
                    Order Summary
                  </h3>

                  <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between items-center text-xs gap-3">
                        <div className="truncate flex-1">
                          <span className="font-bold text-text-primary block truncate">{item.product.name}</span>
                          <span className="text-text-muted text-[10px]">Qty: {item.quantity} • {item.selectedSize}</span>
                        </div>
                        <span className="font-semibold text-text-primary">
                          PKR {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 space-y-2 text-xs">
                    <div className="flex justify-between text-text-secondary">
                      <span>Subtotal</span>
                      <span>PKR {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>Delivery</span>
                      <span>{shipping === 0 ? "Free" : `PKR ${shipping}`}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-success">
                        <span>Coupon Discount</span>
                        <span>- PKR {discountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="border-t border-border pt-2 flex justify-between text-sm font-bold text-text-primary">
                      <span>Total Amount</span>
                      <span className="text-accent-brand">PKR {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Coupon Code Card */}
                <div className="p-6 rounded-none bg-bg-card border border-border space-y-4">
                  <h4 className="text-xs font-semibold text-text-secondary">Have a Coupon?</h4>
                  <form onSubmit={applyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. GOBIS10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-bg-secondary border border-border rounded-none py-2 px-3 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-brand/40 transition-colors"
                    />
                    <button
                      type="submit"
                      className="bg-bg-secondary hover:bg-bg-tertiary border border-border px-4 rounded-none text-xs font-semibold text-text-primary transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                  <p className="text-[10px] text-text-muted leading-relaxed">
                    Use <span className="font-bold text-accent-brand">GOBIS10</span> for a 10% discount on your order.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
}
