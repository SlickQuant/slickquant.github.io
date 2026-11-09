# Slick Quant website

The public Slick Quant website at [slickquant.com](https://slickquant.com), presenting the open-source trading ecosystem and Premium CME and ICE extensions. Static HTML, CSS, and JavaScript; no build step or runtime dependencies.

## Preview locally

From this directory, run:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open <http://127.0.0.1:8000>. You can also open `index.html` directly.

## Content and structure

- `index.html`: homepage, interactive architecture map, featured trading projects, and project directory. Project links are static HTML and remain available without JavaScript.
- `assets/site.css`: shared responsive styles, including reduced-motion and keyboard-focus support.
- `assets/site.js`: mobile navigation, project category filters and search, installation tabs with keyboard navigation, copy buttons, and copyright year. Search starts across all categories; category buttons can narrow the results.
- `privacy.html`, `thanks.html`, `check-email.html`: privacy and subscription pages.
- `assets/logo.png`: full-resolution transparent navy-and-gold monogram prepared from the supplied logo.
- `assets/logo-web.png`: optimized website version, also embedded in the SVG containers.
- `assets/branding.md`: logo preparation details and the background-removal prompt.
- `assets/logo.svg`, `assets/logo-dark.svg`, `assets/logo_llc.svg`, and `assets/favicon.svg`: SVG containers using the same monogram. `assets/favicon.png` is the browser icon. Header, footer, community logos, and the favicon have transparent backgrounds; the standalone company lockup retains a light backing.
- `assets/logo-dark.svg`: dark-background display variant with brighter navy tones; the source artwork and gold finish are preserved.
- `assets/fonts/`: self-hosted Manrope font and its SIL Open Font License. No external font requests.
- `assets/social-card.svg`: editable source for the 1200 × 630 social sharing image, `assets/social-card.png`.

To add a project, copy a `.project-card` in `index.html`, update its repository link, title, description, and `data-category`. Categories are `trading`, `sdk`, `infrastructure`, and `python`. The infrastructure suggestion in the default category is navigation, not an additional project. Update the fallback project count in `#project-count`; JavaScript calculates the interactive counts automatically.

Project descriptions are grounded in the [SlickQuant public organization profile](https://github.com/SlickQuant#readme) and linked repository READMEs. Installation commands follow the [slick-queue documentation](https://github.com/SlickQuant/slick-queue#installation). Check current project documentation before changing capability or compatibility claims.

## Premium venue subscriptions

The homepage's `#premium` section presents CME and ICE features for slick-trader and slick-sim. Each venue subscription covers both products through private GitHub extensions: `slick-trader-cme` and `slick-sim-cme`, or `slick-trader-ice` and `slick-sim-ice`. The public core projects remain open source; private repository names are displayed without inaccessible repository links.

| Subscription | Monthly (USD) | Yearly (USD, billed annually) |
| --- | ---: | ---: |
| CME | $4.99 | $49.99 |
| ICE | $4.99 | $49.99 |
| CME + ICE bundle | $7.99 | $79.99 |

The bundle includes both venues for both products and saves about 20% compared with separate subscriptions at the same billing cadence. Prices are maintained as static homepage content.

CME features include iLink 3 order entry and MDP 3.0 market data. ICE features include BOE order entry, BUS discovery and iMpact market data. Both trading extensions offer feed/session recovery, persisted working orders and fill journaling. Both simulation extensions receive live venue market data to build books for simulated execution, and serve simulated order-entry and multicast market data protocols. ICE simulation supports outright futures. Live feeds require the user's own venue market data access; simulation does not place live exchange orders or model market impact. Feature copy follows the extension READMEs and known-gap documentation.

Each **Request Premium access** link opens an email to `hello@slickquant.com` identifying CME, ICE or the bundle and prompting for billing preference and GitHub username. Payment and repository access are arranged manually; the site has no checkout or automatic provisioning. Premium subscriptions are separate from sponsorship and the Kit newsletter signup.

## Sponsorship

The homepage’s `#sponsorship` section explains support for public maintenance, documentation, and continued development. Links in the navigation, hero, community section, and footer lead to it. The **Become a sponsor** button opens [Slick Quant on GitHub Sponsors](https://github.com/sponsors/SlickQuant), where visitors can choose monthly or one-time contributions.

Sponsorship payments are handled on GitHub Sponsors and support the public projects. Premium venue subscriptions are arranged separately by email. Sponsorship does not grant Premium access.

## Email subscriptions

The homepage retains the existing Kit form endpoint (`8552368`). Kit handles subscriptions and confirmation emails; there is no local backend. Configure the hosted form’s redirect to `thanks.html` or `check-email.html` as appropriate for its opt-in settings. Those pages are excluded from the sitemap and marked `noindex`.

## Deployment

Publish through this repository’s existing GitHub Pages setup. Serve the repository root without a build command. Keep `CNAME` (`slickquant.com`) and `.nojekyll` in place.

## Checks

Preview desktop and mobile layouts, filter each project category, search across categories, check empty search results, and test the mobile menu with keyboard and touch. Check the architecture links, installation tabs with arrow keys, and copy buttons. Verify the directory remains available with JavaScript disabled. Validate the email input without submitting a real subscription.

Check Premium navigation, venue features, live-feed descriptions, all three plans and bundle savings. Verify access email recipients, subjects and body prompts without sending email. Search for CME, ICE and all four extension names; check Premium content and links remain visible without JavaScript.
