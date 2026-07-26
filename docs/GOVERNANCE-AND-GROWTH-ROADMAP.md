# ADHD Hub governance and growth roadmap

Owner: Body Belonging Clinic
Version: 1.0
Date: 26 July 2026
Review cadence: monthly for the first 90 days, then quarterly

## Executive decision

Position the ADHD Hub as:

> An Australian, First Nations-founded, queer-affirming and eating-disorder-informed ADHD care navigator - combining evidence-labelled education, practical support and gentle digital tools.

Do not use "Australia's first", "#1", "leading", "the only hub" or equivalent comparative claims without a documented, current and reproducible market review plus legal sign-off.

The Australian ADHD guideline is the clinical constitution. International experts and ADHD media inform questions and translation; they do not replace Australian guidance or discipline-specific review.

## Operating model

| Function                          | Accountable role          | Required contributors                                                                                       | Decision right                                                  |
| --------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Clinical and editorial governance | Founder / AMHSW           | Psychiatrist or ADHD-trained GP, APD, OT, First Nations advisors, queer and AuDHD lived-experience advisors | Publish, revise or withdraw health content                      |
| Nutrition                         | APD reviewer              | Eating-disorder clinician, GP as needed                                                                     | Approve individualised nutrition claims and referral thresholds |
| Australian care navigation        | Clinical governance group | State and territory subject-matter input                                                                    | Approve jurisdiction-specific pathways                          |
| Anchor product safety             | Product owner             | Privacy/security, accessibility, clinical and lived-experience reviewers                                    | Intended purpose, release and incident response                 |
| Privacy and data                  | Privacy Officer           | Hosting, database and email suppliers                                                                       | Collection, retention, access and breach response               |
| Commercial and brand              | Founder / business owner  | Legal/advertising review where needed                                                                       | Positioning, partnerships and campaigns                         |

Named appointments, conflicts, terms of reference, payment and meeting cadence must be recorded before the group is represented publicly.

## Release gates

### Gate 1 - publishable foundation

Implemented in the `agent/adhd-hub-governance` branch:

- Full privacy policy and point-of-collection notices.
- Explicit analytics choice before Google Analytics loads.
- Explicit email consent and versioned consent evidence in the proposed database migration.
- Complaints page and WA Code/HaDSCO pathway.
- Separate Anchor privacy notice, terms, intended purpose and safety limits.
- Working Letter article routes.
- LocalBusiness/ProfessionalService schema rather than MedicalBusiness.
- Evidence labels, authorship, review dates and editorial policy.
- Safer claims for ADHD, emotion, interoception, polyvagal language, cultural safety and Anchor.
- Body Belonging presented as a practice framework, not a validated model.
- Australian adult ADHD care map.
- Removal of duplicate mobile booking action.
- High-priority loading for the homepage hero.

Must be verified before merge or deployment:

- Build, typecheck, lint, unit tests and end-to-end route tests pass.
- Supabase migration applies in a non-production preview first.
- Anonymous users cannot select, update or delete `lead_signups`.
- Valid consent insert succeeds; insert without consent fails.
- Outbound email sync remains off until MailerLite receives only consented records and unsubscribe works end to end.
- Netlify form submissions capture `consent`, `source` and timestamp.
- Production CSP permits consented analytics and required Supabase requests only.
- Every new route returns 200 and has one canonical URL.

### Gate 2 - independently governed authority

Target: days 15-45.

- Contract and publish the advisory/review group.
- Commission an APD review of every nutrition and eating page.
- Commission medical review of assessment, medication, differential and escalation content.
- Obtain First Nations governance beyond the founder's individual authority.
- Complete paid queer and AuDHD lived-experience review.
- Build a source register with citation, population, evidence type, owner and next review date.
- Create a corrections log and six-month content review calendar.
- Complete a state/territory matrix for complaints, diagnosis, prescribing, permits and shared care.
- Complete privacy vendor register, data-processing review, retention schedule and Notifiable Data Breach response plan.
- Obtain professional legal review of the privacy policy, direct marketing workflow and health-service advertising claims.

Do not display external reviewers until written approval, scope of review and conflicts are documented.

### Gate 3 - national hub product

Target: days 46-90.

- Add journey filters across Learn, Navigate, Nourish, Practise, Find care, Connect, Anchor and For professionals.
- Publish post-diagnosis, medication-support and workplace/university pathways. The assessment-preparation pathway is now implemented as the broad, free entry point.
- Research a verified professional directory but do not build or accept listings during the clinic-led first six months.
- Pilot one education group with eligibility, exclusions, facilitator scope, feedback and adverse-event monitoring.
- Define and test outcomes before making effectiveness claims about the practice framework or Anchor.
- Complete Anchor privacy impact assessment, threat model, accessibility audit, incident process and TGA intended-purpose classification review.
- Keep the main Body Belonging Clinic website authoritative for fees, credentials and scope; keep Halaxy authoritative for availability and booking. The ADHD Hub must not maintain a separate fee table.

