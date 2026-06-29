"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Send, Mail } from "lucide-react";

const schema = zod.object({
  email: zod.string().email({ message: "Please enter a valid email address" }),
});

export default function NewsletterSection() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "" }
  });

  const onSubmit = () => {
    reset();
  };

  return (
    <section className="py-24 bg-bg-primary relative overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-brand/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="rounded-none border border-border bg-bg-card p-8 md:p-12 text-center space-y-6 relative overflow-hidden shadow-2xl">
          {/* Top light bar */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          <div className="w-12 h-12 rounded-none bg-accent-brand/10 border border-accent-brand/20 flex items-center justify-center mx-auto text-accent-brand mb-4">
            <Mail className="w-6 h-6" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary tracking-tight">
            Stay Inspired & Informed
          </h2>
          <p className="text-sm text-text-secondary max-w-lg mx-auto leading-relaxed">
            Join our exclusive subscriber network to receive design guides, professional paint calculators, trending shade palettes, and authorized Gobis Paint promotions.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto relative flex items-center">
            <input
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
              className={`w-full bg-bg-secondary border ${errors.email ? 'border-error' : 'border-border focus:border-accent-brand/50'} rounded-none py-3.5 pl-4 pr-12 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-all duration-300`}
            />
            <button
              type="submit"
              className="absolute right-1.5 w-10 h-10 rounded-none bg-accent-brand hover:bg-accent-light text-primary-foreground flex items-center justify-center transition-all duration-300"
            >
              <Send size={18} />
            </button>
          </form>

          {errors.email && (
            <p className="text-xs text-error mt-2">{errors.email.message}</p>
          )}
          {isSubmitSuccessful && (
            <p className="text-xs text-success mt-2">Thank you for subscribing!</p>
          )}
        </div>
      </div>
    </section>
  );
}
