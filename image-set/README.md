# Supermarket Image Set

This pack contains ready-to-use prompts for generating:
- Product catalog images
- Homepage hero banner
- Floating bubble PNG assets

## Files
- `image-set/supermarket-image-prompts.json`

## Quick Workflow
1. Open `image-set/supermarket-image-prompts.json`.
2. Generate all `product_images` at the provided size.
3. Generate `hero_banner` at `3840x2160`.
4. Generate `floating_bubbles` as transparent PNG.
5. Save assets to:
   - `src/assets/products/`
   - `src/assets/banners/`
   - `src/assets/bubbles/`

## Quality Targets
- Product images: pure white background, soft natural shadow, catalog look.
- Hero banner: clean 16:9 composition with text-safe empty area.
- Bubble images: transparent PNG, isolated circular glass style.

## Recommended Post-Processing
- Convert final web assets to WebP for performance.
- Keep product source masters at 4K.
- Export UI-ready sizes (1024px and 512px variants) for faster page loads.
