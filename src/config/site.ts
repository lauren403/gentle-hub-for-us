// ============================================================
// Site-wide configuration.
// Edit values here — they're used across the whole site.
// ============================================================

export const SITE_URL = "https://adhd.bodybelongingclinic.com.au";

// Google Analytics 4 Measurement ID.
// Replace this with your real Measurement ID to enable GA4.
export const GA_MEASUREMENT_ID: string = "G-EKE17QFG2S";

// Anchor app URL. While it equals "#", the "Get the free app"
// button shows a "Coming soon" message and focuses the email
// signup instead of navigating. Set to the real store/download
// URL when Anchor launches.
export const ANCHOR_URL = "#";

export const HALAXY_URL = "https://www.halaxy.com/profile/ms-lauren-lynch/social-worker/1772313";

export const CONTACT = {
  email: "admin@bodybelongingclinic.com.au",
  phone: "+61 493 117 185",
  address: {
    street: "3A Megalong Street",
    suburb: "Nedlands",
    state: "WA",
    postcode: "6009",
    country: "AU",
  },
};

export const OG_IMAGE = "/og-image.jpg"; // 1200x630 placed in /public
export const THEME_COLOR = "#2E1A22";

// ----------------------------------------------------------------
// Studio image slots.
// Drop these three files into /public to replace the on-brand
// placeholders (plum gradient + monogram) that render by default:
//   /public/studio-hero.jpg       — hero portrait / studio scene
//   /public/studio-food.jpg       — supporting image for "Food & ADHD"
//   /public/studio-belonging.jpg  — supporting image for "Belonging"
// Recommended: ~1600px wide, warm colour palette, calm composition.
// ----------------------------------------------------------------
export const HERO_IMAGE = "/studio-hero.jpg";
export const FOOD_IMAGE = "/studio-food.jpg";
export const BELONGING_IMAGE = "/studio-belonging.jpg";

// White paper PDF path.
export const WHITEPAPER_PDF = "/body-belonging-model.pdf";
