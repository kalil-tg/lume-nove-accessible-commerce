# Manual accessibility QA plan

This plan separates completed evidence from tests that still require a human assistive-technology session. A clean axe result must never be presented as complete accessibility verification.

## Status legend

- Complete: executed in the current build with recorded behavior.
- Partial: representative high-risk path executed; full surface sweep remains.
- Pending: not yet executed and must not be claimed.

## Current status

| Test area | Status | Evidence or next action |
|---|---|---|
| Keyboard skip link | Complete | First Tab focuses “Skip to products”; Enter moves focus to the products region. |
| Cart modal focus | Complete | Close bag receives initial focus; Escape closes; focus returns to Add to bag. |
| Checkout error recovery | Complete | Summary receives focus; its control focuses Postal code; inline message is associated. |
| Keyboard sweep of every control | Partial | High-risk path complete; repeat from header through footer in forward and reverse order. |
| Responsive reflow at 390px | Complete | No horizontal overflow; menu, search, and bag remain named and visible. |
| Desktop layout at 1440px | Complete | No horizontal overflow or header clipping after breakpoint correction. |
| NVDA + Chrome | Pending | Read landmarks, headings, product cards, finish group, dialog, quantity, and checkout errors. |
| JAWS + Chrome | Pending | Repeat critical commerce path and compare announcements. |
| VoiceOver + Safari on macOS | Pending | Verify rotor structure, dialog behavior, forms, and live regions. |
| VoiceOver + Safari on iOS | Pending | Verify touch exploration, modal containment, and reflow. |
| 200% browser zoom | Pending | Check clipping, overlap, sticky content, and form readability. |
| 400% reflow | Pending | Verify single-column flow at 1280 CSS-equivalent width and no two-dimensional scrolling. |
| Windows forced colors | Pending | Check focus, selected states, radio cards, error borders, and icons. |
| Reduced motion | Partial | CSS fallback exists; manually confirm all transitions are suppressed as intended. |
| Text spacing override | Pending | Apply WCAG text-spacing bookmarklet and inspect all surfaces. |
| High-contrast dark mode | Not in scope | The brand currently provides one light theme; do not imply dark-mode coverage. |

## NVDA + Chrome script

### Storefront

1. Start at the document title and list landmarks.
2. Verify one banner, primary navigation, main region, and content information region.
3. Navigate headings and confirm a logical sequence.
4. Activate Skip to products.
5. Open Filter products, move through each checkbox, apply a category, and confirm the result-count announcement.
6. Read a product card and confirm name, category, price, finish names, and View details are understandable out of visual context.

### Product and cart

1. Read the breadcrumb and product heading.
2. Move through the Finish radio group and confirm selected state plus visible name.
3. Operate quantity with both buttons.
4. Activate Add to bag.
5. Confirm dialog name, success announcement, product data, subtotal, and actions.
6. Press Escape and confirm focus returns to Add to bag.
7. Reopen and follow Checkout securely.

### Checkout

1. Navigate by headings and form controls.
2. Confirm group names for Contact, Delivery address, and Delivery method.
3. Submit an invalid postal code.
4. Confirm the summary is announced before the first invalid field.
5. Activate the summary item and verify focus reaches Postal code.
6. Correct the value and submit again.
7. Confirm the success status is announced once without interrupting unrelated content.

## Keyboard-only script

- Tab and Shift+Tab through the complete page without pointer input.
- Confirm focus is never hidden behind a dialog or outside the viewport.
- Verify each visual hover action has a keyboard equivalent.
- Verify native select, radio, checkbox, details, quantity, and dialog controls.
- Confirm Escape has no unintended effect outside modal states.
- Confirm there is no keyboard trap except intentional native modal containment.

## Acceptance rule

Do not publish “screen-reader tested,” “WCAG compliant,” or “EAA compliant” until the corresponding pending rows are completed, defects are remediated, and the evidence is dated.
