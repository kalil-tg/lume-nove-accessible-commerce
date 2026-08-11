# Accessibility audit and remediation report

## Document status

- Project: LUME NOVE accessible commerce case study.
- Audit type: controlled technical case study.
- Target: WCAG 2.2 Level AA-oriented implementation.
- Tested application: local React build.
- Baseline: intentionally inaccessible fixture in `audit/fixtures/legacy-checkout.html`.
- Legal status: not legal advice, certification, or a guarantee of EAA compliance.

## Method

The assessment combines:

- source review;
- semantic DOM inspection;
- keyboard interaction checks;
- desktop and mobile browser inspection;
- Playwright workflow regression;
- axe-core automated analysis under `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, and `wcag22aa` tags.

Automated checks are evidence, not proof of accessibility. Human assistive-technology sessions remain required.

## Baseline findings

| ID | Finding | Source | Severity | Relevant WCAG | Remediation |
|---|---|---|---|---|---|
| A-01 | Close icon button has no accessible name | axe `button-name` | High | 4.1.2 | Added visible text and an accessible name to the dialog close control. |
| A-02 | Foreground and control colors do not meet minimum contrast | axe `color-contrast` | High | 1.4.3 | Replaced ad hoc gray values with tested high-contrast design tokens. |
| A-03 | Product image has no text alternative | axe `image-alt` | High | 1.1.1 | Added context-specific product alternative text; decorative duplicates use empty alt text. |
| A-04 | Empty return link has no accessible name | axe `link-name` | High | 2.4.4, 4.1.2 | Replaced it with a visible, descriptive navigation label. |
| A-05 | Country selector has no accessible name | axe `select-name` | High | 1.3.1, 4.1.2 | Added a persistent visible label and autocomplete metadata. |
| M-01 | Text fields rely on placeholders as the only visible instruction | Manual | High | 1.3.1, 3.3.2 | Added persistent labels above every field. This risk was not raised by the configured axe scan. |
| M-02 | Continue is a styled `div` with a button role but no keyboard behavior | Manual | Critical | 2.1.1, 4.1.2 | Replaced it with a native submit button. |
| M-03 | Error text is generic, not associated with the field, and does not receive focus | Manual | High | 3.3.1, 3.3.3, 4.1.3 | Added specific inline guidance, `aria-invalid`, `aria-describedby`, focused summary, and field navigation. |
| M-04 | Heading structure skips from `h1` to `h3` | Manual | Medium | 1.3.1, 2.4.6 | Restored a logical heading hierarchy. |

## Remediated control behavior

### Storefront

- Skip link is hidden until keyboard focus and targets a focusable products section.
- Filter opens as a named native dialog.
- Category choices use labeled native checkboxes.
- Result count is announced through a polite live region.
- Product cards retain visible category, price, finish names, and descriptive links.

### Product and cart

- Finish selection uses a visible legend, native radios, text names, and supplementary swatches.
- Quantity controls have distinct accessible names and a polite output.
- Add to bag opens a native modal dialog.
- Initial modal focus lands on Close bag.
- Escape closes the dialog and returns focus to Add to bag.
- Success, delivery, subtotal, and assurance information are text-backed.

### Checkout

- Contact, address, and delivery choices are grouped with fieldsets and legends.
- Required fields have persistent labels and autocomplete attributes.
- Invalid submission focuses a named error summary.
- Summary items move focus to the corresponding field.
- Inline errors are connected with `aria-describedby` and reflected with `aria-invalid`.
- Delivery method changes update the programmatic total without duplicating state.

## Automated evidence

The verified Playwright run contains six passing tests:

1. Controlled baseline exposes the five expected automated violation families.
2. Remediated storefront has a clean axe scan and functioning filters.
3. Skip link is the first keyboard stop and moves focus to products.
4. Product and open cart states have clean axe scans, correct focus behavior, and working checkout navigation.
5. Checkout has a clean axe scan and recoverable programmatic errors.
6. Mobile storefront has a clean axe scan, named controls, and no horizontal overflow at 390px.

Command:

```bash
pnpm test:e2e
```

Verified result: `6 passed`.

## Browser evidence

- Page identity and meaningful content verified at `http://127.0.0.1:4173/`.
- No Vite or React error overlay observed.
- No relevant console warnings or errors observed in the tested home, product, cart, checkout, and mobile states.
- Cart dialog focus was observed on Close bag.
- Checkout summary focus and return-to-field behavior were observed.
- Horizontal overflow was false at 390px and 1440px.

## Remaining risk

See [the manual QA plan](MANUAL_QA_PLAN.md). The most important unexecuted work is screen-reader validation on NVDA, JAWS, and VoiceOver, followed by zoom, forced-colors, real payment integration, and real production content.
