# Stone Editor — Nuxt 3 Application

## Overview

Stone Editor is a production-grade Nuxt 3 application that enables jewellery sellers to add, edit, remove, and preview stones before submission.

The system is designed with a focus on:

* Performance optimization
* SSR correctness
* Dynamic form rendering
* Resilient error handling
* Maintainable architecture

This project follows a schema-driven UI approach where stone attributes are dynamically rendered from a mock API data source.

---

# Tech Stack

| Layer        | Technology                |
| ------------ | ------------------------- |
| Framework    | Nuxt 3 (Vue 3)            |
| State        | Pinia                     |
| Styling      | Tailwind CSS              |
| Language     | TypeScript                |
| Architecture | Composable + Store hybrid |
| Rendering    | SSR                       |

---

# Project Structure

```
assets/
components/
  stone/
  ui/
composables/
data/
pages/
stores/
types/
README.md
DESIGN.md
```

---

# Features Implemented

## 1) Stone Entry Flow

* Add Diamond
* Add Gemstone
* Dynamic form generation
* Attribute validation
* Save & collapse into summary tile

---

## 2) Tile Management

* Expand for editing
* Pre-filled form state
* Remove stones
* Local edit toggling (avoids global re-renders)

---

## 3) Preview Page

* Aggregated stone summary
* Grid layout rendering
* Route-level code splitting

---

## 4) Dynamic Attribute System

Attributes rendered from:

```
/data/stoneAttributes.ts
```

Supports:

* Field type mapping
* Select options
* Numeric inputs
* Preset diamond constraints

---

# State Management

Pinia store acts as the single source of truth.

Capabilities:

* Add stones
* Update stones
* Remove stones

---

# Validation Layer

Validation includes:

* Required fields
* Numeric constraints
* Negative value prevention
* Inline error messaging

Composable `useStoneValidator`validators ensure reuse and testability.

---

# Error Handling

## Implemented Safeguards

* Attribute schema guards
* Render error boundary
* Inline validation UI
* Store mutation safety

## Failure Scenarios Covered

| Scenario           | Handling      |
| ------------------ | ------------- |
| Missing attributes | Safe fallback |
| Malformed schema   | Guard + log   |
| Invalid input      | Inline error  |
| Render failure     | Boundary UI   |

---

# SSR & Hydration Safety

Measures taken:

* No browser-only APIs in setup
* Deterministic form initialization
* Static attribute imports
* UUID generation SSR-safe

Ensures no hydration mismatch between server and client.

---

# Performance Considerations

## Implemented

* Lazy-loaded form components
* Route-based code splitting
* Local edit state isolation
* Computed attribute caching

---

# Work Deferred (Can Be Implemented Later)

The following enhancements were identified but time-boxed for later delivery:

---

## 1) Route Middleware

**Purpose:** Prevent navigation with unsaved edits.

Planned features:

* Dirty form detection
* Confirmation modal
* Auto-save trigger option

---

## 2) Form Autosave

**Goal:** Improve UX resilience.

Design approach:

* Debounced store sync
* Local draft persistence
* Recovery after refresh

---

## 3) Virtualized Preview Lists

**Why:** Scale to high-stone inventories.

Implementation plan:

* Virtual scroller
* Windowed rendering
* Skeleton loading states

---

## 4) API Persistence Layer

Future integration:

* POST /stones
* PATCH /stones/:id
* DELETE /stones/:id

Would include:

* Optimistic updates
* Retry queues
* Failure rollback

---

## 5) Schema Caching

Optimization for attribute configs:

* Server fetch caching
* Client memoization
* Version invalidation

---

## 6) Advanced Validation

Planned upgrades:

* Schema-based validation (Zod/Yup)
* Async validation hooks
* Cross-field dependencies

---

## 7) Hydration Stress Testing

Testing scenarios:

* Large stone datasets
* Concurrent edits
* Rapid route switching

Goal: detect SSR/client drift.

---

## 8) Unit & E2E Testing

Planned stack:

* Vitest (unit)
* Vue Testing Library
* Playwright (E2E)

Coverage targets:

* Form rendering
* Store mutations
* Edit flows
* Error boundaries

---

## 9) Accessibility Enhancements

Future work:

* ARIA labels
* Keyboard navigation
* Screen reader validation
* Focus trapping in forms

---

## 10) UI Polish Pass

Deferred design refinements:

* Micro-interactions
* Loading skeletons
* Motion transitions
* Empty states

---

# How to Run

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

---

# Time Spent

~4 hours (timeboxed per assessment instructions)

---

# Shortcuts Taken

* Mock API via static data file
* No backend persistence
* Minimal animation layer
* Basic validation vs schema validation

---

# AI / Tool Usage

Used for:

* Architectural scaffolding
* Performance strategy planning
* Documentation structuring

All implementation decisions reviewed and adapted manually.

---

# What I’d Do Next With More Time

Priority order:

1. API persistence layer
2. Autosave + drafts
3. Virtualized preview
4. Schema validation engine
5. Full test coverage
6. Accessibility
7. UI polish
8. Better Typing

---

# Submission Notes

Focus was placed on:

* Correctness
* SSR safety
* Performance signals
* Maintainable architecture

Visual polish intentionally deprioritized within time constraints.
