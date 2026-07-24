import { test, expect } from "@playwright/test";

test("homepage loads with hero and a booking CTA", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("ADHD");
  await expect(page.getByRole("link", { name: /book a free/i }).first()).toBeVisible();
});

test("homepage shows the signup email field", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByPlaceholder("you@example.com")).toBeVisible();
});

test("the Food and the ADHD brain pillar renders", async ({ page }) => {
  await page.goto("/food-and-the-adhd-brain");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Food and the ADHD brain");
});
