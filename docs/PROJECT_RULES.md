# PROJECT_RULES.md

# Mingalar Bangkok

Version: 1.0

---

# Project Overview

Mingalar Bangkok is an AI-first web platform designed for the Myanmar community in Thailand.

The platform helps users discover local businesses, find jobs, search for housing, access travel services, connect with the community, and receive AI-powered assistance.

This project focuses on performance, scalability, accessibility, and modern UI/UX.

---

# Core Principles

* Mobile First
* AI First
* Performance First
* SEO First
* Accessibility First
* Security First
* Production Ready
* Clean Architecture

---

# Tech Stack

Framework

* Next.js 16 (App Router)

Language

* TypeScript

Styling

* Tailwind CSS v4

UI

* shadcn/ui

Icons

* Lucide React

Animation

* Framer Motion

Forms

* React Hook Form
* Zod

Database

* MySQL

ORM

* Prisma

Authentication

* Supabase Auth

Storage

* Supabase Storage

AI

* OpenAI API

Deployment

* Hostinger Cloud VPS

Version Control

* Git + GitHub

---

# Development Rules

Always use

* TypeScript
* Functional Components
* React Hooks
* Async / Await
* Server Components by default
* Client Components only when required

Never use

* JavaScript files
* Class Components
* Inline CSS
* jQuery
* Bootstrap
* Material UI
* Chakra UI
* Firebase
* Mock APIs in production code

---

# Folder Structure

app/

components/

hooks/

lib/

types/

prisma/

public/

styles/

---

# UI Guidelines

Design style

* Premium
* Modern
* Clean
* Minimal
* Fast
* Mobile-first

Avoid

* Cluttered layouts
* Heavy shadows
* Excessive animations
* Flashy effects
* Outdated design patterns

---

# Color Palette

Primary

Emerald

Secondary

Teal

Accent

Gold

Neutral

White

Slate

Charcoal

Success

Green

Warning

Amber

Danger

Red

---

# Typography

Use clean modern fonts.

Hierarchy

H1

H2

H3

Body

Small Text

Always maintain proper spacing.

---

# Component Rules

Components must

* Be reusable
* Be modular
* Accept props
* Be typed
* Have descriptive names

Avoid duplicate components.

---

# Responsive Rules

Support

* Mobile
* Tablet
* Laptop
* Desktop

Must use responsive Tailwind utilities.

---

# Accessibility

Every page should include

* Semantic HTML
* Keyboard navigation
* Proper heading hierarchy
* Alt text
* Labels for forms
* Visible focus states

---

# Performance

Optimize

* Images
* Fonts
* Metadata
* Lazy Loading
* Dynamic Imports

Avoid unnecessary re-renders.

---

# SEO

Every page must include

* Title
* Description
* Open Graph
* Twitter Metadata
* Canonical URL
* Structured Data when applicable

---

# AI Features

Prepare architecture for

* AI Chat
* AI Recommendations
* AI Search
* AI Translation
* AI Travel Assistant

Do not hardcode AI responses.

---

# Authentication

Support

* Email Login
* Google Login

Roles

Guest

User

Business

Moderator

Admin

Super Admin

---

# Business Directory

Each listing should support

* Name
* Category
* Description
* Images
* Location
* Contact
* Opening Hours
* Reviews
* Rating
* Tags

---

# Code Quality

Code must

* Be readable
* Be modular
* Be maintainable
* Be production-ready

Avoid duplicated logic.

---

# Naming Convention

Use

PascalCase

for Components.

camelCase

for variables and functions.

UPPER_CASE

for constants.

kebab-case

for route names.

---

# Comments

Only write comments when necessary.

Avoid obvious comments.

---

# Git Rules

Use small commits.

Write meaningful commit messages.

---

# Security

Always validate

* Input
* Forms
* API Requests

Never expose

* API Keys
* Secrets
* Database Credentials

---

# Future Features

Architecture should support

* Premium Membership
* Payments
* AI Credits
* Notifications
* Email Verification
* Business Dashboard
* Admin Dashboard
* Mobile App
* API Integration

---

# AI Instructions

When generating code:

* Produce production-ready code.
* Avoid placeholder logic unless requested.
* Reuse existing components whenever possible.
* Follow Next.js App Router best practices.
* Use Tailwind CSS v4.
* Keep components modular.
* Prefer Server Components.
* Do not generate unnecessary files.
* Do not duplicate code.
* Keep the codebase clean and scalable.
* Explain major architectural decisions only when necessary.