## Content model

Every health article must contain:

1. Intended audience and who the page is not for.
2. Author and professional role.
3. Independent reviewer or a clear statement that review is pending.
4. Published, last-reviewed and next-review dates.
5. Evidence labels.
6. Scope, uncertainty and referral points.
7. References close enough to the claim to be auditable.
8. Conflict or commercial relationship disclosure.
9. Correction contact.

Podcast or expert-media content uses this fixed structure:

1. What the guest said.
2. What lived experience recognises.
3. What Australian guidance says.
4. How certain the evidence is.
5. What may be safe to try.
6. When to speak with a GP, psychiatrist, APD, pharmacist or therapist.

## Data map

| Data                 | Entry point                 | System                                                | Purpose                                 | Minimum governance                                                            |
| -------------------- | --------------------------- | ----------------------------------------------------- | --------------------------------------- | ----------------------------------------------------------------------------- |
| Email and consent    | Hub and Anchor update forms | Supabase with Netlify fallback; outbound email paused | Requested updates                       | Consent version, timestamp and source; vendor sync requires separate approval |
| Website events       | Consent banner              | Google Analytics                                      | Aggregate site improvement              | No loading before opt-in; no health, email or form payloads                   |
| Booking and enquiry  | Halaxy and clinic contact   | Halaxy and clinic communication systems               | Booking and service delivery            | Halaxy collection notice; role-based access; retention                        |
| Clinical information | Referral and sessions       | Practice-management/clinical record system            | Safe clinical support and legal records | Health privacy, access/correction, retention and breach process               |
| Anchor settings      | Anchor device               | Device-local storage in current intended design       | User-set wellbeing reminders            | No account; no clinic monitoring; re-review before cloud or analytics         |

Any new account, sync, notification, AI, clinical decision, directory or community feature triggers a privacy impact assessment before build.

## Measures

### Trust and quality

- Percentage of health pages reviewed by due date.
- Percentage with a named independent reviewer.
- Corrections acknowledged within two business days.
- Material corrections published or escalated within ten business days.
- Percentage of directory listings verified within the stated interval.

### Safety and privacy

- Confirmed emails sent without valid consent: target zero.
- Unsubscribe requests not honoured within five working days: target zero.
- Privacy or safety incidents by severity and time to containment.
- Anchor adverse feedback and number resulting in product change.
- Content pages withdrawn because evidence or scope changed.

### Commercial

- Useful next-action completions (`next_action_complete`) are the north-star measure.
- Assessment-guide opens and print/save actions.
- Care-map to Start Here progression.
- Intro-call booking opens by source, reported only in aggregate.
- Referral source mix and suitable-fit rate.
- Waitlist-to-resource engagement without using health-status profiling.

### Service

- Time from enquiry to response.
- Intro calls resulting in appropriate clinic booking, referral elsewhere or informed no-action.
- Client-defined goal review completion.
- Dropout and reason where known, reviewed without claiming causality.

Do not use vulnerable-user engagement, streaks, repeated symptom checking or longer time-on-app as success measures.

## Board-level risks

| Risk                                                        | Control                                                                     | Residual decision                                       |
| ----------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------- |
| Nutrition authority exceeds social-work scope               | APD ownership and review; general education only until then                 | Fund APD governance                                     |
| Founder authority is treated as multidisciplinary authority | Named paid advisory structure and transparent pending status                | Recruit reviewers                                       |
| "Culturally safe" becomes a self-awarded claim              | Person-defined language, feedback and First Nations governance              | Establish governance beyond founder                     |
| Anchor becomes software as a medical device through claims  | Fixed general-wellbeing intended purpose and TGA review before scope change | Product boundary or regulated pathway                   |
| Public email database is abused                             | RLS, consent-gated inserts, rate limiting, monitoring and retention         | Verify deployed policies                                |
| Duplicate clinic/hub facts diverge                          | BBC website controls fees/credentials/scope; Halaxy controls booking        | Audit links and remove duplicate facts                  |
| Comparative positioning becomes misleading                  | Ban unsupported first/only/leading claims                                   | Commission market review only if commercially necessary |

## Owner decisions recorded 26 July 2026

1. The Hub remains clinic-led for its first six months; no separate entity is created.
2. The main Body Belonging Clinic website is authoritative for public fees, credentials and service scope.
3. Halaxy is authoritative for appointment availability and booking.
4. ADHD assessment preparation is the broad acquisition pathway and must remain in Lauren's voice, grounded in her clinical research and clearly non-diagnostic.
5. Anchor remains a narrow general-wellbeing tool.
6. The professional directory is research only and is not to be built yet.
7. Useful next-action completions, not raw traffic or time on site, are the north-star measure.
8. Netlify 2FA is confirmed enabled.

## Decisions still required

1. Budget and contract structure for medical, APD, First Nations and lived-experience governance.
2. Account recovery/continuity owner beyond the founder.
3. Conditional launch date after the technical and accountable human review gates are evidenced.
