# CEO operating decisions

Owner: Body Belonging Clinic  
Decision date: 26 July 2026  
Applies to: BBC ADHD Hub, Anchor and their public acquisition pathways

## Product portfolio

- The ADHD Hub remains a clinic-led Body Belonging Clinic resource for its first six months.
- Assessment preparation is the broad acquisition pathway.
- ADHD with eating/body distress remains the specialist clinical and commercial differentiator.
- Anchor remains a general-wellbeing tool and is not presented as diagnosis, treatment, monitoring or crisis support.
- A professional directory may be researched but is not to be built, listed or monetised yet.

## Public sources of truth

| Fact                                       | Authoritative system                               |
| ------------------------------------------ | -------------------------------------------------- |
| Public fees, credentials and service scope | Main Body Belonging Clinic website                 |
| Availability and booking                   | Halaxy                                             |
| ADHD education and assessment preparation  | ADHD Hub, in Lauren's voice and within AMHSW scope |
| Clinical records and appointment workflow  | Halaxy                                             |
| Website release source                     | GitHub `main`, deployed by Netlify                 |
| Consented update requests                  | Supabase with Netlify fallback; outbound sync off  |

The ADHD Hub must not maintain a separate fee table. It may identify Lauren's role and credentials where context requires, but the current public record remains on the main clinic website.

No email address may be transferred to MailerLite or another marketing vendor until the vendor review, data-processing terms, unsubscribe workflow and consent-only sync have been separately tested and approved.

## Measurement

The north-star measure is a completed useful next action, recorded only after the action succeeds or the visitor opens the intended destination. Examples:

- assessment guide opened;
- guide printed or saved;
- care map opened;
- current clinic facts opened;
- Halaxy booking opened;
- consented email request successfully stored.

Raw traffic, time on site, vulnerable-user engagement, streaks and repeated symptom checking are not success measures.

## Release rule

Netlify production is deployed from GitHub `main`. Preview branches are used for validation. A technically green build is necessary but does not self-approve independent clinical, cultural, privacy, legal or regulatory review.
