# DESIGN_SYSTEM.md

# Mingalar Bangkok Design System

Version: 1.0

---

# Design Philosophy

Mingalar Bangkok should feel welcoming, modern, trustworthy, and premium.

The interface must be simple enough for first-time users while remaining elegant and scalable.

Keywords

* Friendly
* Premium
* Clean
* Warm
* Modern
* Mobile First
* Accessible
* Fast

---

# Visual Style

Inspired by

* Apple
* Airbnb
* Google Maps
* Notion
* Grab
* LINE
* Booking.com

Avoid

* Heavy gradients
* Neon effects
* Glassmorphism overload
* Dark cyberpunk styling
* Overly colorful interfaces

---

# Color Palette

## Primary

Ruby Red

#C62828

---

## Secondary

Warm Gold

#D4AF37

---

## Accent

Deep Navy

#1E3A5F

---

## Background

Warm White

#FAFAF8

---

## Surface

White

#FFFFFF

---

## Text Primary

#1F2937

---

## Text Secondary

#6B7280

---

## Border

#E5E7EB

---

## Success

#16A34A

---

## Warning

#F59E0B

---

## Danger

#DC2626

---

# Border Radius

Cards

16px

Buttons

12px

Inputs

12px

Dialogs

20px

Badges

999px

---

# Shadows

Use subtle shadows only.

Avoid strong floating effects.

---

# Spacing

Base Unit

8px

Common spacing

4

8

12

16

24

32

48

64

---

# Typography

Primary Font

Geist

Fallback

Inter

Font Weight

400

500

600

700

---

# Heading Scale

H1

48px

H2

36px

H3

28px

H4

24px

H5

20px

Body

16px

Caption

14px

Small

12px

---

# Icons

Library

Lucide React

Style

Outline

Stroke

2px

Avoid filled icons.

---

# Buttons

Primary

Filled

Secondary

Outline

Ghost

Text only

Danger

Red

Loading state required.

Disabled state required.

---

# Cards

Rounded corners

Subtle shadow

Large padding

Hover effect

Clickable when appropriate

---

# Forms

Rounded inputs

Clear labels

Visible validation

Helpful error messages

Never use placeholder as label.

---

# Navigation

Desktop

Top Navigation

Mobile

Bottom Navigation

Sticky Header

Yes

---

# Images

Rounded corners

Lazy Loading

Responsive

Use Next.js Image component.

---

# Motion

Use Framer Motion.

Animation duration

150–250ms

Keep animations subtle.

Avoid excessive motion.

---

# Responsive Breakpoints

Mobile

<768px

Tablet

768px

Laptop

1024px

Desktop

1280px

Large Desktop

1536px

---

# Accessibility

Minimum contrast AA

Keyboard navigation

Visible focus ring

ARIA labels where necessary

Semantic HTML

---

# Components

Required Components

* Navbar
* Mobile Navigation
* Hero
* Search Bar
* Category Grid
* Business Card
* Listing Card
* Event Card
* Job Card
* Housing Card
* AI Assistant Card
* Review Card
* Footer
* CTA Section
* Empty State
* Loading Skeleton
* Pagination
* Breadcrumb
* Modal
* Drawer
* Toast
* Dialog
* Badge
* Avatar

---

# Layout

Container Width

1280px

Section Padding

80px Desktop

48px Tablet

32px Mobile

---

# Dark Mode

Support required.

Use neutral dark backgrounds.

Avoid pure black.

---

# Tailwind CSS Rules

* Use Tailwind CSS v4.
* Prefer utility classes over custom CSS.
* Avoid arbitrary values unless necessary.
* Use semantic spacing utilities.
* Keep components reusable.
* Minimize custom styles.

---

# UI Principles

Every screen should answer three questions immediately:

1. Where am I?
2. What can I do here?
3. What should I do next?

The interface should prioritize clarity, speed, and ease of use over visual complexity.
