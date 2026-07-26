from pathlib import Path
from shutil import copyfile

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT = OUTPUT_DIR / "body-belonging-practice-framework.pdf"
PUBLIC_OUTPUT = ROOT / "public" / "body-belonging-model.pdf"

PLUM = colors.HexColor("#2E1A22")
OAT = colors.HexColor("#F2E9DB")
CREAM = colors.HexColor("#FBF7F0")
TERRACOTTA = colors.HexColor("#BE5A2C")
INK_SOFT = colors.HexColor("#5E4D53")

pdfmetrics.registerFont(
    TTFont("BBCSans", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf")
)
pdfmetrics.registerFont(
    TTFont("BBCSansBold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf")
)
pdfmetrics.registerFont(
    TTFont("BBCSerif", "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf")
)

styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        name="CoverKicker",
        parent=styles["Normal"],
        fontName="BBCSansBold",
        fontSize=8.5,
        leading=11,
        textColor=TERRACOTTA,
        spaceAfter=10,
        uppercase=True,
        tracking=1.2,
    )
)
styles.add(
    ParagraphStyle(
        name="CoverTitle",
        parent=styles["Title"],
        fontName="BBCSerif",
        fontSize=32,
        leading=35,
        textColor=PLUM,
        spaceAfter=10,
    )
)
styles.add(
    ParagraphStyle(
        name="CoverSub",
        parent=styles["Normal"],
        fontName="BBCSerif",
        fontSize=16,
        leading=21,
        textColor=TERRACOTTA,
        spaceAfter=20,
    )
)
styles.add(
    ParagraphStyle(
        name="H1Custom",
        parent=styles["Heading1"],
        fontName="BBCSerif",
        fontSize=22,
        leading=26,
        textColor=PLUM,
        spaceBefore=8,
        spaceAfter=12,
    )
)
styles.add(
    ParagraphStyle(
        name="H2Custom",
        parent=styles["Heading2"],
        fontName="BBCSerif",
        fontSize=15,
        leading=19,
        textColor=PLUM,
        spaceBefore=14,
        spaceAfter=7,
    )
)
styles.add(
    ParagraphStyle(
        name="BodyCustom",
        parent=styles["BodyText"],
        fontName="BBCSans",
        fontSize=9.4,
        leading=14.2,
        textColor=INK_SOFT,
        spaceAfter=7,
    )
)
styles.add(
    ParagraphStyle(
        name="SmallCustom",
        parent=styles["BodyText"],
        fontName="BBCSans",
        fontSize=7.6,
        leading=11,
        textColor=INK_SOFT,
        spaceAfter=5,
    )
)
styles.add(
    ParagraphStyle(
        name="Callout",
        parent=styles["BodyText"],
        fontName="BBCSansBold",
        fontSize=10,
        leading=15,
        textColor=PLUM,
        backColor=CREAM,
        borderColor=TERRACOTTA,
        borderWidth=1,
        borderPadding=9,
        spaceBefore=7,
        spaceAfter=12,
    )
)
styles.add(
    ParagraphStyle(
        name="Footer",
        parent=styles["Normal"],
        fontName="BBCSans",
        fontSize=7,
        leading=9,
        textColor=colors.HexColor("#7C6B71"),
        alignment=TA_CENTER,
    )
)


def p(text: str, style: str = "BodyCustom"):
    return Paragraph(text, styles[style])


def bullet(text: str):
    return Paragraph(f"- {text}", styles["BodyCustom"])


def page_footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor("#D5C6BB"))
    canvas.line(22 * mm, 16 * mm, A4[0] - 22 * mm, 16 * mm)
    canvas.setFont("BBCSans", 7)
    canvas.setFillColor(colors.HexColor("#7C6B71"))
    canvas.drawCentredString(
        A4[0] / 2,
        10 * mm,
        f"Body Belonging practice framework - working paper v1.1 - page {doc.page}",
    )
    canvas.restoreState()


