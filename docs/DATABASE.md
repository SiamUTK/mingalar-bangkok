
# DATABASE.md

# Mingalar Bangkok Database Specification

**Version:** 2.0 Enterprise

Database: **MySQL 8+**  
ORM: **Prisma ORM**

> AI-First Super App for the Myanmar Community in Thailand

---

# Database Principles

- MySQL only
- Prisma ORM
- UUID Primary Keys
- Soft Delete (`deleted_at`)
- `created_at` / `updated_at`
- UTF8MB4
- Foreign Keys
- Indexed searchable columns
- Audit-ready
- Translation-ready
- Scalable for millions of records

---

# Core Modules

- Users
- AI
- Directory
- Jobs
- Housing
- Community
- Travel
- Visa
- Money
- News
- Events
- Learn Thai
- Business
- Administration

---

# Core Tables

## Identity

- users
- user_profiles
- user_sessions
- user_devices
- user_preferences

## Directory

- categories
- listings
- listing_images
- listing_tags
- reviews
- favorites

## Jobs

- jobs
- job_categories
- job_applications
- resumes

## Housing

- housing
- housing_images
- housing_favorites

## Community

- posts
- comments
- reactions
- groups
- group_members
- conversations
- messages

## Travel

- travel_bookings
- flight_requests
- hotel_requests
- esim_orders
- insurance_orders

## Visa

- visa_requests
- work_permit_requests
- passport_services

## Money

- money_transfer_leads
- exchange_rates
- wallets
- wallet_transactions

## AI

- ai_conversations
- ai_messages
- ai_prompt_logs
- ai_usage

## Content

- news
- events
- learn_thai_lessons

## Business

- businesses
- business_memberships
- advertisements
- leads

## System

- notifications
- translations
- audit_logs
- analytics_events
- api_keys
- support_tickets
- system_settings

---

# Common Fields

Every major table should include:

- id (UUID)
- created_at
- updated_at
- deleted_at (nullable)
- status

---

# Relationships

users
├── user_profiles
├── favorites
├── reviews
├── job_applications
├── housing
├── posts
├── ai_conversations
├── visa_requests
├── travel_bookings
└── notifications

categories
└── listings

listings
├── listing_images
├── reviews
└── listing_tags

jobs
└── job_applications

housing
└── housing_images

---

# Index Strategy

Index:

- email
- slug
- category_id
- owner_id
- status
- city
- province
- created_at

Use Full-text Search where appropriate.

---

# File Storage

Supabase Storage

Buckets

- avatars
- listings
- housing
- events
- news
- resumes
- documents
- travel
- visa

---

# User Roles

- Guest
- User
- Business
- Moderator
- Admin
- Super Admin

---

# Supported Languages

- English
- Thai
- Myanmar

Translation-ready schema required.

---

# Security

- Foreign Keys
- Cascading rules where appropriate
- Input validation
- Audit logs
- No sensitive secrets stored in plaintext

---

# Future Expansion

- Marketplace
- Loyalty Program
- Referral System
- Rewards
- Payments
- Stripe Billing
- Mobile Push Notifications
- Business CRM
- Public API
- Data Warehouse
