# LUME NOVE: accessible commerce without flattening the brand

## Project summary

LUME NOVE is an independent technical case study for a fictional European lighting studio. The project asks a practical question: can a premium editorial storefront keep its art direction while making the purchase journey more robust for keyboard and assistive-technology users?

The answer is a complete React commerce flow supported by a controlled inaccessible baseline, documented remediation decisions, manual browser verification, and repeatable Playwright plus axe regression tests.

This is a self-initiated project, not a disguised client engagement. No legal compliance certification is claimed.

## The business problem

Premium commerce teams often treat visual design, conversion, and accessibility as competing priorities. That creates predictable risks in the most valuable parts of the journey:

- filters that cannot be operated reliably without a pointer;
- product choices communicated only through color;
- cart drawers that lose or leak focus;
- checkout fields with weak labels and unhelpful errors;
- responsive headers that clip actions at intermediate widths;
- automated scans presented as if they were complete human audits.

For an EAA-facing European store, those are not merely cosmetic defects. They can block customers, increase checkout failure, make remediation expensive after launch, and weaken the technical evidence available to the business.

## My role

- Product and interface design.
- React and TypeScript implementation.
- Accessibility audit and remediation engineering.
- Keyboard and responsive browser QA.
- Playwright and axe regression design.
- Performance and asset optimization.
- Technical reporting and portfolio positioning.

## Scope

The built flow contains four high-risk surfaces:

1. A responsive storefront with search, filtering, sorting, product cards, newsletter form, and footer navigation.
2. A product detail page with an image gallery, finish radio group, quantity control, disclosure sections, and saved state.
3. A native modal cart with success messaging, focus containment, Escape behavior, focus return, quantity changes, and checkout navigation.
4. A delivery checkout with persistent labels, grouped controls, validation, error summary, inline guidance, and a dynamic order total.

## Baseline, not theatre

Instead of inventing a client and claiming a transformation that never happened, the repository contains an intentionally inaccessible legacy-checkout fixture outside the production route tree.

The baseline preserves five axe-detected violation families:

- unnamed icon button;
- insufficient color contrast;
- product image without text alternative;
- empty link without an accessible name;
- country selector without an accessible name.

Manual review also identifies risks that the automated scan does not fully judge, including placeholder-only labeling, a non-native Continue control with no keyboard behavior, an unassociated error message, and a skipped heading level. This is important evidence of why scanner-only services are insufficient.

## Remediation strategy

### 1. Start with native semantics

The remediated experience uses links for navigation, buttons for actions, native radios and checkboxes, fieldsets and legends for grouped choices, details and summary for disclosure content, and the native dialog element for the cart.

ARIA is used to communicate state and relationships, not to recreate controls that HTML already provides.

### 2. Make recovery part of the checkout design

Submitting an invalid postal code now:

- marks the field with `aria-invalid`;
- connects specific guidance through `aria-describedby`;
- renders an error summary with `role="alert"`;
- moves focus to that summary;
- provides a named control that returns focus directly to the invalid field.

The behavior is verified in both the interactive browser pass and Playwright.

### 3. Treat modal focus as a product requirement

Adding a product opens a named dialog and focuses “Close bag.” The browser contains focus within the modal, Escape closes it, and focus returns to the Add to bag trigger. The success message is visible and text-backed rather than conveyed by a check icon alone.

### 4. Preserve the premium visual system

The interface keeps the limestone palette, editorial serif typography, architectural product imagery, thin rules, and compact information hierarchy established in the approved visual concept. Accessibility changes are integrated into the visual language through deliberate focus rings, visible labels, underlined links, readable type, and consistent target sizes.

### 5. Build regression evidence

The suite checks:

- the known baseline violation families remain detectable;
- the remediated storefront, product page, open cart dialog, checkout, and mobile storefront return no axe violations under the configured WCAG A/AA tags;
- filtering changes the actual result set;
- the skip link is the first keyboard stop and moves focus correctly;
- the cart manages focus and navigates to checkout;
- checkout errors are associated and recoverable;
- the 390px layout has no horizontal overflow and retains named controls.

## Measured result

| Signal | Verified result |
|---|---:|
| Controlled baseline | 5 automated violation families |
| Remediated axe states | 5 states with 0 detected violations |
| Playwright suite | 6/6 passing |
| Interactive console | 0 relevant errors or warnings |
| Tested responsive widths | 390px and 1440px without horizontal overflow |
| Source image payload | 13,071,233 bytes |
| Delivered image payload | 615,326 bytes |
| Image reduction | 95.3% |
| Full production output | 1,148,948 bytes |
| JavaScript | 82.18kB gzip |
| CSS | 6.48kB gzip |

These results describe the tested build, not every assistive technology, browser, legal requirement, or future content state.

## Quality decisions discovered during QA

The browser pass found and fixed three problems before delivery:

1. At approximately 1280px, Account and Bag could be clipped by the three-column header. The navigation now moves to the compact menu below 1320px.
2. At 390px, the full bag label wrapped beside the wordmark. The visual label is now “Bag, 0,” while the full accessible name remains available to assistive technology.
3. The first hero treatment wrapped the headline across four lines and delayed the collection. The final hero is 650px high with a two-line desktop headline, matching the editorial reference more closely.

## What remains before a production compliance claim

- Complete NVDA plus Chrome and JAWS plus Chrome screen-reader sessions.
- VoiceOver plus Safari validation on macOS and iOS.
- 200% and 400% zoom/reflow checks across every state.
- Windows forced-colors and high-contrast verification.
- Production payment-provider and backend error-state testing.
- Review of real content, policies, third-party widgets, and legal obligations.

The correct positioning is “technical accessibility audit and remediation aligned with WCAG 2.2 AA,” not “guaranteed legal compliance.”

## Technology

React 19, TypeScript, Vite, CSS, React Router, semantic HTML, native dialog, Playwright, axe-core, local variable font assets, and optimized WebP imagery.
