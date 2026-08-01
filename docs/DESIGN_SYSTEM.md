
# DESIGN_SYSTEM.md

# Mingalar Bangkok Design System

**Version:** 2.0 Enterprise

> AI-First Super App for the Myanmar Community in Thailand

---

# Design Philosophy

Design every interface around one principle:

**Help Myanmar users complete everyday tasks quickly, confidently, and comfortably.**

Core Values

- Friendly
- Trustworthy
- Inclusive
- Premium
- Modern
- Mobile First
- Accessible
- Fast
- Simple

---

# Design Inspiration

Inspired by

- Apple
- Airbnb
- Google Maps
- Grab
- LINE
- Notion
- Booking.com

Avoid

- Heavy gradients
- Excessive glassmorphism
- Neon overload
- Visual clutter
- Unnecessary animations

---

# Design Tokens

## Primary

Ruby Red — #C62828

## Secondary

Warm Gold — #D4AF37

## Accent

Deep Navy — #1E3A5F

## Background

Warm White — #FAFAF8

## Surface

White — #FFFFFF

## Text

Primary — #1F2937

Secondary — #6B7280

Muted — #9CA3AF

## Border

#E5E7EB

## Success

#16A34A

## Warning

#F59E0B

## Danger

#DC2626

---

# Typography

Primary Font

- Geist

Fallback

- Inter

Scale

- H1 48
- H2 36
- H3 30
- H4 24
- H5 20
- Body 16
- Small 14
- Caption 12

Weights

400 / 500 / 600 / 700

---

# Spacing

Base Unit: 8px

4 8 12 16 24 32 48 64 80 96

---

# Radius

Cards 16px

Buttons 12px

Inputs 12px

Dialogs 20px

Badges Full

---

# Shadows

Use subtle elevation only.

Hover state should feel responsive without floating excessively.

---

# Layout

Container

1280px

Section Padding

Desktop 80px

Tablet 48px

Mobile 32px

12-column responsive grid.

---

# Navigation

Desktop

- Sticky Navbar

Mobile

- Bottom Navigation
- Floating AI Action Button

Always provide search access.

---

# Core Components

Required

- Navbar
- Footer
- Hero
- AI Hero
- Global Search
- Quick Actions
- Category Grid
- Business Card
- Job Card
- Housing Card
- Travel Card
- Event Card
- News Card
- Community Feed Card
- AI Assistant Card
- CTA Section
- Breadcrumb
- Pagination
- Modal
- Drawer
- Dialog
- Toast
- Avatar
- Badge
- Empty State
- Loading Skeleton

---

# Forms

- Clear labels
- Zod validation
- Helpful error messages
- Never rely on placeholders as labels

---

# Icons

Library

Lucide React

Outline style only.

---

# Motion

Framer Motion

150–250ms

Respect prefers-reduced-motion.

---

# Responsive

- Mobile <768
- Tablet ≥768
- Laptop ≥1024
- Desktop ≥1280
- Large ≥1536

Mobile-first by default.

---

# Accessibility

Follow WCAG 2.2 AA

Include

- Semantic HTML
- Keyboard Navigation
- Visible Focus
- ARIA Labels
- Color Contrast AA
- Screen Reader Support

---

# Dark Mode

Required.

Use neutral dark surfaces.

Avoid pure black.

---

# Images

Use Next.js Image.

- Responsive
- Lazy Loading
- Rounded corners
- Optimized formats

---

# Tailwind CSS

- Tailwind CSS v4
- Prefer semantic utilities
- Avoid arbitrary values
- Reusable utility patterns
- Keep components modular

---

# UI Principles

Every page must immediately answer:

1. Where am I?
2. What can I do?
3. What should I do next?

Every major page should contain:

- Primary CTA
- Search or Quick Action
- Clear visual hierarchy
- Helpful empty state

---

# AI Experience

AI is a first-class feature.

Always provide:

- Easy AI entry point
- Suggested prompts
- Conversation history
- Context-aware recommendations

---

# Internationalization

Support

- English
- Thai
- Myanmar

Design layouts for variable text lengths.

---

# Design Quality Checklist

Before release verify:

- Mobile responsive
- Accessibility passed
- Performance optimized
- Consistent spacing
- Consistent typography
- Reusable components
- Dark mode supported
- Loading states implemented
- Error states implemented
- Empty states implemented
