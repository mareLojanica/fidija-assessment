import { test, expect } from "@playwright/test"

test.describe("ShowPage Component", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/show/1")
	})

	test("Displays show details when a valid ID is used", async ({ page }) => {
		await page.route("**/shows/74888?embed=cast", async (route) => {
			await route.fulfill({
				status: 200,
				contentType: "application/json",
				body: JSON.stringify({
					name: "Under the Dome",
					image: { medium: "https://via.placeholder.com/150" },
					rating: { average: 9.5 },
					summary:
						"<p>A high school chemistry teacher turned meth producer.</p>",
					network: { name: "AMC" },
					genres: ["Drama", "Crime"],
					status: "Ended",
					schedule: { days: ["Sunday"] },
					_embedded: {
						cast: [{ person: { name: "Mike Vogel" } }],
					},
				}),
			})
		})

		await expect(
			page.getByRole("heading", { name: "Under the Dome" })
		).toBeVisible()
		await expect(page.locator("text=Mike Vogel")).toBeVisible()
	})

	test("Shows error message when an invalid ID is used", async ({ page }) => {
		await page.route("**/shows/9999?embed=cast", async (route) => {
			await route.fulfill({
				status: 404,
				body: JSON.stringify({}),
			})
		})

		await page.goto("/show/999989237892734982374982374")

		await expect(
			page.locator('[data-testid="error-message"]')
		).toBeVisible()
		await expect(
			page.locator("text=Ooops something went wrong!")
		).toBeVisible()
	})
})
