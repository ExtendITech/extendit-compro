# Product Requirements Document (PRD) - Extend IT

## 1. Introduction

### 1.1 Purpose

This document defines the product requirements for the **Extend IT Company Profile & Lead Generation Platform**. It translates the business goals outlined in the BRD into specific functional and technical specifications.

### 1.2 Scope

The scope includes the development of the public-facing website, the interactive Contact Wizard, the Loading Screen experience, and the necessary legal/support pages.

## 2. User Personas

| Persona           | Role               | Goals                                                                 | Pain Points                                                                |
| :---------------- | :----------------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| **The Visionary** | Startup Founder    | Launch an MVP quickly to validate ideas.                              | Limited budget, unclear technical requirements, needs guidance.            |
| **The Operator**  | SME Owner          | Digitize operations (POS, Inventory) or get a professional website.   | Afraid of high costs, needs simple "packages", values trust.               |
| **The Executive** | Enterprise Manager | Find a reliable vendor for complex custom software or AI integration. | Needs proof of competence (portfolio), compliance, and structured process. |

## 3. Functional Specifications

### 3.1 Loading Screen Experience

- **Trigger**: First visit to the website (session-based).
- **Visuals**: Terminal-style boot sequence, ASCII art logo, "System Initializing" text.
- **Behavior**: Auto-redirects to Home after 2-3 seconds. Can be skipped.

### 3.2 Homepage (Index)

- **Hero Section**:
  - Headline: "Architects of the Digital Future".
  - CTA: "Initialize Project" -> Links to `/wizard`.
  - Visuals: 3D elements (Three.js) or Code Background.
- **Service Packages**:
  - Display Tier A (Static), Tier B (CMS), Tier C (Custom).
  - "Order Now" buttons for A & B link to WhatsApp.
  - "Consult" button for C links to `/wizard`.

### 3.3 Contact Wizard (`/wizard`)

- **Concept**: A gamified, multi-step form that feels like configuring a server or initializing a software project.
- **Steps**:
  1.  **Identity**: Select User Persona.
  2.  **Mission**: Select Service Type (Web, App, AI, Marketing).
  3.  **AIO Module**: Opt-in for AI Optimization (SEO for AI).
  4.  **Constraints**: Budget & Timeline inputs.
  5.  **Connection**: Contact details (Name, WA, Email).
- **Output**: JSON object logged to console (Phase 1) -> Sent to API (Phase 2).

### 3.4 Legal & Support Pages

- **FAQ (`/faq`)**: Accordion-style list of common questions.
- **Terms (`/terms`)**: Standard text content.
- **Privacy (`/privacy`)**: Standard text content.

## 4. Technical Specifications

### 4.1 Tech Stack

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM

### 4.2 Component Architecture

- `LoadingScreen`: Handles session storage check and animation.
- `ContactWizard`: Manages multi-step state (`useState`), validation, and transitions.
- `CodeBackground`: Reusable background component with matrix/code rain effect.

### 4.3 Data Handling

- **Wizard State**: Local state management.
- **Submission**: Currently mocked (simulated delay). Ready for API integration.

## 5. Future Roadmap

### Phase 2: Backend Integration

- Connect Wizard submission to a backend (Supabase/Node.js).
- Send automated email confirmations to users.
- Send lead notifications to Admin via Telegram/WhatsApp.

### Phase 3: AI Features

- Implement actual AI analysis of the Wizard input to generate a preliminary proposal PDF.
- Add an AI Chatbot assistant on the homepage.
