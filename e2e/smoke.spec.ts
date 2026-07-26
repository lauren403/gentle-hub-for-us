import { test, expect } from "@playwright/test";

test("homepage loads with hero and a booking CTA", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("ADHD");
  await expect(page.getByRole("link", { name: /book a free/i }).first()).toBeVisible();
});

test("homepage shows the signup email field", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByPlaceholder("you@example.com")).toBeVisible();
  await expect(page.getByRole("checkbox", { name: /I agree/i })).toBeVisible();
});

test("the Food and the ADHD brain pillar renders", async ({ page }) => {
  await page.goto("/food-and-the-adhd-brain");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Food and the ADHD brain");
});

test("a Letter renders its article rather than the Letters index", async ({ page }) => {
  await page.goto("/letters/the-hardest-part-isnt-focus-its-feeling");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "When the emotional side of ADHD feels hardest",
  );
  await expect(page.getByRole("complementary", { name: "Content governance" })).toBeVisible();
});

test("the Australian care map and governance pages are public", async ({ page }) => {
  await page.goto("/australian-adhd-care");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Australian.*ADHD care map/i);

  await page.goto("/privacy");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Privacy");

  await page.goto("/complaints");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Feedback and complaints");
});
