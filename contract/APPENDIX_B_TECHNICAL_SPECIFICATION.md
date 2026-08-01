\# APPENDIX B

\# TECHNICAL SPECIFICATION

\# Mingalar Bangkok



Version: 1.0



This Appendix forms an integral part of the Software Development Agreement for the Mingalar Bangkok project.



\---



\# 1. System Overview



Project Name



\*\*Mingalar Bangkok\*\*



Project Type



AI-First Web Platform for the Myanmar Community in Thailand



Architecture



Modern Full-Stack Web Application



Deployment



Cloud-based Production Environment



\---



\# 2. System Architecture



The platform shall follow a modern layered architecture consisting of:



\- Presentation Layer

\- Application Layer

\- API Layer

\- Authentication Layer

\- Database Layer

\- Storage Layer

\- AI Integration Layer



The architecture shall prioritize scalability, maintainability, security, and performance.



\---



\# 3. Frontend Technology



Framework



\- Next.js 16 (App Router)



Language



\- TypeScript



UI Library



\- React 19



Styling



\- Tailwind CSS v4



Component Library



\- shadcn/ui



Icons



\- Lucide React



Animation



\- Framer Motion



Forms



\- React Hook Form



Validation



\- Zod



Internationalization



\- next-intl



\---



\# 4. Backend Technology



Backend Framework



\- Next.js Route Handlers



Programming Language



\- TypeScript



API Style



\- REST API



Authentication



\- Supabase Authentication



Authorization



\- Role-Based Access Control (RBAC)



Session Management



\- Secure Cookie / JWT (as supported by Supabase)



\---



\# 5. Database



Database Engine



\- MySQL



ORM



\- Prisma ORM



Primary Key



\- UUID



Relationships



\- Foreign Keys



Encoding



\- UTF8MB4



Indexing



\- Searchable fields

\- Foreign keys

\- Frequently queried columns



Timestamp Fields



\- created\_at

\- updated\_at



Soft Delete



\- Supported where appropriate



\---



\# 6. Database Modules



Core database modules include:



\- Users

\- User Profiles

\- Categories

\- Listings

\- Listing Images

\- Reviews

\- Favorites

\- Jobs

\- Job Applications

\- Housing

\- Housing Images

\- Events

\- News

\- AI Conversations

\- Notifications



The Contractor may extend or refine the database schema during development where necessary to improve performance, maintainability, or future scalability.



\---



\# 7. Authentication



Supported authentication methods include:



\- Email \& Password

\- Google Sign-In



Features



\- Registration

\- Login

\- Logout

\- Forgot Password

\- Password Reset

\- Email Verification

\- Session Management



\---



\# 8. User Roles



The platform shall support the following user roles:



\- Guest

\- User

\- Business

\- Moderator

\- Admin

\- Super Admin



Each role shall have different permissions according to system requirements.



\---



\# 9. AI Integration



The platform may integrate with:



\- OpenAI API



Supported AI capabilities include:



\- AI Chat

\- Smart Search

\- Business Recommendation

\- Travel Recommendation

\- Translation

\- AI Writing Assistance

\- AI Trip Planning



Future AI providers may be added without affecting the overall system architecture.



\---



\# 10. Storage



Primary Storage



\- Supabase Storage



Supported Files



\- Images

\- Avatars

\- Business Photos

\- Property Photos

\- Event Images

\- Documents

\- Resumes



\---



\# 11. Security



The Contractor shall implement reasonable security practices including:



\- HTTPS

\- SSL/TLS Encryption

\- Password Hashing

\- Input Validation

\- Output Escaping

\- SQL Injection Protection

\- XSS Protection

\- CSRF Protection (where applicable)

\- Authentication \& Authorization

\- Secure Environment Variables



The Contractor shall use commercially reasonable efforts to maintain security but does not guarantee protection against all cyber threats or vulnerabilities.



\---



\# 12. API



The system may expose RESTful API endpoints including:



\- Authentication

\- Users

\- Listings

