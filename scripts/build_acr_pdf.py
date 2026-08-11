from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak,
)


ROOT = Path(__file__).resolve().parents[3]
OUTPUT = ROOT / "output" / "pdf"
OUTPUT.mkdir(parents=True, exist_ok=True)
PDF_PATH = OUTPUT / "lume-nove-educational-acr-sample.pdf"

PAGE_W, PAGE_H = A4
NAVY = colors.HexColor("#14281F")
GREEN = colors.HexColor("#244733")
TERRACOTTA = colors.HexColor("#B7472E")
CREAM = colors.HexColor("#F5EFE3")
INK = colors.HexColor("#181815")
MUTED = colors.HexColor("#5E635F")
LINE = colors.HexColor("#D9D2C5")
PALE_GREEN = colors.HexColor("#E9F0EB")
PALE_ORANGE = colors.HexColor("#F7E9E3")
PALE_GRAY = colors.HexColor("#F1F1EE")


def register_fonts():
    regular = Path("C:/Windows/Fonts/arial.ttf")
    bold = Path("C:/Windows/Fonts/arialbd.ttf")
    if regular.exists() and bold.exists():
        pdfmetrics.registerFont(TTFont("A11ySans", str(regular)))
        pdfmetrics.registerFont(TTFont("A11ySans-Bold", str(bold)))
        return "A11ySans", "A11ySans-Bold"
    return "Helvetica", "Helvetica-Bold"


FONT, FONT_BOLD = register_fonts()


class ReportDoc(BaseDocTemplate):
    def __init__(self, filename):
        super().__init__(
            filename,
            pagesize=A4,
            leftMargin=18 * mm,
            rightMargin=18 * mm,
            topMargin=22 * mm,
            bottomMargin=18 * mm,
            title="LUME NOVE Educational Accessibility Conformance Evidence Summary",
            author="Kalil Tagouti",
            subject="Self-initiated accessibility engineering portfolio evidence",
        )
        frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id="body")
        self.addPageTemplates(PageTemplate(id="report", frames=[frame], onPage=self.draw_page))

    def draw_page(self, canvas, doc):
        canvas.saveState()
        canvas.setFillColor(NAVY)
        canvas.rect(0, PAGE_H - 11 * mm, PAGE_W, 11 * mm, fill=1, stroke=0)
        canvas.setFont(FONT_BOLD, 7.8)
        canvas.setFillColor(CREAM)
        canvas.drawString(18 * mm, PAGE_H - 7.2 * mm, "LUME NOVE  /  EDUCATIONAL ACCESSIBILITY EVIDENCE")
        canvas.setStrokeColor(LINE)
        canvas.line(18 * mm, 13 * mm, PAGE_W - 18 * mm, 13 * mm)
        canvas.setFont(FONT, 7.5)
        canvas.setFillColor(MUTED)
        canvas.drawString(18 * mm, 8.3 * mm, "Self-initiated sample - not an official VPAT, certification, or legal compliance claim")
        canvas.drawRightString(PAGE_W - 18 * mm, 8.3 * mm, f"{doc.page}")
        canvas.restoreState()


styles = getSampleStyleSheet()
title_style = ParagraphStyle(
    "TitleCustom", parent=styles["Title"], fontName=FONT_BOLD, fontSize=26,
    leading=29, textColor=NAVY, alignment=TA_LEFT, spaceAfter=7 * mm,
)
eyebrow_style = ParagraphStyle(
    "Eyebrow", parent=styles["Normal"], fontName=FONT_BOLD, fontSize=8.5,
    leading=10, textColor=TERRACOTTA, spaceAfter=3 * mm, tracking=1.2,
)
h1_style = ParagraphStyle(
    "H1", parent=styles["Heading1"], fontName=FONT_BOLD, fontSize=17,
    leading=20, textColor=NAVY, spaceBefore=4 * mm, spaceAfter=3 * mm,
)
h2_style = ParagraphStyle(
    "H2", parent=styles["Heading2"], fontName=FONT_BOLD, fontSize=12,
    leading=15, textColor=GREEN, spaceBefore=3 * mm, spaceAfter=2 * mm,
)
body_style = ParagraphStyle(
    "Body", parent=styles["BodyText"], fontName=FONT, fontSize=9.2,
    leading=13.2, textColor=INK, spaceAfter=2.5 * mm,
)
small_style = ParagraphStyle(
    "Small", parent=body_style, fontSize=7.7, leading=10, spaceAfter=0,
)
small_bold_style = ParagraphStyle(
    "SmallBold", parent=small_style, fontName=FONT_BOLD, textColor=NAVY,
)
table_header_style = ParagraphStyle(
    "TableHeader", parent=small_style, fontName=FONT_BOLD, textColor=CREAM,
)
callout_style = ParagraphStyle(
    "Callout", parent=body_style, fontName=FONT_BOLD, fontSize=10.2,
    leading=14, textColor=NAVY, leftIndent=4 * mm, rightIndent=4 * mm,
)


