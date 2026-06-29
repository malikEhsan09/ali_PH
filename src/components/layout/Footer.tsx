"use client";

import Link from "next/link";
import Logo from "@/components/common/Logo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { 
  Mail, Phone, MapPin, Clock, ArrowUp, Send 
} from "lucide-react";

const schema = zod.object({
  email: zod.string().email({ message: "Please enter a valid email address" }),
});

export default function Footer() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "" }
  });

  const onSubmit = () => {
    reset();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-bg-secondary border-t border-border pt-16 pb-8 overflow-hidden bg-noise">
      {/* Decorative Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-radial pointer-events-none opacity-50 z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="group inline-flex">
              <Logo size={36} showName className="group-hover:opacity-90 transition-opacity" />
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed">
              Authorized affiliate and premium dealer of Gobis Paints Pakistan. We deliver state-of-the-art paint formulations and top-tier hardware solutions for premium residential, commercial, and industrial spaces.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-none bg-bg-secondary border border-border flex items-center justify-center text-text-secondary hover:text-accent-brand hover:border-accent-brand/50 transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-none bg-bg-secondary border border-border flex items-center justify-center text-text-secondary hover:text-accent-brand hover:border-accent-brand/50 transition-all duration-300">
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-none bg-bg-secondary border border-border flex items-center justify-center text-text-secondary hover:text-accent-brand hover:border-accent-brand/50 transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold font-heading text-text-primary mb-6 relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-4 before:bg-accent-brand before:rounded-full">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-text-secondary hover:text-accent-brand transition-colors duration-200">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-text-secondary hover:text-accent-brand transition-colors duration-200">
                  Browse Products
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-text-secondary hover:text-accent-brand transition-colors duration-200">
                  Paint Calculator
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-text-secondary hover:text-accent-brand transition-colors duration-200">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-text-secondary hover:text-accent-brand transition-colors duration-200">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-accent-brand transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-base font-semibold font-heading text-text-primary mb-6 relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-4 before:bg-accent-brand before:rounded-full">
              Categories
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/products?category=interior-paints" className="text-text-secondary hover:text-accent-brand transition-colors duration-200">
                  Interior Emulsions
                </Link>
              </li>
              <li>
                <Link href="/products?category=exterior-paints" className="text-text-secondary hover:text-accent-brand transition-colors duration-200">
                  Weather Shield Exterior
                </Link>
              </li>
              <li>
                <Link href="/products?category=wood-finishes" className="text-text-secondary hover:text-accent-brand transition-colors duration-200">
                  Wood Polishes & Stains
                </Link>
              </li>
              <li>
                <Link href="/products?category=waterproofing" className="text-text-secondary hover:text-accent-brand transition-colors duration-200">
                  Protective Waterproofing
                </Link>
              </li>
              <li>
                <Link href="/products?category=textures" className="text-text-secondary hover:text-accent-brand transition-colors duration-200">
                  Designer Textures
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-semibold font-heading text-text-primary mb-6 relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-4 before:bg-accent-brand before:rounded-full">
                Newsletter
              </h3>
              <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                Subscribe to receive seasonal color updates, product announcements, and exclusive dealer offers.
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Your email address"
                  {...register("email")}
                  className={`w-full bg-bg-secondary border ${errors.email ? 'border-error' : 'border-border focus:border-accent-brand/50'} rounded-none py-2.5 pl-4 pr-12 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-all duration-300`}
                />
                <button
                  type="submit"
                  className="absolute right-1 w-9 h-9 rounded-none bg-accent-brand hover:bg-accent-light text-primary-foreground flex items-center justify-center transition-all duration-300"
                >
                  <Send size={16} />
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
        </div>

        {/* Contact Info Strips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-b border-border mb-8 text-sm">
          <div className="flex items-center gap-3 text-text-secondary">
            <div className="w-9 h-9 rounded-none bg-bg-secondary flex items-center justify-center text-accent-brand">
              <Phone size={16} />
            </div>
            <div>
              <p className="text-[10px] text-text-muted uppercase tracking-wider">Phone Support</p>
              <p className="font-medium">+92 324 5555630</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-text-secondary">
            <div className="w-9 h-9 rounded-none bg-bg-secondary flex items-center justify-center text-accent-brand">
              <MapPin size={16} />
            </div>
            <div>
              <p className="text-[10px] text-text-muted uppercase tracking-wider">Store Location</p>
              <p className="font-medium">Ari Syedan, DHA Phase 5, Islamabad</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-text-secondary">
            <div className="w-9 h-9 rounded-none bg-bg-secondary flex items-center justify-center text-accent-brand">
              <Clock size={16} />
            </div>
            <div>
              <p className="text-[10px] text-text-muted uppercase tracking-wider">Store Hours</p>
              <p className="font-medium">Monday – Saturday: 9:00 AM – 8:00 PM</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div>
            © {new Date().getFullYear()} ALI Paint & Hardware. All Rights Reserved. Authorized Affiliate & Dealer of Gobis Paints Pakistan.
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-accent-brand">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Authorized Gobis Dealer
            </span>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-1 hover:text-accent-brand transition-colors duration-200"
            >
              Back to Top
              <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