\- Jobs

\- Housing

\- Events

\- News

\- Reviews

\- Search

\- AI

\- Upload



Additional APIs may be introduced during development where appropriate.



\---



\# 13. Search



Search shall support:



\- Businesses

\- Jobs

\- Housing

\- News

\- Events



Search capabilities may include:



\- Keyword Search

\- Category Filter

\- Location Filter

\- Sorting

\- Pagination



\---



\# 14. Responsive Design



The platform shall support:



\- Mobile

\- Tablet

\- Laptop

\- Desktop



Responsive layouts shall follow modern responsive web standards.



\---



\# 15. Browser Compatibility



Supported browsers include the latest stable versions of:



\- Google Chrome

\- Microsoft Edge

\- Mozilla Firefox

\- Safari



Older browser versions are not guaranteed to be fully supported.



\---



\# 16. Performance



The Contractor shall make commercially reasonable efforts to optimize:



\- Core Web Vitals

\- SEO

\- Image Loading

\- Lazy Loading

\- Bundle Size

\- Code Splitting

\- Database Queries

\- Caching (where applicable)



Actual performance may vary depending on infrastructure, network conditions, user devices, and third-party services.



\---



\# 17. Accessibility



The platform shall be developed with consideration for accessibility by including, where applicable:



\- Semantic HTML

\- Keyboard Navigation

\- Visible Focus States

\- ARIA Labels

\- Accessible Forms

\- Color Contrast



Compliance with specific accessibility standards (such as WCAG certification) is not included unless expressly agreed in writing.



\---



\# 18. SEO



The public-facing website shall support:



\- Metadata

\- Open Graph

\- Canonical URLs

\- XML Sitemap

\- robots.txt

\- Structured Data (where appropriate)



Search engine rankings are influenced by many external factors and are not guaranteed.



\---



\# 19. Logging \& Monitoring



The system may include:



\- Application Logs

\- Error Logs

\- Authentication Logs

\- Server Logs



Retention periods may vary depending on hosting provider policies.



\---



\# 20. Backup



Where supported by the hosting environment, the Contractor may configure or recommend:



\- Database Backups

\- File Backups

\- Recovery Procedures



Unless separately agreed, ongoing backup operations after project handover remain the responsibility of the system owner or hosting provider.



\---



\# 21. Deployment



Deployment environment includes:



\- Production

\- Staging (optional)



Deployment tasks may include:



\- Environment Configuration

\- Domain Configuration

\- SSL Installation

\- Build Process

\- Database Migration

\- Initial Deployment



\---



\# 22. Third-Party Services



The project may integrate with third-party services including:



\- Google Maps

\- OpenAI

\- Supabase

\- Cloudflare

\- Hostinger

\- Google OAuth



The availability, pricing, functionality, and terms of such services are controlled by their respective providers and may change without notice.



\---



\# 23. Deliverables



The Contractor shall deliver:



\- Source Code

\- Database Schema

\- Prisma Schema

\- Deployment Configuration

\- Environment Configuration Template (.env.example)

\- Technical Documentation

\- Administrator Account

\- Production Build

\- Production Deployment



Passwords, API Keys, Secrets, License Keys, and Environment Variables containing confidential information shall be transferred separately and securely, and are not required to be embedded within the source code repository.



\---



\# 24. Future Scalability



The system architecture shall be designed to reasonably support future expansion, including:



\- Premium Membership

\- Subscription Billing

\- Payment Gateway

\- Mobile Application

\- Push Notifications

\- Messaging

\- Analytics

\- Multi-language Expansion

\- Additional AI Providers

\- API Integrations



Implementation of these future features is not included unless separately agreed in writing.



\---



\# 25. Technical Changes



The Contractor may make reasonable technical modifications during development, including:



\- Refactoring

\- Framework Updates

\- Dependency Updates

\- Database Optimization

\- Performance Improvements

\- Security Enhancements



provided that such changes do not materially reduce the agreed functionality of the platform.



\---



\# End of Appendix B