def p(text, style=body_style):
    return Paragraph(text, style)


def bullet(text):
    return Paragraph(f"<font color='#B7472E'>-</font> {text}", body_style)


def section_title(eyebrow, title):
    return KeepTogether([p(eyebrow.upper(), eyebrow_style), p(title, h1_style)])


def status_color(status):
    if status.startswith("Supports"):
        return PALE_GREEN
    if status.startswith("Partially"):
        return PALE_ORANGE
    return PALE_GRAY


story = []
story.append(Spacer(1, 13 * mm))
story.append(p("PORTFOLIO EVIDENCE / AUGUST 2026", eyebrow_style))
story.append(p("LUME NOVE", title_style))
story.append(p("Educational Accessibility Conformance Evidence Summary", ParagraphStyle(
    "Subtitle", parent=body_style, fontName=FONT_BOLD, fontSize=16, leading=20,
    textColor=GREEN, spaceAfter=7 * mm,
)))

meta_data = [
    [p("PRODUCT", small_bold_style), p("LUME NOVE accessible commerce case study, v0.1", small_style)],
    [p("OWNER", small_bold_style), p("Self-initiated portfolio demonstration by Kalil Tagouti", small_style)],
    [p("REFERENCE", small_bold_style), p("WCAG 2.2 Levels A and AA; ITI VPAT 2.5Rev WCAG structure reference", small_style)],
    [p("CONTACT", small_bold_style), p("contra.com/kalil_tagouti_a875j12h  /  linkedin.com/in/kalil-tagouti-a5a209392", small_style)],
]
meta = Table(meta_data, colWidths=[30 * mm, 132 * mm], hAlign="LEFT")
meta.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (0, -1), CREAM),
    ("BOX", (0, 0), (-1, -1), 0.6, LINE),
    ("INNERGRID", (0, 0), (-1, -1), 0.35, LINE),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 7),
    ("RIGHTPADDING", (0, 0), (-1, -1), 7),
    ("TOPPADDING", (0, 0), (-1, -1), 7),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
]))
story.append(meta)
story.append(Spacer(1, 7 * mm))

warning = Table([[p(
    "ABBREVIATED EDUCATIONAL SAMPLE. This document is not an official VPAT, is not procurement-ready, and is not a certification, legal opinion, or claim of full WCAG or EAA compliance.",
    callout_style,
)]], colWidths=[162 * mm])
warning.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), PALE_ORANGE),
    ("LINEBEFORE", (0, 0), (0, -1), 4, TERRACOTTA),
    ("LEFTPADDING", (0, 0), (-1, -1), 10),
    ("RIGHTPADDING", (0, 0), (-1, -1), 10),
    ("TOPPADDING", (0, 0), (-1, -1), 10),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
]))
story.append(warning)
story.append(Spacer(1, 8 * mm))
story.append(p("A fictional React commerce flow evaluated with a controlled inaccessible baseline, code-level remediation, browser checks, and repeatable regression evidence.", ParagraphStyle(
    "Lead", parent=body_style, fontSize=13, leading=18, textColor=INK,
)))
story.append(PageBreak())