story = [
    Spacer(1, 18 * mm),
    p("BODY BELONGING CLINIC", "CoverKicker"),
    p("The Body Belonging<br/>practice framework", "CoverTitle"),
    p("Safety - Notice - Regulate - Belong", "CoverSub"),
    p(
        "A transparent therapeutic framework for adult ADHD-related psychosocial support, "
        "including eating, body image, emotion, identity and everyday functioning.",
        "BodyCustom",
    ),
    Spacer(1, 8 * mm),
    p(
        "WORKING PAPER - NOT A VALIDATED TREATMENT MODEL",
        "Callout",
    ),
    p(
        "<b>Version 1.1 - 26 July 2026</b><br/>"
        "Author: Lauren Lynch, Accredited Mental Health Social Worker (AASW) and ANZAED "
        "Credentialed Eating Disorder Clinician.<br/>"
        "Status: author-reviewed for scope and source transparency. Independent psychiatrist, "
        "Accredited Practising Dietitian, occupational therapy, First Nations and lived-experience "
        "review is pending.",
        "BodyCustom",
    ),
    Spacer(1, 7 * mm),
    p(
        "Body Belonging Clinic, Nedlands WA - telehealth Australia-wide<br/>"
        "adhd.bodybelongingclinic.com.au/approach",
        "SmallCustom",
    ),
    PageBreak(),
    p("1. Purpose and limits", "H1Custom"),
    p(
        "The Body Belonging practice framework is Lauren Lynch's way of organising collaborative "
        "therapy. It is not a new diagnostic system, a biological theory of ADHD, a medical service, "
        "a stand-alone treatment, or evidence that one mechanism explains attention, emotion and "
        "eating.",
    ),
    p(
        "The Australian Evidence-Based Clinical Practice Guideline for ADHD is the primary clinical "
        "reference. The framework sits within psychosocial support and does not replace assessment, "
        "prescribing, medication review, nutrition assessment, medical monitoring or emergency care.",
        "Callout",
    ),
    p("In Body Belonging Clinic's current scope:", "H2Custom"),
    bullet("Lauren provides psychosocial assessment, therapy, care navigation and referral."),
    bullet("The clinic does not diagnose ADHD or prescribe medication."),
    bullet(
        "Nutrition education remains general unless an appropriately qualified Accredited Practising "
        "Dietitian is involved."
    ),
    bullet(
        "Body-awareness work is optional, consent-based and paused when it increases distress or "
        "eating-disorder risk."
    ),
    bullet("Cultural safety is determined by the person receiving the service, not claimed by the clinic."),
    p("2. The organising proposition", "H1Custom"),
    p(
        "Attention, emotion, eating, arousal, identity and environment can influence one another. "
        "The framework keeps those interactions visible while considering other contributors such as "
        "sleep, physical health, trauma, mood, anxiety, autism, sensory needs, medication effects, "
        "substance use, food access, relationships and context.",
    ),
    p(
        "Interoception - the perception of internal body signals - may be relevant for some people. "
        "ADHD-interoception evidence is developing and varies by measure. Interoception is therefore "
        "used as one possible clinical lens, not a cause, cure or universal explanation.",
    ),
    PageBreak(),
    p("3. Four movements", "H1Custom"),
    p("The sequence is flexible. It is not a claim that every person must regulate before they can act."),
    KeepTogether(
        [
            p("Safety", "H2Custom"),
            p(
                "Ask what supports consent, accessibility, identity and enough trust to work together. "
                "Identify risk, scope and referral needs before selecting strategies."
            ),
            p(
                "<b>Knowledge type:</b> trauma-informed and collaborative practice principles. "
                "Cultural safety remains person-defined.",
                "SmallCustom",
            ),
        ]
    ),
    KeepTogether(
        [
            p("Notice", "H2Custom"),
            p(
                "Notice patterns, context, body cues and early signs of overwhelm with curiosity. "
                "Body-focus is optional and is not used as accuracy training or proof of a diagnosis."
            ),
            p(
                "<b>Knowledge type:</b> clinical practice lens plus emerging ADHD-interoception research.",
                "SmallCustom",
            ),
        ]
    ),
    KeepTogether(
        [
            p("Regulate", "H2Custom"),
            p(
                "Test practical skills for emotion, attention, routines, environment and communication. "
                "Where eating is relevant, keep support additive and non-restrictive and involve medical "
                "or dietetic professionals when their scope is needed."
            ),
            p(
                "<b>Knowledge type:</b> psychosocial ADHD interventions, skills practice and established "
                "regular-eating principles from eating-disorder treatment. Application is individual.",
                "SmallCustom",
            ),
        ]
    ),
    KeepTogether(
        [
            p("Belong", "H2Custom"),
            p(
                "Explore self-compassion, connection, culture, identity and environments that reduce "
                "unnecessary translation or shame. Belonging is a value and possible therapeutic condition, "
                "not a guaranteed active ingredient."
            ),
            p(
                "<b>Knowledge type:</b> broader mental-health and social-connection evidence, culturally "
                "grounded frameworks and individual lived experience.",
                "SmallCustom",
            ),
        ]
    ),
    PageBreak(),
    p("4. Evidence map", "H1Custom"),
]

