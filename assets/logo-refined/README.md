# Refined SQ logo concept

A proposed evolution of the Slick Quant S/Q monogram: broad geometric ribbons,
flat color, open internal spacing, and a short Q tail. The existing website
continues to use its original artwork. This directory is a separate concept.

## Files

- `logo.svg`: primary navy-and-gold mark.
- `logo-dark.svg`: lighter blue-and-gold mark for dark backgrounds.
- `logo-mono.svg`: single-color navy mark.
- Matching `.png` files: 1024 x 1024 exports with actual alpha transparency.
- `preview.html`: light, dark, one-color, wordmark, and 16-48 px previews.
- `preview.png` and `preview-mobile.png`: browser-rendered presentation previews.
- `concept.png`: initial raster exploration generated with the built-in imagegen tool.
- `generation-prompt.txt`: the exact imagegen prompt, using `../logo.png` as the identity reference.

The final SVG marks were drawn as native paths after the raster exploration.
They contain no embedded images, gradients, filters, text, or external dependencies.
The final PNGs are browser renders of those SVGs, not the initial generated raster.
The preview wordmark uses the site's existing self-hosted Manrope font.

## Colors

- Navy: `#233F63`
- Gold: `#D7B568`
- Blue for dark backgrounds: `#8DAED5`

Keep the transparent padding when exporting. Use `logo-dark.svg` on the site's
`#0A0F16` background. The preview includes small-size checks; favicon adoption
and replacement of the site's active logo assets have not been applied.