story.extend([section_title("01 / Scope", "Product and evaluation scope")])
story.append(p("LUME NOVE contains four high-risk commerce surfaces: a responsive storefront, product configuration, a native modal cart, and a delivery checkout with recoverable validation. The report describes only the tested local build."))
story.append(p("Evaluation methods", h2_style))
for item in [
    "Source and semantic DOM review",
    "Keyboard review of the critical commerce path",
    "Desktop and 390px responsive browser inspection",
    "Playwright workflow assertions",
    "axe-core analysis configured with WCAG 2.0 A/AA, 2.1 A/AA, and 2.2 AA tags",
]:
    story.append(bullet(item))
story.append(Spacer(1, 3 * mm))
story.append(p("Not performed", h2_style))
story.append(p("NVDA, JAWS, VoiceOver, 200%/400% zoom, Windows forced colors, real payment-provider integration, and production third-party content review were not performed. No screen-reader-tested claim is made."))
story.append(p("Evidence status terms", h2_style))

term_data = [
    [p("Supports in tested scope", small_bold_style), p("Available evidence supports the criterion for the named states only.", small_style)],
    [p("Partially supports in tested scope", small_bold_style), p("Material exceptions or untested surfaces remain.", small_style)],
    [p("Not evaluated", small_bold_style), p("Evidence is insufficient for a responsible statement.", small_style)],
    [p("Not applicable to sample", small_bold_style), p("The criterion does not apply to the implemented surface.", small_style)],
]
terms = Table(term_data, colWidths=[54 * mm, 108 * mm])
terms.setStyle(TableStyle([
    ("BOX", (0, 0), (-1, -1), 0.5, LINE),
    ("INNERGRID", (0, 0), (-1, -1), 0.35, LINE),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("BACKGROUND", (0, 0), (0, 0), PALE_GREEN),
    ("BACKGROUND", (0, 1), (0, 1), PALE_ORANGE),
    ("BACKGROUND", (0, 2), (0, 3), PALE_GRAY),
    ("LEFTPADDING", (0, 0), (-1, -1), 7),
    ("RIGHTPADDING", (0, 0), (-1, -1), 7),
    ("TOPPADDING", (0, 0), (-1, -1), 7),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
]))
story.append(terms)
story.append(Spacer(1, 3 * mm))
story.append(p("These labels summarize evidence; they are not formal conformance declarations.", small_style))
story.append(PageBreak())

rows = [
    ("1.1.1", "Non-text Content", "Supports in tested scope", "Product imagery has context-specific alternatives; decorative duplicates use empty alternative text. The controlled baseline preserves a missing-alt defect that axe detects."),
    ("1.3.1", "Info and Relationships", "Supports in tested scope", "Native headings, lists, fieldsets, legends, labels, radios, and checkboxes expose relationships programmatically."),
    ("1.3.2", "Meaningful Sequence", "Supports in tested scope", "DOM reading order follows visual order in the tested states. Screen-reader confirmation remains pending."),
    ("1.4.3", "Contrast (Minimum)", "Supports in tested scope", "Tested color tokens return no configured axe contrast violations in five remediated states. Forced-colors testing remains pending."),
    ("1.4.10", "Reflow", "Supports in tested scope", "No horizontal overflow at 390px and 1440px. Full 400% reflow testing remains pending."),
    ("1.4.12", "Text Spacing", "Not evaluated", "A text-spacing override was not executed."),
    ("2.1.1", "Keyboard", "Supports in tested scope", "Skip navigation, filters, product options, quantity, cart, and checkout recovery operate through native keyboard controls in the critical path."),
    ("2.1.2", "No Keyboard Trap", "Supports in tested scope", "The native modal contains focus while open, Escape closes it, and focus returns to Add to bag."),
    ("2.4.1", "Bypass Blocks", "Supports in tested scope", "The first keyboard stop is a skip link that moves focus to the products region."),
    ("2.4.3", "Focus Order", "Supports in tested scope", "Modal entry, exit, and checkout error focus are asserted. A complete reverse-order sweep remains pending."),
    ("2.4.6", "Headings and Labels", "Supports in tested scope", "Logical heading levels and persistent labels replaced the baseline's skipped heading and placeholder-only fields."),
    ("2.4.7", "Focus Visible", "Supports in tested scope", "Controls use a consistent visible focus treatment in the reviewed path. Forced-colors verification remains pending."),
    ("2.4.11", "Focus Not Obscured", "Supports in tested scope", "Focused controls stayed visible in reviewed desktop and mobile paths. Full-surface zoom testing remains pending."),
    ("2.5.8", "Target Size (Minimum)", "Not evaluated", "A complete target-size measurement was not recorded for this sample."),
    ("3.3.1", "Error Identification", "Supports in tested scope", "Invalid checkout submission creates a named error summary and specific inline postal-code guidance."),
    ("3.3.2", "Labels or Instructions", "Supports in tested scope", "Required inputs use persistent labels and grouped delivery choices use legends."),
    ("3.3.3", "Error Suggestion", "Supports in tested scope", "The invalid postal-code message describes the correction and its summary control returns focus to the field."),
    ("3.3.8", "Accessible Authentication", "Not applicable to sample", "No authentication flow is implemented."),
    ("4.1.2", "Name, Role, Value", "Supports in tested scope", "Native controls and explicit names replaced unnamed icon, empty-link, unlabeled-select, and role-only baseline patterns."),
    ("4.1.3", "Status Messages", "Supports in tested scope", "Result count, quantity, cart success, and checkout status use programmatic status behavior. Screen-reader wording remains pending."),
]

