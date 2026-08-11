# Visual fidelity ledger

## Source of truth

- Desktop storefront: `design/concepts/01-storefront-desktop.png`.
- Desktop checkout: `design/concepts/02-checkout-desktop.png`.
- Product and open cart: `design/concepts/03-product-cart-desktop.png`.
- Mobile storefront: `design/concepts/04-storefront-mobile.png`.

The concepts were generated before implementation and used as art-direction references, not embedded as interface screenshots.

## Reference comparison

| Surface | Reference intent | Implemented evidence | Status |
|---|---|---|---|
| Brand system | Limestone, paper, near-black, moss, terracotta, blue focus | Central CSS tokens and local Cormorant Garamond plus Manrope fonts | Matched |
| Desktop header | Editorial wordmark, primary links, named utilities | Three-column header; compact navigation below 1320px | Matched with responsive correction |
| Hero | Two-line editorial headline beside Arco 01 | Two-line headline at 1440px; 650px hero; optimized Arco asset | Matched after QA revision |
| Collection | Filter, sort, count, 2×2 product grid | Working dialog filters, native sort, live result count, responsive cards | Matched and interactive |
| Product page | Gallery, finish group, quantity, disclosures | Working gallery, text-backed radios, quantity output, native details | Matched and interactive |
| Cart drawer | Right-side modal, success state, focus on Close | Native dialog, initial Close focus, Escape and focus return | Matched and verified |
| Checkout | Two-column form and order summary with error state | Persistent labels, fieldsets, focused error summary, dynamic totals | Matched and verified |
| Mobile | Compact menu, short bag label, full-width search, stacked flow | 390px layout without horizontal overflow; “Bag, 0” visual label | Matched after QA revision |
| Craft story | Documentary workshop image and editorial copy | Separate optimized workshop asset and split responsive section | Matched |
| Assurance and footer | Text-backed assurances, newsletter, full footer | Semantic sections, named form, local privacy/status copy | Matched |

## Fix ledger from rendered QA

### Header clipping at intermediate desktop width

- Reference evidence: all utility actions remain inside the header.
- Initial rendered evidence: Account and Bag approached or passed the available track around 1280px.
- Fix: primary navigation switches to the compact menu below 1320px.
- Verification: header overflow false at 1280px and 1440px.

### Mobile bag label wrapping

- Reference evidence: compact “Bag, 0” label.
- Initial rendered evidence: “Bag, 0 items” wrapped beside the wordmark at 390px.
- Fix: visible mobile label shortened to “Bag, 0”; full accessible name remains “Bag, 0 items.”
- Verification: no overlap and no horizontal overflow at 390px.

### Oversized hero headline

- Reference evidence: headline occupies two deliberate lines and the collection appears sooner.
- Initial rendered evidence: four-line headline dominated the first viewport.
- Fix: reduced display scale, rebalanced grid, and limited hero height to 650px.
- Verification: two-line headline and collection begins at approximately 779px in the 1440×1000 test viewport.

## Intentional deviations

- The keyboard skip link is visually hidden until focus in the implementation; the concept displays its focused state for documentation.
- Product finishes use full text names in addition to color swatches. The concept emphasized swatches more strongly, but text prevents color-only communication.
- No reviews, awards, discount claims, certifications, payment logos, or partner logos were added because the brand is fictional.
- The checkout stops before payment data collection. This keeps the case study honest and avoids simulating a real payment provider.
- Footer help groups start open to keep important content immediately available; they remain native details elements and can be collapsed.

## Final fidelity assessment

The implementation preserves the approved art direction, hierarchy, product photography, control density, and responsive intent. Deviations are tied to accessibility, honesty, or functional behavior rather than convenience.
