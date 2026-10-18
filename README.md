# Slick Quant website

The public Slick Quant website at [slickquant.com](https://slickquant.com), presenting the open-source trading ecosystem. Static HTML, CSS, and JavaScript; no build step or runtime dependencies.

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

## Sponsorship

The homepage’s `#sponsorship` section explains support for public maintenance, documentation, and continued development. Links in the navigation, hero, community section, and footer lead to it. The **Become a sponsor** button opens [Slick Quant on GitHub Sponsors](https://github.com/sponsors/SlickQuant), where visitors can choose monthly or one-time contributions.

Payments are handled on GitHub Sponsors. The site does not advertise consulting, paid services, support commitments, or sponsorship tiers and perks.

## Email subscriptions

The homepage retains the existing Kit form endpoint (`8552368`). Kit handles subscriptions and confirmation emails; there is no local backend. Configure the hosted form’s redirect to `thanks.html` or `check-email.html` as appropriate for its opt-in settings. Those pages are excluded from the sitemap and marked `noindex`.

## Deployment

Publish through this repository’s existing GitHub Pages setup. Serve the repository root without a build command. Keep `CNAME` (`slickquant.com`) and `.nojekyll` in place.

## Checks

Preview desktop and mobile layouts, filter each project category, search across categories, check empty search results, and test the mobile menu with keyboard and touch. Check the architecture links, installation tabs with arrow keys, and copy buttons. Verify the directory remains available with JavaScript disabled. Validate the email input without submitting a real subscription.