for chunk_start in range(0, len(rows), 7):
    chunk = rows[chunk_start:chunk_start + 7]
    story.append(section_title(f"02 / WCAG evidence {chunk_start + 1}-{chunk_start + len(chunk)}", "Representative criterion evidence"))
    table_data = [[p("CRITERION", table_header_style), p("EVIDENCE STATUS", table_header_style), p("REMARKS AND EXPLANATIONS", table_header_style)]]
    for code, name, status, remarks in chunk:
        table_data.append([
            p(f"<b>{code}</b><br/>{name}", small_style),
            p(status, small_bold_style),
            p(remarks, small_style),
        ])
    table = Table(table_data, colWidths=[39 * mm, 42 * mm, 81 * mm], repeatRows=1)
    commands = [
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR", (0, 0), (-1, 0), CREAM),
        ("BOX", (0, 0), (-1, -1), 0.55, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.3, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]
    for idx, (_, _, status, _) in enumerate(chunk, start=1):
        commands.append(("BACKGROUND", (1, idx), (1, idx), status_color(status)))
        if idx % 2 == 0:
            commands.append(("BACKGROUND", (0, idx), (0, idx), colors.HexColor("#FAF9F6")))
            commands.append(("BACKGROUND", (2, idx), (2, idx), colors.HexColor("#FAF9F6")))
    table.setStyle(TableStyle(commands))
    story.append(table)
    if chunk_start + 7 < len(rows):
        story.append(PageBreak())

story.append(PageBreak())
story.append(section_title("03 / Verification", "Measured evidence and remediation trace"))
signals = [
    ("Controlled baseline", "5 expected automated violation families"),
    ("Remediated states", "5 states with 0 detected axe violations under configured rules"),
    ("Playwright suite", "6 / 6 passing"),
    ("Keyboard interactions", "Skip link, dialog focus, Escape, focus return, checkout error recovery"),
    ("Responsive checks", "390px and 1440px without horizontal overflow"),
    ("Browser console", "0 relevant errors or warnings in reviewed states"),
]
signal_table = Table(
    [[p("SIGNAL", table_header_style), p("VERIFIED RESULT", table_header_style)]] +
    [[p(a, small_style), p(b, small_style)] for a, b in signals],
    colWidths=[53 * mm, 109 * mm],
    repeatRows=1,
)
signal_table.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), NAVY),
    ("TEXTCOLOR", (0, 0), (-1, 0), CREAM),
    ("BOX", (0, 0), (-1, -1), 0.55, LINE),
    ("INNERGRID", (0, 0), (-1, -1), 0.3, LINE),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#FAF9F6")]),
    ("LEFTPADDING", (0, 0), (-1, -1), 7),
    ("RIGHTPADDING", (0, 0), (-1, -1), 7),
    ("TOPPADDING", (0, 0), (-1, -1), 7),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
]))
story.append(signal_table)
story.append(Spacer(1, 7 * mm))
story.append(p("Controlled before-to-after trace", h2_style))
findings = [
    ("A-01", "Unnamed close control", "Visible text and accessible name on the native dialog control"),
    ("A-02", "Insufficient contrast", "High-contrast design tokens across the tested states"),
    ("A-03", "Missing product alternative", "Context-specific alternative text; decorative duplicates hidden"),
    ("A-04", "Empty return link", "Visible descriptive navigation label"),
    ("A-05", "Unlabelled country selector", "Persistent visible label and autocomplete metadata"),
    ("M-02", "Role-only Continue div", "Native submit button with keyboard behavior"),
    ("M-03", "Generic unassociated error", "Focused alert summary, field link, aria-invalid, and aria-describedby"),
]
finding_table = Table(
    [[p("ID", table_header_style), p("BASELINE BARRIER", table_header_style), p("REMEDIATION", table_header_style)]] +
    [[p(a, small_bold_style), p(b, small_style), p(c, small_style)] for a, b, c in findings],
    colWidths=[18 * mm, 54 * mm, 90 * mm], repeatRows=1,
)
finding_table.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), GREEN),
    ("TEXTCOLOR", (0, 0), (-1, 0), CREAM),
    ("BOX", (0, 0), (-1, -1), 0.55, LINE),
    ("INNERGRID", (0, 0), (-1, -1), 0.3, LINE),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#FAF9F6")]),
    ("LEFTPADDING", (0, 0), (-1, -1), 6),
    ("RIGHTPADDING", (0, 0), (-1, -1), 6),
    ("TOPPADDING", (0, 0), (-1, -1), 6),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
]))
story.append(finding_table)
story.append(PageBreak())

