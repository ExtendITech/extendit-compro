# Business Requirements Document (BRD) - Extend IT

## 1. Executive Summary

Extend IT is a dynamic tech company providing software solutions, AI integration, and design services. This document outlines the requirements for enhancing the current company profile website (`extendit-compro`) to include specific service packages and a revamped project estimation tool. The primary market focus is **Indonesia**, aiming to capture local businesses (UMKM to Enterprise) looking for digital transformation.

## 2. Current State Analysis

The existing website features:

- **Hero Section**: "Architects of the Digital Future" with 3D elements and terminal aesthetics.
- **Theme**: Rebranded to **Green** (previously Blue) to align with new identity.
- **Services**: Tech Solution, AI Solution, Product & Design, Performance Marketing.
- **Trusted Partners**: Grid display of client logos (Integrated with Strapi).
- **Portfolio**: Showcase of recent projects (Integrated with Strapi).
- **CMS**: Integrated **Strapi** for content management.
- **Experimental Pages**: Added `/apple` route for testing rounded button aesthetics.
- **Current Estimator**: Basic calculator based on Project Type (To be hidden).

## 3. New Business Requirements

### 3.1 Market Focus: Indonesia

The website content, SEO strategy, and user experience must be tailored for the Indonesian market.

- **Language**: Primary content in English (Professional), but SEO keywords must target Indonesian search terms (e.g., "Jasa Pembuatan Website", "Software House Jakarta/Bandung").
- **Localization**: Address formats, phone numbers (+62), and currency (IDR) where applicable.

### 3.2 Service Packages & Pricing Strategy

The website must explicitly display three distinct service tiers to guide potential clients:

| Package | Name                 | Price (IDR) | Delivery Time | Description                                                                              |
| :------ | :------------------- | :---------- | :------------ | :--------------------------------------------------------------------------------------- |
| **A**   | **Static Website**   | 3,000,000   | 3-5 Days      | Ideal for landing pages, portfolios, and simple company profiles. No backend required.   |
| **B**   | **Website + Admin**  | 6,000,000   | 7-9 Days      | Includes a Content Management System (CMS) or Admin Dashboard for content updates.       |
| **C**   | **Dynamic / Custom** | Custom      | Discuss       | For complex requirements, SaaS, or unique business logic. Triggers the "Contact Wizard". |

### 3.3 Interactive Contact Wizard

The previous "Budget Estimator" is replaced by a gamified **Contact Wizard** located on a dedicated page (`/wizard`). This wizard serves as the primary lead generation tool for custom projects and "Package C" inquiries.

**Wizard Steps:**

1.  **Identity Verification**: User selects their role (Startup Founder, SME Owner, Enterprise Manager, Personal Brand).
2.  **Mission Objective**: User selects the project type (Website, App, AI Transformation, Digital Marketing).
3.  **AI Integration Module (AIO)**: User chooses whether to enable "AI Optimization" (AIO) for their project (Yes/No).
4.  **System Parameters**: User inputs Estimated Budget and Timeline Expectation.
5.  **Establish Connection**: User provides Name, WhatsApp, and Email to submit the request.

### 3.4 Legal & Support Infrastructure

To ensure compliance and build trust, the following pages must be implemented:

- **FAQ (`/faq`)**: Common questions about services, pricing, and processes.
- **Terms & Conditions (`/terms`)**: Standard legal terms for service engagement.
- **Privacy Policy (`/privacy`)**: Data handling policy, especially important for the "Contact Wizard" data collection.

### 3.5 Local SEO (Indonesia)

To dominate the local market, the website must be optimized for local search intent.

- **Target Keywords**: "Software House Indonesia", "Jasa IT Consultant", "Pengembang AI Indonesia".
- **Local Presence**: Implementation of `LocalBusiness` schema to establish physical presence in search results (Google Maps Pack).

### 3.5 Google Platform Ecosystem

A robust data tracking and management setup is required to measure performance and optimize marketing.

- **Google Tag Manager (GTM)**: Centralized container for all tracking scripts.
- **Google Analytics 4 (GA4)**: For user behavior tracking.
- **Google Search Console (GSC)**: For monitoring search performance and indexing.
- **Google Ad Manager (GAM)**: Setup for future ad inventory management (if applicable).

### 3.6 AI Optimization (AIO) Setup

Prepare the website to be "read" and cited by AI search engines (ChatGPT, Gemini, Perplexity).

- **Structure**: Content must be structured in a Q&A format where possible.
- **Authority**: Clear "About Us" and "Services" schema to establish entity authority.

## 4. Functional Requirements

### 4.1 UI/UX Updates

- **Pricing Section**: Add a new section (or replace part of Services) to display the 3 Packages using the existing "Card" and "Glassmorphism" design language.
- **Hidden Estimator**: Ensure the estimator component is conditionally rendered based on environment variables.

### 4.2 Technical Implementation

- **Frontend**: React + Tailwind (existing stack).
- **State Management**: Update `BudgetEstimator.tsx` to handle the new form state.
- **Lead Handling**: Currently logs to console. Future state should integrate with EmailJS, Supabase, or a backend API to store leads.

## 5. Strategic Opportunities (Leveraging the Team)

_See discussion below for detailed ideas on leveraging the software team._

## 6. Project Roadmap & Implementation Status

### Phase 1: Foundation & Development (Current)

1.  **Develop Template**: ✅ Done
2.  **Section Planning**: ✅ Done (Included Logo)
3.  **Infrastructure**: ✅ Done (Dockerized)
4.  **Portfolio Section**: ✅ Done (Strapi Integrated)
5.  **Trusted Partners**: ✅ Done (Strapi Integrated)
6.  **CMS Integration**: ✅ Done (Strapi)
7.  **UI Experiments**: ✅ Done (Added `/apple` page for rounded button styling)
8.  **Rebranding**: ✅ Done (Switched primary theme from Blue to Green)
9.  **Service Definition**: 🚧 In Progress (Defining packages: Web Static, Web Dynamic, Company Starter, AI Solution)
10. **FAQ Section**: ⏳ Pending (UI Implementation + Schema Markup for AIO)

### Phase 2: Launch & Growth (Post-Launch)

1.  **Social Media**: Setup accounts and branding.
2.  **SEO & AIO**: Search Engine Optimization and AI Optimization (Focus: Indonesia).
3.  **Digital Presence**: Linktree creation.
4.  **Feature Enhancement**: Budget Estimator improvements (Currently Hidden).
