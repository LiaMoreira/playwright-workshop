import { test, expect } from "@playwright/test";

test.skip("initial page", async ({ page }) => {
	await page.goto("/");

	//Login
	await page.locator("[data-test='username']").click();
	await page.locator("[data-test='username']").fill("standard_user");
	await page.locator("[data-test='password']").click();
	await page.locator("[data-test='password']").fill("secret_sauce");
	await page.locator("[data-test='login-button']").click();

	//Main

	await page.locator("#react-burger-menu-btn").click();
	//await does nothing because there is no action being performed
	await expect(page.getByRole("navigation")).toBeDefined();

	await expect(page.getByTestId("inventory-sidebar-link").nth(0)).toContainText(
		"All Items"
	);
	await expect(page.getByTestId("inventory-sidebar-link").nth(1)).toContainText(
		"About"
	);

	await page.locator("#react-burger-cross-btn").click();
});
