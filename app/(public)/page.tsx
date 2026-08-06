import { FloatingSearch } from "@/components/home/floating-search";
import { AnimatedPage } from "@/components/ui/AnimatedPage";
import {
  HeroSection,
  AISection,
  CategorySection,
  FeaturedBusinessSection,
  LatestJobsSection,
  HousingSection,
  DashboardPreviewSection,
  EventsSection,
  LatestNewsSection,
  TestimonialSection,
  CTASection } from "@/components/home";

export default function HomePage() {
  return (
    <AnimatedPage>
      <main className="min-h-screen">
        <FloatingSearch />

        {/* 1. Hero & Universal Search */}
        <HeroSection />

        {/* 2. Ask Mingalar AI Experience */}
        <AISection />

        {/* 3. Core Directory & Categories */}
        <CategorySection />
        <FeaturedBusinessSection />

        {/* 4. Listings (Jobs & Housing) */}
        <LatestJobsSection />
        <HousingSection />

        {/* 5. Personalized Discover Hub Preview */}
        <DashboardPreviewSection />

        {/* 6. Community & Info (Events, News, Testimonials) */}
        <EventsSection />
        <LatestNewsSection />
        <TestimonialSection />

        {/* 7. Final Call to Action */}
        <CTASection />
      </main>
    </AnimatedPage>
  );
}
