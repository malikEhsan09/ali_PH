"use client";

import LayoutWrapper from "@/components/layout/LayoutWrapper";
import SectionHeading from "@/components/common/SectionHeading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Phone, MapPin, Clock, Mail, Send, Check } from "lucide-react";
import { useState } from "react";
import LocationMap from "@/components/contact/LocationMap";

const schema = zod.object({
  name: zod.string().min(2, { message: "Name must be at least 2 characters" }),
  email: zod.string().email({ message: "Please enter a valid email address" }),
  phone: zod.string().min(10, { message: "Please enter a valid phone number" }),
  subject: zod.string().min(3, { message: "Subject must be at least 3 characters" }),
  message: zod.string().min(10, { message: "Message must be at least 10 characters" }),
});

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" }
  });

  const onSubmit = () => {
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <LayoutWrapper>
      <div className="py-20 bg-noise min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading 
            title="Get in Touch With Our Team" 
            subtitle="Contact Us" 
            centered={true}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-20">
            {/* Info Cards Column */}
            <div className="space-y-6">
              <div className="p-6 rounded-none bg-bg-card border border-border space-y-4">
                <h3 className="text-lg font-bold font-heading text-text-primary">ALI Paint & Hardware</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Authorized Gobis Paints dealer showroom. Drop by to see physical shade cards, try computerized mixing, or consult with our project experts.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 text-xs text-text-secondary">
                <div className="flex items-center gap-3 p-4 rounded-none bg-bg-secondary border border-border">
                  <div className="w-10 h-10 rounded-none bg-accent-brand/10 border border-accent-brand/20 flex items-center justify-center text-accent-brand flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-text-muted uppercase">Phone Support</span>
                    <p className="font-bold text-text-primary mt-0.5">+92 324 5555630</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-none bg-bg-secondary border border-border">
                  <div className="w-10 h-10 rounded-none bg-accent-brand/10 border border-accent-brand/20 flex items-center justify-center text-accent-brand flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-text-muted uppercase">Email Address</span>
                    <p className="font-bold text-text-primary mt-0.5">info@alipaints.pk</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-none bg-bg-secondary border border-border">
                  <div className="w-10 h-10 rounded-none bg-accent-brand/10 border border-accent-brand/20 flex items-center justify-center text-accent-brand flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-text-muted uppercase">Store Location</span>
                    <p className="font-bold text-text-primary mt-0.5">Ari Syedan, DHA Phase 5, Islamabad</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-none bg-bg-secondary border border-border">
                  <div className="w-10 h-10 rounded-none bg-accent-brand/10 border border-accent-brand/20 flex items-center justify-center text-accent-brand flex-shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-text-muted uppercase">Business Hours</span>
                    <p className="font-bold text-text-primary mt-0.5">Mon - Sat: 9:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="lg:col-span-2 p-6 rounded-none bg-bg-card border border-border space-y-6 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

              <h3 className="text-xl font-bold font-heading text-text-primary border-b border-border pb-4">
                Send a Message
              </h3>

              {submitted && (
                <div className="p-4 rounded-none bg-success/10 border border-success/20 text-success text-xs flex items-center gap-2">
                  <Check size={16} />
                  <span>Thank you! Your message has been successfully sent. We will get back to you shortly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-text-secondary">Your Name</label>
                    <input
                      type="text"
                      {...register("name")}
                      className={`w-full bg-bg-secondary border ${errors.name ? 'border-error' : 'border-border focus:border-accent-brand/40'} rounded-none py-2 px-3 text-xs text-text-primary focus:outline-none transition-colors`}
                    />
                    {errors.name && <p className="text-[10px] text-error">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-text-secondary">Email Address</label>
                    <input
                      type="email"
                      {...register("email")}
                      className={`w-full bg-bg-secondary border ${errors.email ? 'border-error' : 'border-border focus:border-accent-brand/40'} rounded-none py-2 px-3 text-xs text-text-primary focus:outline-none transition-colors`}
                    />
                    {errors.email && <p className="text-[10px] text-error">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-text-secondary">Phone Number</label>
                    <input
                      type="text"
                      {...register("phone")}
                      className={`w-full bg-bg-secondary border ${errors.phone ? 'border-error' : 'border-border focus:border-accent-brand/40'} rounded-none py-2 px-3 text-xs text-text-primary focus:outline-none transition-colors`}
                    />
                    {errors.phone && <p className="text-[10px] text-error">{errors.phone.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-text-secondary">Subject</label>
                    <input
                      type="text"
                      {...register("subject")}
                      className={`w-full bg-bg-secondary border ${errors.subject ? 'border-error' : 'border-border focus:border-accent-brand/40'} rounded-none py-2 px-3 text-xs text-text-primary focus:outline-none transition-colors`}
                    />
                    {errors.subject && <p className="text-[10px] text-error">{errors.subject.message}</p>}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-text-secondary">Your Message</label>
                  <textarea
                    rows={5}
                    {...register("message")}
                    className={`w-full bg-bg-secondary border ${errors.message ? 'border-error' : 'border-border focus:border-accent-brand/40'} rounded-none py-2.5 px-3 text-xs text-text-primary focus:outline-none transition-colors resize-none`}
                  />
                  {errors.message && <p className="text-[10px] text-error">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-accent-brand hover:bg-accent-light disabled:opacity-50 text-primary-foreground font-bold py-3 rounded-none transition-all duration-300 shadow-lg shadow-accent-brand/10 hover:shadow-accent-brand/20 text-xs uppercase tracking-wider"
                >
                  <Send size={14} /> {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <LocationMap />
    </LayoutWrapper>
  );
}
