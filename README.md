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
- `premium-confirmed.html`: confirmation page shown after a visitor confirms a Premium request through Kit.
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

The homepage's `#premium` section presents CME and ICE features for slick-trader and slick-sim. Each venue subscription covers compiled libraries for both products: `slick-trader-cme` and `slick-sim-cme`, or `slick-trader-ice` and `slick-sim-ice`. Premium delivery includes public headers and integration examples, without implementation source code or private repository access. The public core projects remain open source.

Premium use requires a valid runtime license. Subscriptions include license renewals, updates and integration support for the selected venues. Cancellation preserves validity through the paid period end; continued use after that requires renewal. This website describes the intended licensing offer; runtime enforcement and binary packaging must be implemented and validated in the Premium projects before customer delivery.

| Subscription | Monthly (USD) | Yearly (USD, billed annually) |
| --- | ---: | ---: |
| CME | $4.99 | $49.99 |
| ICE | $4.99 | $49.99 |
| CME + ICE bundle | $7.99 | $79.99 |

The bundle includes both venues for both products and saves about 20% compared with separate subscriptions at the same billing cadence. Prices are maintained as static homepage content.

CME features include iLink 3 order entry and MDP 3.0 market data. ICE features include BOE order entry, BUS discovery and iMpact market data. Both trading extensions offer feed/session recovery, persisted working orders and fill journaling. Both simulation extensions receive live venue market data to build books for simulated execution, and serve simulated order-entry and multicast market data protocols. ICE simulation supports outright futures. Live feeds require the user's own venue market data access; simulation does not place live exchange orders or model market impact. Feature copy follows the extension READMEs and known-gap documentation.

Each **Request Premium license** link opens the Kit form in a modal dialog and selects the corresponding venue. The form stays hidden and Kit's embed is not loaded until a request button is clicked. Visitors choose their venue and billing preference and provide their email address. The official embed uses UID `7674493e92` and `https://slickquant.kit.com/7674493e92/index.js`; Kit currently posts to form `10163580`. Escape, Close, or a click on the backdrop closes the dialog and returns focus to the request button. Native dialog behavior keeps keyboard focus inside while it is open. Without JavaScript or dialog support, the buttons open `https://slickquant.kit.com/7674493e92` directly. The dialog also includes that link if the embed is blocked. The form is separate from the newsletter form (`8552368`). Payment, compiled library delivery and runtime license issuance are arranged manually after the request; there is no checkout or automatic provisioning.

Manage request fields, confirmation emails and success messaging in the Kit form builder. Remove the legacy GitHub username field and replace private repository access wording with compiled library delivery and runtime licensing in Kit itself. The embedded form temporarily removes the hosted GitHub username field and adapts its repository-access wording to licensing. This also covers asynchronously inserted confirmation text. The direct-form fallback and emails remain controlled by Kit; changes must be published in Kit for both the embed and direct-form fallback. Keep email, venue and billing preference fields, and preserve their current option values for venue preselection. Keep Premium requests separate from newsletter marketing and sponsorship. Verify owner notifications separately, including requests from existing subscribers; the website does not send notification emails itself.

## Sponsorship

The homepage’s `#sponsorship` section explains support for public maintenance, documentation, and continued development. Links in the navigation, hero, community section, and footer lead to it. The **Become a sponsor** button opens [Slick Quant on GitHub Sponsors](https://github.com/sponsors/SlickQuant), where visitors can choose monthly or one-time contributions.

Sponsorship payments are handled on GitHub Sponsors and support the public projects. Premium venue subscriptions are requested through Kit, with payment, library delivery and licensing arranged separately by email. Sponsorship does not grant Premium access.

## Email subscriptions

The homepage retains the existing Kit form endpoint (`8552368`). Kit handles subscriptions and confirmation emails; there is no local backend. Configure the hosted form’s redirect to `thanks.html` or `check-email.html` as appropriate for its opt-in settings. Those pages are excluded from the sitemap and marked `noindex`.

For the separate Premium request form, set **Settings → Confirmation Email →
After confirming redirect to → URL** in Kit to
`https://slickquant.com/premium-confirmed.html`. Keep Kit's built-in confirmation
button in the email so Kit confirms the address before redirecting. Publish the
page before enabling the redirect, then save and publish the Kit form settings.
This is the destination after clicking the email confirmation button, not the
immediate form-submission redirect under General settings.

The Premium confirmation page explains the payment, compiled library delivery
and runtime licensing follow-up without claiming an active subscription. It is marked `noindex` and
excluded from the sitemap. It is a static acknowledgement page; Kit handles email
verification. Kit's redirect must be configured in the account separately from
deploying this repository.

## Deployment

Publish through this repository’s existing GitHub Pages setup. Serve the repository root without a build command. Keep `CNAME` (`slickquant.com`) and `.nojekyll` in place.

All HTML pages load the shared stylesheet and site script with content versions
in their URLs. This makes browsers fetch updated assets even when older copies
are cached. Whenever either asset changes, update its version in all pages to the
first 12 characters of its SHA-256 hash.
In PowerShell, calculate it with
`(Get-FileHash assets/site.css -Algorithm SHA256).Hash.Substring(0, 12).ToLowerInvariant()`.
Deploy the HTML and stylesheet together. A hard reload (Ctrl+Shift+R in Chrome)
can refresh a page that was already open during deployment. Use the same hash
command with `assets/site.js` when updating the script. The script also gives
the asynchronously embedded Kit dropdowns accessible names from their prompts.

## Checks

Preview desktop and mobile layouts, filter each project category, search across categories, check empty search results, and test the mobile menu with keyboard and touch. Check the architecture links, installation tabs with arrow keys, and copy buttons. Verify the directory remains available with JavaScript disabled. Validate the email input without submitting a real subscription.

Check Premium navigation, venue features, live-feed descriptions, all three plans and bundle savings. Verify the form is hidden on initial load, each request button opens the dialog with its venue selected, and the required fields and billing choices render. Check keyboard focus, Escape, Close, backdrop dismissal, repeated opens, mobile dialog scrolling, and direct form links with JavaScript disabled or the embed blocked. Do not submit a real request during browser checks. After configuring Kit, test its confirmation redirect separately with an address you control. Search for CME, ICE and all four extension names; check Premium content and links remain visible without JavaScript.
