"use client";

import { type ReactNode } from "react";
import {
  Home,
  BriefcaseBusiness,
  Building2,
  Newspaper,
  Sparkles,
  UserCircle,
  Globe2,
} from "lucide-react";

import { Footer, type FooterSection } from "@/components/navigation/footer";
import { MobileBottomNav, type BottomNavItem } from "@/components/navigation/mobile-bottom-nav";
import { MobileDrawer, type DrawerItem } from "@/components/navigation/mobile-drawer";
import { Navbar, type NavItem } from "@/components/navigation/navbar";
import { useNavigationState } from "@/components/navigation/navigation-state";

export default function PublicLayout({ children }: { children: ReactNode }) {
  const { isMobileDrawerOpen, setIsMobileDrawerOpen } = useNavigationState();

  const navItems: NavItem[] = [
    { label: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
    { label: "Housing", href: "/housing", icon: <Building2 className="h-4 w-4" /> },
    { label: "Jobs", href: "/jobs", icon: <BriefcaseBusiness className="h-4 w-4" /> },
    { label: "News", href: "/news", icon: <Newspaper className="h-4 w-4" /> },
    { label: "AI Assistant", href: "/ai-assistant", icon: <Sparkles className="h-4 w-4" /> },
  ];

  const drawerItems: DrawerItem[] = [
    { label: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
    { label: "Housing", href: "/housing", icon: <Building2 className="h-4 w-4" /> },
    { label: "Jobs", href: "/jobs", icon: <BriefcaseBusiness className="h-4 w-4" /> },
    { label: "News", href: "/news", icon: <Newspaper className="h-4 w-4" /> },
    { label: "AI Assistant", href: "/ai-assistant", icon: <Sparkles className="h-4 w-4" /> },
    { label: "Profile", href: "/profile", icon: <UserCircle className="h-4 w-4" /> },
  ];

  const bottomNavItems: BottomNavItem[] = [
    { label: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
    { label: "Housing", href: "/housing", icon: <Building2 className="h-5 w-5" /> },
    { label: "Jobs", href: "/jobs", icon: <BriefcaseBusiness className="h-5 w-5" /> },
    { label: "News", href: "/news", icon: <Newspaper className="h-5 w-5" /> },
    { label: "AI", href: "/ai-assistant", icon: <Sparkles className="h-5 w-5" /> },
  ];

  const footerSections: FooterSection[] = [
    {
      title: "Explore",
      links: [
        { label: "Housing", href: "/housing" },
        { label: "Jobs", href: "/jobs" },
        { label: "News", href: "/news" },
        { label: "AI Assistant", href: "/ai-assistant" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Support", href: "/support" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Help Center", href: "/help" },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar
        brand="Mingalar Bangkok"
        items={navItems}
        onMobileMenuToggle={setIsMobileDrawerOpen}
        className="sticky top-0"
      />

      <MobileDrawer
        open={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        items={drawerItems}
        brand="Mingalar Bangkok"
        description="Discover homes, jobs, news, and AI support for the Myanmar community."
      />

      <main className="flex-1 pb-24 md:pb-0" id="main-content" tabIndex={-1}>
        {children}
      </main>

      <Footer
        brand="Mingalar Bangkok"
        description="Connecting the Myanmar community in Thailand with trusted local information and resources."
        sections={footerSections}
        socialLinks={[
          { label: "Facebook", href: "https://facebook.com", icon: <Globe2 className="h-4 w-4" /> },
          {
            label: "Website",
            href: "https://mingalarbangkok.com",
            icon: <Globe2 className="h-4 w-4" />,
          },
        ]}
      />

      <MobileBottomNav items={bottomNavItems} className="pb-safe" />
    </div>
  );
}
