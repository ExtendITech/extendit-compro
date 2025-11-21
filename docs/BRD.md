# Business Requirements Document (BRD) - Extend IT

## 1. Executive Summary

Extend IT is a dynamic tech company providing software solutions, AI integration, and design services. This document outlines the requirements for enhancing the current company profile website (`extendit-compro`) to include specific service packages and a revamped project estimation tool. The goal is to streamline client onboarding and provide transparent pricing models.

## 2. Current State Analysis

The existing website features:

- **Hero Section**: "Architects of the Digital Future" with 3D elements and terminal aesthetics.
- **Services**: Tech Solution, AI Solution, Product & Design, Performance Marketing.
- **Trusted Partners**: Grid display of client logos.
- **Current Estimator**: Basic calculator based on Project Type (Website, Mobile, API, AI), Complexity, and Integrations.
- **Contact Form**: Standard name, email, message fields.

## 3. New Business Requirements

### 3.1 Service Packages

The website must explicitly display three distinct service tiers to guide potential clients:

| Package | Name                 | Price (IDR) | Delivery Time | Description                                                                                 |
| :------ | :------------------- | :---------- | :------------ | :------------------------------------------------------------------------------------------ |
| **A**   | **Static Website**   | 3,000,000   | 3-5 Days      | Ideal for landing pages, portfolios, and simple company profiles. No backend required.      |
| **B**   | **Website + Admin**  | 6,000,000   | 7-9 Days      | Includes a Content Management System (CMS) or Admin Dashboard for content updates.          |
| **C**   | **Dynamic / Custom** | Custom      | Discuss       | For complex requirements, SaaS, or unique business logic. Triggers the "Project Estimator". |

### 3.2 Enhanced Project Estimator

The current estimator needs to be replaced or significantly modified to serve as a lead generation tool for "Package C" and general inquiries.

**New Input Fields:**

1.  **Category of Business**: (e.g., F&B, Retail, Tech, Healthcare, Other) - _Dropdown/Text_.
2.  **AI Included?**: (Yes/No) - _Toggle/Checkbox_.
3.  **Description**: Detailed project requirements - _Textarea_.
4.  **Contact Information**: Name/Email/Phone - _Input fields_.

**Logic Flow:**

- Users interested in Package A or B can directly "Order Now" (leading to WhatsApp or Contact Form with pre-filled subject).
- Users interested in Package C are directed to the **Project Estimator**.
- The Estimator collects the 4 data points above and submits them as a high-priority lead.

## 4. Functional Requirements

### 4.1 UI/UX Updates

- **Pricing Section**: Add a new section (or replace part of Services) to display the 3 Packages using the existing "Card" and "Glassmorphism" design language.
- **Estimator Redesign**:
  - Remove "Complexity" and "Integrations" sliders if they no longer fit the new simple flow, OR keep them as optional advanced fields.
  - Add the "Category of Business" dropdown.
  - Add the "AI Included" toggle.
  - Ensure the form captures contact info directly within the estimator flow.

### 4.2 Technical Implementation

- **Frontend**: React + Tailwind (existing stack).
- **State Management**: Update `BudgetEstimator.tsx` to handle the new form state.
- **Lead Handling**: Currently logs to console. Future state should integrate with EmailJS, Supabase, or a backend API to store leads.

## 5. Strategic Opportunities (Leveraging the Team)

_See discussion below for detailed ideas on leveraging the software team._
