# LUME NOVE - Educational Accessibility Conformance Evidence Summary

## Document status

- Report date: August 2026
- Product: LUME NOVE accessible commerce case study, version 0.1
- Product owner: Self-initiated portfolio demonstration by Kalil Tagouti
- Product type: Fictional React commerce experience
- Standard reference: WCAG 2.2, Levels A and AA
- Template reference: ITI VPAT 2.5Rev WCAG structure and terminology

> This is an abbreviated educational ACR-style sample for a fictional product. It is not an official VPAT, not procurement-ready, not legal advice, and not a certification or claim of full WCAG/EAA compliance.

## Product description

LUME NOVE is a React and TypeScript commerce journey containing a storefront, product configuration flow, native modal cart, and delivery checkout. The case study includes a controlled inaccessible baseline, code-level remediation, browser verification, and Playwright plus axe-core regression coverage.

## Evaluation methods

- Source and semantic DOM review
- Keyboard review of the critical commerce path
- Desktop and 390px responsive browser inspection
- Playwright workflow assertions
- axe-core analysis configured with WCAG 2.0 A/AA, 2.1 A/AA, and 2.2 AA tags

Not performed: NVDA, JAWS, VoiceOver, 200%/400% zoom, Windows forced colors, real payment-provider integration, or production third-party content review.

## Evidence status terms

- Supports in tested scope: available evidence supports the criterion for the named states only.
- Partially supports in tested scope: some behavior is supported, but material exceptions or untested surfaces remain.
- Not evaluated: evidence is insufficient for a responsible statement.
- Not applicable to sample: the criterion does not apply to the implemented product surface.

These are evidence labels, not formal conformance declarations.

## Representative WCAG 2.2 evidence

| Criterion | Evidence status | Remarks and explanations |
|---|---|---|
| 1.1.1 Non-text Content | Supports in tested scope | Product imagery has context-specific alternatives; decorative duplicates use empty alternative text. The controlled baseline preserves a missing-alt defect that axe detects. |
| 1.3.1 Info and Relationships | Supports in tested scope | Native headings, lists, fieldsets, legends, labels, radios, checkboxes, and table-free checkout structure expose relationships programmatically. |
| 1.3.2 Meaningful Sequence | Supports in tested scope | DOM reading order follows visual order in the tested storefront, product, cart, and checkout states. Screen-reader confirmation remains pending. |
| 1.4.3 Contrast (Minimum) | Supports in tested scope | Tested foreground/background tokens return no configured axe contrast violations in the five remediated states. Forced-colors testing remains pending. |
| 1.4.10 Reflow | Supports in tested scope | The storefront has no horizontal overflow at 390px; a desktop pass also found no overflow at 1440px. Full 400% reflow testing remains pending. |
| 1.4.12 Text Spacing | Not evaluated | A text-spacing override was not executed. |
| 2.1.1 Keyboard | Supports in tested scope | Skip navigation, filters, product options, quantity, cart dialog, and checkout error recovery operate through native keyboard controls in the critical path. |
| 2.1.2 No Keyboard Trap | Supports in tested scope | The native modal contains focus while open, Escape closes it, and focus returns to the Add to bag trigger. |
| 2.4.1 Bypass Blocks | Supports in tested scope | The first keyboard stop is a skip link that moves focus to the products region. |
| 2.4.3 Focus Order | Supports in tested scope | Focus progresses through the tested critical path; modal entry, exit, and checkout error focus are explicitly asserted. A complete reverse-order sweep remains pending. |
| 2.4.6 Headings and Labels | Supports in tested scope | Logical heading levels and persistent descriptive labels replaced the baseline's skipped heading and placeholder-only fields. |
| 2.4.7 Focus Visible | Supports in tested scope | Interactive controls use a consistent visible focus treatment in the reviewed path. Forced-colors verification remains pending. |
| 2.4.11 Focus Not Obscured (Minimum) | Supports in tested scope | Focused controls stayed visible in the reviewed desktop and mobile path. Full-surface zoom testing remains pending. |
| 2.5.8 Target Size (Minimum) | Not evaluated | CSS includes deliberate control sizing, but a complete target-size measurement was not recorded for this sample. |
| 3.3.1 Error Identification | Supports in tested scope | Invalid checkout submission creates a named error summary and specific inline postal-code guidance. |
| 3.3.2 Labels or Instructions | Supports in tested scope | Required inputs use persistent visible labels and grouped delivery choices use legends. |
| 3.3.3 Error Suggestion | Supports in tested scope | The invalid postal-code message describes the required correction, and its summary control returns focus to the field. |
| 3.3.8 Accessible Authentication (Minimum) | Not applicable to sample | No authentication flow is implemented. |
| 4.1.2 Name, Role, Value | Supports in tested scope | Native controls and explicit accessible names replaced unnamed icon, empty-link, unlabeled-select, and role-only baseline patterns. |
| 4.1.3 Status Messages | Supports in tested scope | Result count, quantity, cart success, and checkout status use programmatic status/live-region behavior where state changes without navigation. Screen-reader wording remains pending. |

## Verified evidence summary

| Signal | Result |
|---|---:|
| Controlled baseline | 5 expected automated violation families |
| Remediated states | 5 states with 0 detected axe violations under configured rules |
| Playwright suite | 6/6 passing |
| Critical keyboard interactions | Skip link, dialog focus, Escape, focus return, checkout error recovery |
| Responsive checks | 390px and 1440px without horizontal overflow |
| Browser console | 0 relevant errors or warnings in reviewed states |

## Known limitations and next verification

1. Complete NVDA plus Chrome and JAWS plus Chrome sessions.
2. Complete VoiceOver plus Safari sessions on macOS and iOS.
3. Test 200% zoom, 400% reflow, text spacing, and Windows forced colors.
4. Re-evaluate the complete application with real content, policies, widgets, backend failures, and payment integration.
5. Replace this educational summary with the correct current ITI template if a procurement-ready ACR is required.

## References

- ITI VPAT 2.5Rev overview and templates: https://www.itic.org/policy/accessibility/vpat
- W3C WCAG 2.2 Recommendation: https://www.w3.org/TR/WCAG22/
- W3C WCAG 2 Overview: https://www.w3.org/WAI/standards-guidelines/wcag/
- W3C WCAG 2 documents and evaluation resources: https://www.w3.org/WAI/standards-guidelines/wcag/docs/