evidence_rows = [
    [
        p("<b>Claim or component</b>", "SmallCustom"),
        p("<b>Status used by the clinic</b>", "SmallCustom"),
        p("<b>How it may be stated</b>", "SmallCustom"),
    ],
    [
        p("Australian ADHD care should be multimodal and individualised", "SmallCustom"),
        p("Australian guideline", "SmallCustom"),
        p("Primary clinical reference", "SmallCustom"),
    ],
    [
        p("Emotion-regulation difficulties are common and impairing in ADHD", "SmallCustom"),
        p("Research-supported; not diagnostic on its own", "SmallCustom"),
        p("Common, variable and not unique to ADHD", "SmallCustom"),
    ],
    [
        p("Interoception may contribute to some ADHD-related experiences", "SmallCustom"),
        p("Emerging research", "SmallCustom"),
        p("Possible contributor; never single cause", "SmallCustom"),
    ],
    [
        p("Regular eating is established in eating-disorder treatment", "SmallCustom"),
        p("Established treatment component", "SmallCustom"),
        p("Applied cautiously; individual advice may require an APD", "SmallCustom"),
    ],
    [
        p("Polyvagal ladder language", "SmallCustom"),
        p("Clinical shorthand / contested theory", "SmallCustom"),
        p("Optional map of experience, not biological fact", "SmallCustom"),
    ],
    [
        p("Rejection-sensitive dysphoria", "SmallCustom"),
        p("Popular concept; not a formal diagnosis", "SmallCustom"),
        p("Language some people recognise; assess other explanations", "SmallCustom"),
    ],
    [
        p("The four-movement framework itself", "SmallCustom"),
        p("Not independently evaluated", "SmallCustom"),
        p("Practice framework, not evidence-based treatment model", "SmallCustom"),
    ],
]

