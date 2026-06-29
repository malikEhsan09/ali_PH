"use client";

import LayoutWrapper from "@/components/layout/LayoutWrapper";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import AboutPreview from "@/components/home/AboutPreview";
import BrandsSection from "@/components/home/BrandsSection";
import CalculatorPreview from "@/components/home/CalculatorPreview";
import PopularProducts from "@/components/home/PopularProducts";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ProjectsShowcase from "@/components/home/ProjectsShowcase";
import ServicesSection from "@/components/home/ServicesSection";
import FAQSection from "@/components/home/FAQSection";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <LayoutWrapper>
      <HeroSection />
      <FeaturedProducts />
      <FeaturedCategories />
      <WhyChooseUs />
      <AboutPreview />
      <BrandsSection />
      <CalculatorPreview />
      <PopularProducts />
      <TestimonialsSection />
      <ProjectsShowcase />
      <ServicesSection />
      <FAQSection />
      <NewsletterSection />
    </LayoutWrapper>
  );
}
