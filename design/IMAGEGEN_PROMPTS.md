# Image-generation record

## Execution path

All concepts and production assets were generated through the built-in `image_gen` tool. No CLI or external API fallback was used. The original generated files remain in the local Codex generated-image store; project copies are recorded below.

## Shared brand direction

The shared prompt direction was:

> Create a high-fidelity, shippable commerce experience for “LUME NOVE,” a fictional independent European studio making sculptural lighting. Use quiet Italian editorial modernism, a warm limestone background, paper cards, near-black ink, deep moss, restrained terracotta, and vivid blue only for keyboard focus. Pair an elegant editorial serif with a readable modern sans-serif. Use thin rules, restrained radii, tactile architectural photography, strong contrast, visible labels, and practical browser-ready spacing. Avoid gradients, glassmorphism, neon, excessive pills, fake reviews, awards, certifications, real trademarks, and watermarks.

## Interface concepts

### `design/concepts/01-storefront-desktop.png`

Prompt:

> Produce one tall, straight-on 1440px desktop storefront showing announcement, complete header, split hero, collection controls, four-product grid, workshop story, assurances, newsletter, and footer. Use exact LUME NOVE copy for “Light, shaped for everyday rituals,” Arco 01, Vela 02, Nodo 03, and Linea 04. Show a focused Filter products button and a visible Skip to products focus state. Keep all controls implementable and text-backed.

### `design/concepts/02-checkout-desktop.png`

Prompt:

> Continue the approved storefront design system into a complete desktop delivery checkout. Use a 7/5 form and sticky order-summary layout, visible progress labels, persistent labels, fieldset legends, delivery radio cards, a focused Postal code field, and a calm error summary reading “Check the highlighted field.” Show Arco 01 in the order summary with subtotal, complimentary delivery, VAT, and total. Do not show payment brands or fake trust badges.

### `design/concepts/03-product-cart-desktop.png`

Prompt:

> Continue the approved LUME NOVE system into a product detail page for Arco 01 with gallery, finish radios, quantity, Add to bag, disclosures, repair story, related products, and a right-side open cart drawer. Dim the underlying page, focus “Close bag” with the blue focus ring, and show the success message “Arco 01 was added.” Keep the complete drawer readable and text-backed.

### `design/concepts/04-storefront-mobile.png`

Prompt:

> Translate the desktop storefront into a 390px full-surface mobile composition. Recompose rather than shrink: compact Menu/LUME NOVE/Bag header, full-width search, image-first hero, focused filters, four one-column product cards, craft story, assurances, newsletter, and footer groups. Maintain 16px-equivalent body type, 44px targets, no horizontal scroll, and the exact brand copy.

## Production assets

### `design/source-assets/arco-01-hero.png`

Prompt:

> Recreate Arco 01 as a photorealistic landscape product photograph: a slim blackened-steel arc rising from a tall pale travertine cylinder with a low conical warm-ivory linen shade. Place it in a quiet plaster, oak, linen, and stone European interior with late-afternoon light and realistic 2700K lamp glow. No people, text, logos, watermark, extra lamp, or impossible geometry.

Delivered web asset: `public/images/arco-01-hero.webp`.

### `design/source-assets/vela-02.png`

Prompt:

> Recreate Vela 02 as a photorealistic near-square product photograph: a softly undulating ivory linen pendant shade on a slender brushed-brass stem, glowing in a restrained warm-plaster dining alcove. Preserve the reference form and hand-finished texture. No people, text, logos, watermark, or extra fixture.

Delivered web asset: `public/images/vela-02.webp`.

### `design/source-assets/nodo-03.png`

Prompt:

> Recreate Nodo 03 as a photorealistic near-square craft photograph: a compact pale hand-cast plaster cylinder with a warm opal half-dome shade on an artisan stone workbench. Keep tools and samples restrained and softly out of focus. No people, text, logos, watermark, or extra lamp.

Delivered web asset: `public/images/nodo-03.webp`.

### `design/source-assets/linea-04.png`

Prompt:

> Recreate Linea 04 as a photorealistic near-square wall-light photograph: a slender vertical rounded opal cylinder slightly forward of an aged-brass rectangular backplate, glowing on a mineral plaster wall. No people, text, logos, watermark, second fixture, or decorative clutter.

Delivered web asset: `public/images/linea-04.webp`.

### `design/source-assets/workshop.png`

Prompt:

> Create a wide documentary craft photograph of an artisan’s hands finishing a pale hand-cast plaster lamp base on a worn stone workbench. Show restrained molds, one mixing bowl, scraper, raw samples, dusty hands, and a leather apron edge in warm directional workshop light. No face, text, logo, watermark, or staged stock-photo polish.

Delivered web asset: `public/images/workshop.webp`.

### `design/source-assets/arco-01-detail.png`

Prompt:

> Create a photorealistic close material detail of Arco 01 where the blackened-steel arc meets the warm linen shade and lightly patinated brass collar. Preserve the product identity, show visible linen weave, and use soft side daylight plus 2700K glow. No people, text, logos, watermark, or extra object.

Delivered web asset: `public/images/arco-01-detail.webp`.

## Optimization

The six source PNGs total 13,071,233 bytes. Web delivery copies were converted locally to WebP at quality 84 and total 615,326 bytes. Source files remain available for future crops and export variants.
