// app/page.tsx

import { FloatingSearch } from "@/components/home/floating-search";
import { AnimatedPage } from "@/components/ui/AnimatedPage";
import {
  HeroSection,
  TrustedSection,
  CategorySection,
  FeaturedBusinessSection,
  AISection,
  LatestJobsSection,
  HousingSection,
  EventsSection,
  LatestNewsSection,
  TestimonialSection,
  CTASection,
} from "@/components/home";

export default function HomePage() {
  return (
    <AnimatedPage>
      <main className="min-h-screen">
        <FloatingSearch />
        <HeroSection />
        <TrustedSection />
        <CategorySection />
        <FeaturedBusinessSection />
        <AISection />
        <LatestJobsSection />
        <HousingSection />
        <EventsSection />
        <LatestNewsSection />
        <TestimonialSection />
        <CTASection />
      </main>
    </AnimatedPage>
  );
}