evidence_table = Table(
    evidence_rows,
    colWidths=[58 * mm, 48 * mm, 60 * mm],
    repeatRows=1,
    hAlign="LEFT",
)
evidence_table.setStyle(
    TableStyle(
        [
            ("BACKGROUND", (0, 0), (-1, 0), PLUM),
            ("TEXTCOLOR", (0, 0), (-1, 0), OAT),
            ("BACKGROUND", (0, 1), (-1, -1), CREAM),
            ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#D5C6BB")),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 6),
            ("RIGHTPADDING", (0, 0), (-1, -1), 6),
            ("TOPPADDING", (0, 0), (-1, -1), 6),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ]
    )
)
story.extend(
    [
        evidence_table,
        Spacer(1, 8 * mm),
        p("5. Suitability, cautions and referral", "H1Custom"),
        p("The framework is not assumed suitable when:", "H2Custom"),
        bullet("the person needs diagnostic assessment, medication care or urgent medical review;"),
        bullet(
            "eating is medically risky, rapidly changing, compensatory or requires specialist "
            "eating-disorder assessment and monitoring;"
        ),
        bullet("body-focus increases dissociation, panic, compulsive monitoring or eating-disorder symptoms;"),
        bullet("acute risk, crisis, safeguarding or substance-related needs exceed outpatient therapy scope;"),
        bullet("another discipline or a more intensive service is better placed to meet the need."),
        p(
            "Referral does not mean the person is rejected. It means the clinic is making scope visible "
            "and coordinating the next appropriate layer where possible.",
            "Callout",
        ),
        PageBreak(),
        p("6. Delivery and outcome review", "H1Custom"),
        p(
            "At the start of work, clinician and client identify the person's goals, relevant risks, "
            "preferred language, access needs and other treating professionals. The framework does not "
            "require every movement or a fixed order.",
        ),
        p("Progress may be reviewed through:", "H2Custom"),
        bullet("the person's own goals and experience of usefulness;"),
        bullet("distress, participation, routines and day-to-day functioning;"),
        bullet("eating-disorder symptoms and medical or dietetic indicators where relevant and in scope;"),
        bullet("adverse effects, including increased shame, rigidity, body-monitoring or disengagement;"),
        bullet("whether a change of approach, additional discipline or referral is needed."),
        p(
            "No outcome is guaranteed. Anchor and ADHD Hub content are optional general resources and "
            "are not clinical monitoring, treatment, crisis support or evidence that the framework is effective.",
            "Callout",
        ),
        p("7. Governance roadmap", "H1Custom"),
        bullet("Independent review by an Australian ADHD psychiatrist or appropriately trained GP."),
        bullet("Review of nutrition and eating content by an ADHD- and eating-disorder-informed APD."),
        bullet("Occupational therapy review of sensory, participation and executive-function content."),
        bullet("First Nations governance beyond the founder's individual authority."),
        bullet("Queer and AuDHD lived-experience review with paid, documented participation."),
        bullet("Privacy, security, accessibility and intended-purpose review for Anchor."),
        bullet("Prospective service evaluation before any validated-model or effectiveness claim."),
        p(
            "<b>Review control:</b> material claims are reviewed at least every six months or sooner "
            "when Australian guidance, safety information or scope changes. Corrections can be sent to "
            "admin@bodybelongingclinic.com.au.",
            "BodyCustom",
        ),
        PageBreak(),
        p("8. Core references", "H1Custom"),
        p(
            "1. Australian ADHD Professionals Association. Australian Evidence-Based Clinical Practice "
            "Guideline for ADHD. https://adhdguideline.aadpa.com.au/",
            "SmallCustom",
        ),
        p(
            "2. National Institute for Health and Care Excellence. Attention deficit hyperactivity disorder: "
            "diagnosis and management (NG87). https://www.nice.org.uk/guidance/ng87",
            "SmallCustom",
        ),
        p(
            "3. Cochrane Database of Systematic Reviews. Polyunsaturated fatty acids for ADHD in children "
            "and adolescents (2023).",
            "SmallCustom",
        ),
        p(
            "4. Fairburn CG. Cognitive Behavior Therapy and Eating Disorders. Guilford Press; 2008. "
            "Regular eating is a core CBT-E procedure; individual application requires clinical judgement.",
            "SmallCustom",
        ),
        p(
            "5. Khalsa SS et al. Interoception and mental health: a roadmap. Biological Psychiatry: "
            "Cognitive Neuroscience and Neuroimaging. 2018;3(6):501-513.",
            "SmallCustom",
        ),
        p(
            "6. Shaw P et al. Emotion dysregulation in attention deficit hyperactivity disorder. "
            "American Journal of Psychiatry. 2014;171(3):276-293.",
            "SmallCustom",
        ),
        p(
            "7. Office of the Australian Information Commissioner. Guide to Health Privacy. "
            "https://www.oaic.gov.au/privacy/your-privacy-rights/health-information",
            "SmallCustom",
        ),
        Spacer(1, 8 * mm),
        p(
            "Evidence labels used by the ADHD Hub: Australian guideline; systematic review; emerging "
            "research; clinical practice lens; lived experience; popular concept. Expert media and "
            "podcasts are used for topic discovery and language, not as clinical evidence by themselves.",
            "Callout",
        ),
        p(
            "General professional discussion only. This paper is not medical, nutritional or legal advice "
            "and does not establish an individual treatment plan.",
            "SmallCustom",
        ),
    ]
)

doc = SimpleDocTemplate(
    str(OUTPUT),
    pagesize=A4,
    rightMargin=22 * mm,
    leftMargin=22 * mm,
    topMargin=20 * mm,
    bottomMargin=22 * mm,
    title="The Body Belonging practice framework - working paper",
    author="Lauren Lynch - Body Belonging Clinic",
    subject="Governance working paper for the Body Belonging practice framework",
)
doc.build(story, onFirstPage=page_footer, onLaterPages=page_footer)
copyfile(OUTPUT, PUBLIC_OUTPUT)

print(OUTPUT)
print(PUBLIC_OUTPUT)
