# Stone Editor — System Design

## A) Architecture

The application follows a modular Nuxt 3 structure optimized for SSR correctness and long-term maintainability.

### Layers

- **Pages** → Route orchestration
- **Components** → UI rendering
- **Composable** → Business logic isolation
- **Pinia Store** → Global state
- **Data Layer** → Mock API attributes

### Data Flow

Form → Store → Tiles → Preview Page

1. User enters stone attributes
2. Data saved into Pinia store
3. Tiles render summaries
4. Preview page aggregates store data

No prop drilling is used; store acts as SSOT.

---

## B) State Management Decision

Pinia was chosen over `useState` because:

- Predictable mutation tracking
- Devtools support
- Easier editing/removal flows
- SSR serialization safety

Composable `useStoneValidatore` separates orchestration logic from storeform.
Composable `useStoreGuard` provides a consistent data flow.

---

## C) Performance Strategy

### Lazy Loading

- StoneForm dynamically imported
- Preview route split

### Re-render Prevention

- Tiles keyed by UUID
- Edit toggle local state
- Attribute configs computed once

### Memoization

- Attribute resolution cached via computed refs

---

## D) SSR & Hydration Safety

Measures implemented:

- No browser APIs in setup
- Static attribute imports
- Deterministic form initialization
- UUID generation SSR-safe

Hydration mismatches avoided by ensuring identical server/client initial state.

---

## E) Error Handling Strategy

### Guardrails

1. Attribute schema validation
2. Inline field validation
3. Error boundaries for render failures
4. Fallback UI for malformed data

### Failure Scenarios

| Failure | Behavior |
|--------|-----------|
| Missing attributes | Empty form + error log |
| Invalid input | Inline validation |
| Render crash | Boundary fallback |
| Store corruption | Defensive updates |

---

## F) Component Design Principles

- No oversized components
- DynamicField reusable renderer
- Form logic isolated
- Tiles purely presentational

---

## G) Tradeoffs / Next Steps

With more time:

- API persistence
- Optimistic updates
- Virtualized preview lists
- Form schema caching
- E2E tests
- UI polish
- Better TS support

