# Anchor assurance dossier

Status: working review document  
Product boundary: general wellbeing only

## Intended purpose

Anchor provides optional general-wellbeing prompts. It does not diagnose, treat or monitor a health condition, provide emergency support, or replace professional assessment or treatment.

## Current design

- no user account;
- no clinic monitoring;
- no calorie, weight or streak mechanics;
- settings remain on the user's device in the current design;
- no health information should enter analytics;
- public update requests are separate from Anchor settings and require explicit marketing consent.

## Required review evidence

### Privacy

- data-flow map;
- vendor and subprocessor register;
- collection, retention, deletion and access rules;
- privacy impact assessment;
- Notifiable Data Breach response owner.

### Security

- threat model;
- dependency and secret scan;
- access-control review;
- incident logging and response;
- remediation record.

### Accessibility and lived experience

- keyboard, focus, screen-reader and contrast audit;
- reduced-motion and cognitive-load review;
- paid eating-disorder, queer and AuDHD lived-experience review;
- adverse-feedback pathway.

### Clinical and regulatory boundary

- signed clinical review of intended purpose and escalation language;
- documented TGA classification assessment based on actual functions and public claims;
- change-control rule requiring re-review before cloud accounts, health tracking, AI, clinical recommendations or clinician monitoring are added.

## Release decision

Anchor may remain available only within the fixed general-wellbeing boundary. Any stronger safety, efficacy or clinical claim remains blocked until the relevant accountable reviewer approves it in writing.
