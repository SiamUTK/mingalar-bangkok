'use client'

import {
  Navbar,
  MobileBottomNav,
  MobileDrawer,
  Footer,
} from '@/components/navigation'
import {
  HeroSection,
  GlobalSearchSection,
  CategoryGrid,
  FeaturedBusinesses,
  AIAssistantBanner,
  LatestJobs,
  LatestNews,
  CTASection,
} from '@/components/sections'
import { useState } from 'react'

const navItems = [
  { label: 'Directory', href: '/directory' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'Housing', href: '/housing' },
  { label: 'Travel', href: '/travel' },
  { label: 'Community', href: '/community' },
]

const mobileNavItems = [
  { label: 'Home', href: '/', icon: 'Home' },
  { label: 'Directory', href: '/directory', icon: 'Store' },
  { label: 'Jobs', href: '/jobs', icon: 'Briefcase' },
  { label: 'Chat', href: '/ai-assistant', icon: 'MessageCircle' },
  { label: 'Menu', href: '#menu', icon: 'Menu' },
]

const drawerItems = [
  { label: 'Home', href: '/' },
  { label: 'Directory', href: '/directory' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'Housing', href: '/housing' },
  { label: 'Travel & Tours', href: '/travel' },
  { label: 'Events', href: '/events' },
  { label: 'Learn Thai', href: '/learn' },
  { label: 'Community', href: '/community' },
  { label: 'Settings', href: '/settings' },
  { label: 'Help', href: '/help' },
]

const footerSections = [
  {
    title: 'Platform',
    links: [
      { label: 'Directory', href: '/directory' },
      { label: 'Jobs', href: '/jobs' },
      { label: 'Housing', href: '/housing' },
      { label: 'Travel', href: '/travel' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Events', href: '/events' },
      { label: 'Learn Thai', href: '/learn' },
      { label: 'Stories', href: '/stories' },
      { label: 'Forum', href: '/forum' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

export default function HomePage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activeBottomNav, setActiveBottomNav] = useState('home')

  return (
    <>
      {/* Top Navigation */}
      <Navbar
        navItems={navItems}
        onMenuClick={() => setIsDrawerOpen(true)}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        items={drawerItems}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* Main Content */}
      <main className="bg-background">
        {/* Hero Section */}
        <div className="bg-background">
          <HeroSection />
        </div>

        {/* Global Search Section */}
        <div>
          <GlobalSearchSection />
        </div>

        {/* Category Grid */}
        <div className="bg-secondary/2">
          <CategoryGrid />
        </div>

        {/* Featured Businesses */}
        <div className="bg-background">
          <FeaturedBusinesses />
        </div>

        {/* AI Assistant Banner */}
        <div className="bg-secondary/3">
          <AIAssistantBanner />
        </div>

        {/* Latest Jobs */}
        <div className="bg-secondary/3">
          <LatestJobs />
        </div>

        {/* Latest News */}
        <div className="bg-background">
          <LatestNews />
        </div>

        {/* CTA Section */}
        <div className="bg-secondary/5">
          <CTASection />
        </div>
      </main>

      {/* Footer */}
      <Footer
        brandName="Mingalar Bangkok"
        brandDescription="Your trusted platform for the Myanmar community in Thailand"
        footerSections={footerSections}
        socialLinks={[
          { platform: 'facebook', url: 'https://facebook.com/mingalarbangkok' },
          { platform: 'twitter', url: 'https://twitter.com/mingalarbangkok' },
          { platform: 'instagram', url: 'https://instagram.com/mingalarbangkok' },
        ]}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        items={mobileNavItems}
        activeItem={activeBottomNav}
        onItemClick={(item) => setActiveBottomNav(item.label.toLowerCase())}
      />
    </>
  )
}

