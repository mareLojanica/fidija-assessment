import { test, expect } from "@playwright/test";
import { EPISODES_PER_PAGE } from "../constants";

test("Homepage loads correctly and displays shows", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("/homepage");
  await expect(page.locator("text=Last Added Shows")).toBeVisible();
  await expect(page.locator('[data-testid="show-card"]')).toHaveCount(
    EPISODES_PER_PAGE
  );
});

test("User can navigate to a show page and view details", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("/homepage");
  await page.locator('[data-testid="show-card"]').first().click();

  await expect(page.locator('[data-testid="show-details"]')).toBeVisible();
  await expect(page.locator('[data-testid="show-info-section"]')).toBeVisible();
  await expect(page.locator('[data-testid="show-cast-section"]')).toBeVisible();
});

test.describe("DatePicker updates API and re-renders data", () => {
  test("Selecting a new date triggers an API request and updates the shows list", async ({
    page,
  }) => {
    await page.goto("/homepage");
    const datePicker = page.locator('[data-testid="date-input"]');
    await expect(datePicker).toBeVisible();

    const initialShowCount = await page
      .locator('[data-testid="show-card"]')
      .count();

    await datePicker.fill("2024-02-01");
    await datePicker.press("Enter");

    await page.waitForResponse(
      (response) =>
        response.url().includes("/schedule?date=2024-02-01") &&
        response.status() === 200
    );

    await expect(page.locator('[data-testid="show-card"]')).not.toHaveCount(
      initialShowCount
    );
  });
});

test("Click on a random show card and verify redirection", async ({ page }) => {
  await page.goto("/homepage"); // Ensure the correct route

  await expect(page.locator('[data-testid="show-card"]')).toHaveCount(
    EPISODES_PER_PAGE,
    {
      timeout: 5000,
    }
  );

  const showCards = page.locator('[data-testid="show-card"]');
  const showCount = await showCards.count();
  expect(showCount).toBeGreaterThan(0);

  const randomIndex = Math.floor(Math.random() * showCount);
  const randomShow = showCards.nth(randomIndex);

  const showLink = await randomShow.locator("a").getAttribute("href");
  expect(showLink).not.toBeNull();

  await randomShow.click();

  await expect(page).toHaveURL(new RegExp(`${showLink}$`));
});
