import { test, expect } from "@playwright/test";

test.describe("Main page", async () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
		//performs login

		//if we want to point to the unique identifier we can do this work around
		await page.locator("[data-test='username']").click();
		await page.locator("[data-test='username']").fill("standard_user");
		await page.locator("[data-test='password']").click();
		await page.locator("[data-test='password']").fill("secret_sauce");
		await page.locator("[data-test='login-button']").click();
	});

	test("Validate page", async ({ page }) => {
		const appTitle = page.locator(".app_logo"); //done

		await expect(appTitle).toHaveText("Swag Labs");
		//We can't use this because it needed to be data-testid and not data-test
		//await expect(page.getByTestId("inventory-item")).toHaveCount(6);

		//if we want to point to the unique identifier we can do this work around
		await expect(page.locator("[data-test='inventory-item']")).toHaveCount(6);
	});

	test("open an item and add them", async ({ page }) => {
		const item = page.locator("[data-test='inventory-item']").nth(0); // done

		await item.locator("[data-test='item-4-title-link']").click();

		await expect(
			page.locator("[data-test='inventory-item-name']")
		).toContainText("Backpack");

		await expect(page.locator("[data-test='add-to-cart']")).toBeEnabled(); // item pageObject //done

		await expect(page.locator("[data-test='add-to-cart']")).toContainText(
			"Add"
		);

		await page.locator("[data-test='add-to-cart']").click(); //done

		await expect(page.locator("[data-test='remove']")).toBeEnabled(); //done

		await expect(page.locator("[data-test='remove']")).toContainText("Remove");

		await expect(
			page.locator("[data-test='shopping-cart-badge']") //done
		).toContainText("1");
	});

	test("add an item to cart", async ({ page }) => {
		await expect(
			page.locator("[data-test='add-to-cart-sauce-labs-backpack']")
		).toBeEnabled();

		await page.locator("[data-test='add-to-cart-sauce-labs-backpack']").click();

		await expect(
			page.locator("[data-test='remove-sauce-labs-backpack']") //done
		).toBeEnabled();

		await expect(
			page.locator("[data-test='remove-sauce-labs-backpack']") // done
		).toContainText("Remove");

		await expect(
			page.locator("[data-test='shopping-cart-badge']")
		).toContainText("1");
	});

	test("navigate and edit cart", async ({ page }) => {
		//add backpack
		await page.locator("[data-test='add-to-cart-sauce-labs-backpack']").click();

		//add onesie
		await page.locator("[data-test='add-to-cart-sauce-labs-onesie']").click();

		// open cart shopping-cart-link
		await page.locator("[data-test='shopping-cart-link']").click(); //done

		// check title
		await expect(page.locator("[data-test='title']")).toHaveText("Your Cart"); // done

		// remove item
		await page.locator("[data-test='remove-sauce-labs-backpack']").click();

		// back to main
		await page.locator("[data-test='continue-shopping']").click(); // done

		// check if item was removed
		await expect(
			page.locator("[data-test='add-to-cart-sauce-labs-backpack']")
		).toHaveText("Add to cart");
	});
});
