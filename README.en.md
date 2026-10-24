# AirKids · Little adventures, big dreams

**Live demo: [tiendaairkids2.netlify.app](https://tiendaairkids2.netlify.app)**

[Versión en español](README.md)

A kids’ pajama store built by **Cristian Atrio**, grown from his final React project at Coderhouse. Catalog, categories, a persistent cart and checkout, in Spanish and English, with a night mode and a responsive layout for desktop and mobile.

> It starts in **demo mode**: it runs without credentials, sends no personal data, records no real orders and never charges anything. The three designs and illustrative prices come from the original catalog.

![AirKids on desktop](docs/desktop.png)

![Animated tour: the headline rises word by word, the lights go out in a circle, photos uncover as you scroll, a tile leans toward the cursor, pajamas fly into the cart and the photo travels to the detail page](docs/motion.gif)

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
- **Night mode**: follows the system setting or the light switch. Night spreads in a circle from the switch, the ceiling stickers twinkle and a shooting star crosses now and then.
- **Motion**: headlines that rise word by word, text and photos that appear as you scroll, tiles that lean toward the cursor with a sheen (a flashlight at night), the photo travelling from the tile to the detail page, pajamas flying into the cart and tiles that glide when you filter or sort.
- **On phones**: the hero stars follow the phone’s tilt, photos settle into place as they scroll in and a tile sinks under your finger when tapped.
- **Motion on your terms**: it follows the system setting, like the theme. When the system asks for less motion, text and photos fade in without moving and pages cross-fade. The switch in the top bar, or the pause on the band of bedtime excuses (WCAG 2.2.2), changes mode and is remembered.
- Search, categories and price sorting.
- Quick add from the catalog, announced to screen readers.
- Product detail and stock-limited quantities, editable inside the cart too.
- Persistent cart that stores only product ids and quantities, never buyer data.
- Loading, error, empty, missing product and 404 states.
- Keyboard navigation, visible labels and focus, and a calm motion mode.
- Email confirmation with an inline error, double-submit protection and error recovery.
- Optional Firebase backend: server-side pricing and transactional stock updates.

## How it’s verified

- 43 Vitest and Testing Library tests: catalog, checkout, cart rules, stored preferences, translation parity, the motion helpers, the motion switch and the phone tilt.
- 5 server logic tests for the order function.
- 15 Playwright runs on desktop and mobile, with axe checks in Spanish, English, night mode and both motion modes, a touch-device run for the tilt and scroll effects, plus a horizontal overflow check.
- `npm audit` for client and server dependencies, and CI on every push.

## Stack

React 18, React Router, Vite, Firebase (optional), Recursive variable font via Fontsource, Lucide icons, Vitest, Testing Library, Playwright and axe-core. Translations are plain dictionaries behind a React context; a test keeps both languages in sync. Animations use only browser APIs (CSS, IntersectionObserver, View Transitions, scroll-driven animations, Web Animations and device orientation), about 5 KB gzipped with no animation library. `html[data-motion]` is `full` or `calm`, and the CSS picks the choreography from it.

See [SECURITY.md](SECURITY.md) (Spanish) for the security model and its limits, and [docs/design.md](docs/design.md) for the visual direction.

Character images and names are kept as original academic material; no commercial rights are claimed. The bedroom mood image is AI-generated and labeled as such on the page.
