# AirKids · Little adventures, big dreams

[Versión en español](README.md)

A kids’ pajama store built by **Cristian Atrio**, grown from his final React project at Coderhouse. Catalog, categories, a persistent cart and checkout, in Spanish and English, with a night mode and a responsive layout for desktop and mobile.

> It starts in **demo mode**: it runs without credentials, sends no personal data, records no real orders and never charges anything. The three designs and illustrative prices come from the original catalog.

![AirKids on desktop](docs/desktop.png)

## Run it locally

Requires Node.js 22.12 or later; the latest Node 22 is recommended.

    npm ci
    npm run dev

Open the address printed in the terminal. Switch language with **Español / English** in the header and turn the lights off with the moon button. Search for a character, add it from the catalog and complete checkout with made-up details to get a DEMO reference.

    npm run check
    npx playwright install chromium
    npx playwright test
    npm ci --prefix functions
    npm test --prefix functions

## What it does

- **Spanish and English**: detects the browser language, remembers the choice and updates copy, the document `lang`, page titles and price formatting.
- **Night mode**: follows the system setting or the light switch; the ceiling stickers start glowing through a View Transitions crossfade.
- Search, categories and price sorting.
- Quick add from the catalog, announced to screen readers.
- Product detail and stock-limited quantities, editable inside the cart too.
- Persistent cart that stores only product ids and quantities, never buyer data.
- Loading, error, empty, missing product and 404 states.
- Keyboard navigation, visible labels and focus, reduced-motion support.
- Email confirmation with an inline error, double-submit protection and error recovery.
- Optional Firebase backend: server-side pricing and transactional stock updates.

## How it’s verified

- 26 Vitest and Testing Library tests: catalog, checkout, cart rules, stored preferences and translation parity.
- 5 server logic tests for the order function.
- 10 Playwright runs on desktop and mobile, with axe checks in Spanish, English and night mode, plus a horizontal overflow check.
- `npm audit` for client and server dependencies, and CI on every push.

## Stack

React 18, React Router, Vite, Firebase (optional), Recursive variable font via Fontsource, Lucide icons, Vitest, Testing Library, Playwright and axe-core. Translations are plain dictionaries behind a React context; a test keeps both languages in sync.

See [SECURITY.md](SECURITY.md) (Spanish) for the security model and its limits, and [docs/design.md](docs/design.md) for the visual direction.

Character images and names are kept as original academic material; no commercial rights are claimed. The bedroom mood image is AI-generated and labeled as such on the page.