story.append(section_title("04 / Boundaries", "Known limitations and next verification"))
for index, item in enumerate([
    "Complete NVDA plus Chrome and JAWS plus Chrome sessions.",
    "Complete VoiceOver plus Safari sessions on macOS and iOS.",
    "Test 200% zoom, 400% reflow, text spacing, and Windows forced colors.",
    "Re-evaluate with real content, policies, widgets, backend failures, and payment integration.",
    "Use the correct current ITI template if a procurement-ready ACR is required.",
], start=1):
    item_table = Table([[p(f"{index:02d}", ParagraphStyle("Num", parent=h2_style, textColor=TERRACOTTA)), p(item, body_style)]], colWidths=[16 * mm, 146 * mm])
    item_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    story.append(item_table)
story.append(Spacer(1, 5 * mm))

boundary = Table([[p(
    "Responsible claim: technical accessibility audit and remediation aligned with WCAG 2.2 AA for the tested scope. Claims intentionally excluded: WCAG compliant, EAA compliant, certified, and screen-reader tested.",
    callout_style,
)]], colWidths=[162 * mm])
boundary.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), PALE_GREEN),
    ("LINEBEFORE", (0, 0), (0, -1), 4, GREEN),
    ("LEFTPADDING", (0, 0), (-1, -1), 10),
    ("RIGHTPADDING", (0, 0), (-1, -1), 10),
    ("TOPPADDING", (0, 0), (-1, -1), 10),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
]))
story.append(boundary)
story.append(Spacer(1, 9 * mm))
story.append(p("Primary references", h2_style))
for label, url in [
    ("ITI VPAT 2.5Rev overview and templates", "https://www.itic.org/policy/accessibility/vpat"),
    ("W3C WCAG 2.2 Recommendation", "https://www.w3.org/TR/WCAG22/"),
    ("W3C WCAG 2 Overview", "https://www.w3.org/WAI/standards-guidelines/wcag/"),
    ("W3C WCAG 2 documents and evaluation resources", "https://www.w3.org/WAI/standards-guidelines/wcag/docs/"),
]:
    story.append(p(f"<b>{label}</b><br/><font color='#5E635F'>{url}</font>", body_style))


doc = ReportDoc(str(PDF_PATH))
doc.build(story)
print(PDF_PATH)
