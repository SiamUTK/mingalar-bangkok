# DATABASE.md

# Mingalar Bangkok

Database: MySQL

ORM: Prisma

Version: 1.0

---

# Database Principles

* MySQL only
* UUID as Primary Key
* Soft Delete Support
* Created At / Updated At on every table
* Foreign Keys enforced
* UTF8MB4 Encoding
* Indexed searchable fields

---

# Tables

## users

Purpose

Store user accounts.

Fields

* id
* email
* password_hash
* full_name
* avatar
* phone
* nationality
* preferred_language
* role
* status
* created_at
* updated_at

---

## user_profiles

Purpose

Additional profile information.

Fields

* id
* user_id
* bio
* gender
* birthday
* location
* occupation
* website
* facebook
* telegram
* line
* created_at
* updated_at

---

## categories

Purpose

Directory categories.

Fields

* id
* name
* slug
* icon
* description
* created_at
* updated_at

---

## listings

Purpose

Business directory.

Fields

* id
* category_id
* owner_id
* business_name
* slug
* description
* phone
* email
* website
* address
* latitude
* longitude
* city
* province
* country
* opening_hours
* featured
* verified
* rating
* review_count
* status
* created_at
* updated_at

---

## listing_images

Purpose

Business gallery.

Fields

* id
* listing_id
* image_url
* sort_order
* created_at

---

## reviews

Purpose

User reviews.

Fields

* id
* listing_id
* user_id
* rating
* comment
* created_at

---

## favorites

Purpose

Saved businesses.

Fields

* id
* user_id
* listing_id
* created_at

---

## jobs

Purpose

Job board.

Fields

* id
* company_id
* title
* slug
* description
* salary
* employment_type
* location
* status
* expires_at
* created_at
* updated_at

---

## job_applications

Purpose

Job applications.

Fields

* id
* job_id
* user_id
* resume_url
* cover_letter
* status
* created_at

---

## housing

Purpose

Rental listings.

Fields

* id
* owner_id
* title
* slug
* description
* price
* property_type
* bedrooms
* bathrooms
* address
* latitude
* longitude
* city
* province
* status
* created_at
* updated_at

---

## housing_images

Purpose

Property gallery.

Fields

* id
* housing_id
* image_url
* sort_order
* created_at

---

## events

Purpose

Community events.

Fields

* id
* title
* slug
* description
* image
* venue
* city
* start_date
* end_date
* organizer
* status
* created_at
* updated_at

---

## news

Purpose

News articles.

Fields

* id
* title
* slug
* summary
* content
* cover_image
* author
* published_at
* status
* created_at
* updated_at

---

## ai_conversations

Purpose

AI chat history.

Fields

* id
* user_id
* session_id
* message
* role
* tokens
* created_at

---

## notifications

Purpose

User notifications.

Fields

* id
* user_id
* title
* message
* type
* is_read
* created_at

---

# User Roles

Guest

User

Business

Moderator

Admin

Super Admin

---

# Relationships

users

↓

user_profiles

users

↓

favorites

↓

listings

users

↓

reviews

↓

listings

categories

↓

listings

users

↓

jobs

↓

job_applications

users

↓

housing

users

↓

ai_conversations

users

↓

notifications

---

# File Storage

Store files in Supabase Storage.

Supported files

* Images
* Avatars
* Business Photos
* Property Photos
* Event Banners
* Documents
* Resumes

---

# Searchable Tables

* listings
* jobs
* housing
* news
* events

---

# Future Tables

* memberships
* payments
* subscriptions
* invoices
* coupons
* advertisements
* messages
* conversations
* reports
* bookmarks
* tags
* analytics
* audit_logs
* api_keys
* translations
* support_tickets
