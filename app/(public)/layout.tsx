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
  FileText,
  Store,
  Menu,
} from "lucide-react";

import { Footer, type FooterSection } from "@/components/navigation/footer";
import { MobileBottomNav, type BottomNavItem } from "@/components/navigation/mobile-bottom-nav";
import { MobileDrawer, type DrawerItem } from "@/components/navigation/mobile-drawer";
import { Navbar, type NavItem } from "@/components/navigation/navbar";
import { useNavigationState } from "@/components/navigation/navigation-state";

export default function PublicLayout({ children }: { children: ReactNode }) {
  const { isMobileDrawerOpen, setIsMobileDrawerOpen } = useNavigationState();

  // Desktop Navigation Menu
  const navItems: NavItem[] = [
    { label: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
    { label: "Jobs", href: "/jobs", icon: <BriefcaseBusiness className="h-4 w-4" /> },
    { label: "Housing", href: "/housing", icon: <Building2 className="h-4 w-4" /> },
    { label: "Visa Help", href: "/visa", icon: <FileText className="h-4 w-4" /> },
    { label: "News", href: "/news", icon: <Newspaper className="h-4 w-4" /> },
    { label: "AI Assistant", href: "/ai", icon: <Sparkles className="h-4 w-4 text-primary" /> },
  ];

  // Mobile Drawer Navigation (เมื่อกดเมนูข้าง)
  const drawerItems: DrawerItem[] = [
    { label: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
    { label: "Jobs", href: "/jobs", icon: <BriefcaseBusiness className="h-4 w-4" /> },
    { label: "Housing", href: "/housing", icon: <Building2 className="h-4 w-4" /> },
    { label: "Visa Help", href: "/visa", icon: <FileText className="h-4 w-4" /> },
    { label: "Directory", href: "/directory", icon: <Store className="h-4 w-4" /> },
    { label: "News", href: "/news", icon: <Newspaper className="h-4 w-4" /> },
    { label: "AI Assistant", href: "/ai", icon: <Sparkles className="h-4 w-4 text-primary" /> },
    { label: "Profile / Account", href: "/profile", icon: <UserCircle className="h-4 w-4" /> },
  ];

  // Mobile Bottom Navigation Bar (แท็บบาร์ด้านล่างมือถือ)
  const bottomNavItems: BottomNavItem[] = [
    { label: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
    { label: "Jobs", href: "/jobs", icon: <BriefcaseBusiness className="h-5 w-5" /> },
    { label: "Housing", href: "/housing", icon: <Building2 className="h-5 w-5" /> },
    { label: "AI", href: "/ai", icon: <Sparkles className="h-5 w-5 text-primary" /> },
    {
      label: "More",
      icon: <Menu className="h-5 w-5" />,
      action: () => setIsMobileDrawerOpen(true),
    },
  ];

  // Footer Sections
  const footerSections: FooterSection[] = [
    {
      title: "Services",
      links: [
        { label: "Find Jobs", href: "/jobs" },
        { label: "Find Housing", href: "/housing" },
        { label: "Visa Assistance", href: "/visa" },
        { label: "Travel & Tours", href: "/travel" },
        { label: "Money Services", href: "/money" },
        { label: "Ask Mingalar AI", href: "/ai" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "Latest News", href: "/news" },
        { label: "Events", href: "/events" },
        { label: "Business Directory", href: "/directory" },
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources & Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookies Policy", href: "/cookies" },
        { label: "Help & Support", href: "/support" },
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
        description="Your AI-powered platform for living, working, and thriving in Thailand."
      />

      <main className="flex-1 pb-24 md:pb-0" id="main-content" tabIndex={-1}>
        {children}
      </main>

      <Footer
        description="Connecting the Myanmar community in Thailand with trusted local information, resources, and AI assistance."
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
