import { expect } from "@playwright/test";
import { mainPageFixtureTest } from "./fixtures/mainPageFixture";

mainPageFixtureTest.describe("Main page", async () => {
	// we don't need this anymore, because it's done inside the fixture
	// but in case we need it, we still have this methods available either way

	/*
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
    */

	// we need to use our new function instead of the test function
	// we need to use our new fixture instead of the page one
	mainPageFixtureTest("Validate page", async ({ mainPagetest }) => {
		// now we have access to all the methods
		await expect(mainPagetest.getAppTitle()).toHaveText("Swag Labs");

		await expect(mainPagetest.getItem()).toHaveCount(6);
	});

	mainPageFixtureTest(
		"open an item and add them",
		async ({ mainPagetest, itemtest }) => {
			const item = mainPagetest.getItemPosition(0);

			await item.locator("[data-test='item-4-title-link']").click();

			await expect(mainPagetest.getItemName()).toContainText("Backpack");

			await expect(itemtest.getAddButton()).toBeEnabled();

			await expect(itemtest.getAddButton()).toContainText("Add");

			await itemtest.getAddButton().click();

			await expect(itemtest.getRemoveButton()).toBeEnabled();

			await expect(itemtest.getRemoveButton()).toContainText("Remove");

			await expect(mainPagetest.getCartBadge()).toContainText("1");
		}
	);

	mainPageFixtureTest("add an item to cart", async ({ mainPagetest }) => {
		await expect(
			mainPagetest.getAddItemButton("sauce-labs-backpack")
		).toBeEnabled();

		await mainPagetest.getAddItemButton("sauce-labs-backpack").click();

		await expect(
			mainPagetest.getRemoveItemButton("sauce-labs-backpack")
		).toBeEnabled();

		await expect(
			mainPagetest.getRemoveItemButton("sauce-labs-backpack")
		).toContainText("Remove");

		await expect(mainPagetest.getCartBadge()).toContainText("1");
	});

	mainPageFixtureTest(
		"navigate and edit cart",
		async ({ mainPagetest, carttest }) => {
			//add backpack
			await mainPagetest.getAddItemButton("sauce-labs-backpack").click();

			//add onesie
			await mainPagetest.getAddItemButton("sauce-labs-onesie").click();

			// open cart shopping-cart-link
			await mainPagetest.getCartLink().click();

			// check title
			await expect(carttest.getTitle()).toHaveText("Your Cart");

			// remove item
			await mainPagetest.getRemoveItemButton("sauce-labs-backpack").click();

			// check button text
			await expect(carttest.getContinueButton()).toContainText("Continue");

			// back to main
			await carttest.getContinueButton().click();

			// check if item was removed
			await expect(
				mainPagetest.getAddItemButton("sauce-labs-backpack")
			).toHaveText("Add to cart");
		}
	);
});
