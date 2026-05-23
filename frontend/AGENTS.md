# Foliq Frontend — Agent Guide

Angular 21 SPA for the Foliq project. Git root is `../` (monorepo currently contains this frontend app and future backend services).

## Project Context

Foliq is a modular market intelligence dashboard focused on:
* commodities
* macroeconomic monitoring
* financial signals
* AI-assisted summaries
* historical event tracking

The first implemented vertical is Silver.

## Commands

Run from this directory (`frontend/`):

| Task               | Command                        |
| ------------------ | ------------------------------ |
| Dev server         | `npm start`                    |
| Angular dev server | `ng serve`                     |
| Production build   | `npm run build`                |
| Unit tests         | `npm test`                     |
| Scaffold component | `ng generate component <name>` |

Default local URL:
```text
http://localhost:4200
```

## Tech Stack

| Technology | Status | Notes |
|---|---|---|
| Angular 21 | Active | Use modern APIs only (see Conventions) |
| TypeScript | Active | Strict mode enabled |
| SCSS | Active | Component + global styles |
| Angular Signals | Active | Preferred for reactive state |
| RxJS | Active | For async streams and HTTP |
| Tailwind CSS | Planned |
| TradingView Lightweight Charts | Planned — DO NOT USE | Not yet installed |

## Layout

```text
src/
  app/
    core/         # App-wide singletons: guards, interceptors, auth
    shared/       # Reusable components, pipes, directives
    layout/       # Shell, nav, sidebar
    features/     # One folder per vertical
```

Feature modules follow this structure:

```text
features/
  silver/
    components/         # Dumb/presentational components
    pages/              # Routed page components
    services/           # Data access and business logic
    models/             # UI models (NOT external API shapes)
```

## Reference Component

This is the canonical pattern for all new components:

```typescript
// features/silver/components/silver-price-card/silver-price-card.component.ts
import { Component, input, computed, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { SilverPrice } from '../../models/silver-price.model';

@Component({
  selector: 'app-silver-price-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './silver-price-card.component.html',
  styleUrl: './silver-price-card.component.scss',
})
export class SilverPriceCardComponent {
  price = input.required<SilverPrice>();
  formattedPrice = computed(() => this.price().value.toFixed(4));
}
```

Key patterns demonstrated:
- `input()` / `input.required()` instead of `@Input()` decorator
- `computed()` for derived state
- `inject()` is preferred over constructor injection when a service is needed
- Always `standalone: true` — never use NgModule
- `output()` instead of `@Output()` / `EventEmitter` for events

## Naming Conventions

| Item | Pattern | Example |
|---|---|---|
| Component file | `<vertical>-<noun>.component.ts` | `silver-price-card.component.ts` |
| Service file | `<vertical>-<noun>.service.ts` | `silver-data.service.ts` |
| Model file (UI) | `<noun>.model.ts` | `silver-price.model.ts` |
| API response type | `<noun>-api.model.ts` | `silver-price-api.model.ts` |
| Route page | `<noun>-page.component.ts` | `silver-dashboard-page.component.ts` |

Always use domain-specific names. Never `DataService`, `HelperComponent`, `UtilsModule`.

## Conventions

* All components are standalone — never create or reference NgModules.
* Prefer `input()` / `output()` signal APIs over `@Input()` / `@Output()` decorators.
* Use `inject()` over constructor injection.
* Use Angular Signals for local reactive UI state.
* Use `computed()` for derived values instead of methods or pipes where practical.
* Use SCSS for all component and global styles.
* Keep business logic out of presentation components.
* Register routes in `app.routes.ts`.
* Register application-wide providers in `app.config.ts`.
* Use minimal diffs when modifying existing files.
* Do not touch generated Angular cache or `node_modules`.

## UI Principles

* Build clean, data-dense dashboard interfaces.
* Prefer functional financial-terminal style layouts.
* Minimize unnecessary animations and visual noise.
* Prioritize readability and information hierarchy.
* Avoid marketing-style landing page aesthetics.

## Styling Conventions

* Prefer `rem` units over `px` for typography, spacing, sizing, and layout where practical.
* Use responsive, scalable sizing patterns suitable for dashboard applications.
* Avoid hardcoded pixel values unless precision is explicitly required.

## State Management

Follow this ladder — do not skip ahead:

1. **Local signal state** — default for all component-level state
2. **Shared service with signals** — only when state is shared across components
3. **NgRx** — only when service-based state becomes clearly insufficient

Do not introduce NgRx without explicit instruction.

## Data Fetching

* Never call APIs directly from UI components.
* Use a dedicated service per feature (e.g. `SilverDataService`).
* Define a separate API response model (`silver-price-api.model.ts`) for raw external shapes.
* Normalize/map API responses to UI models before returning from the service.
* UI components only ever see internal UI models — never raw API types.

```text
External API → Service (normalize) → UI Model → Component
```

## Architecture Principles

* Build vertical-first — Silver is the only active vertical. Do not build generic multi-asset systems yet.
* Avoid premature abstraction. Solve the Silver case concretely first.
* Prefer explicit, domain-specific naming over generic utility naming.
* Keep components focused and composable.
* Optimize for maintainability and clarity over cleverness.

## Testing

* Test runner: Karma + Jasmine (default Angular setup).
* Write unit tests for services — especially data normalization logic.
* Presentation components do not require tests unless they contain logic.
* Place test files co-located with the file under test (`*.spec.ts`).
* Do not test implementation details; test observable behavior and outputs.
* When scaffolding a service, always produce a corresponding `.spec.ts`.

## Pitfalls to Avoid

* **Do not use TradingView** — not installed yet.
* **Do not use `@Input()` / `@Output()`** — use `input()` / `output()` signal APIs.
* **Do not use NgModule** — all components are standalone.
* **Do not assume a backend exists** — no API contracts exist yet. Mock data or stubs only.
* **Do not use constructor injection** — use `inject()`.
* **Do not create generic abstractions** (e.g. `BaseComponent`, `GenericService`) without explicit instruction.

## Scope

* Stay within `frontend/` unless explicitly told otherwise.
* No backend implementation exists — do not assume or invent API shapes.
* Do not introduce new npm dependencies without clear, specific project value.

## Formatting

* Follow the existing Prettier configuration — do not reformat files unnecessarily.
* Keep naming consistent and predictable across the codebase.
* Prefer readable code over heavily abstracted patterns.