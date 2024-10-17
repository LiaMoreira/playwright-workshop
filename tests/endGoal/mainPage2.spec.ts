import { expect } from "@playwright/test";
import { mainPageFixtureTest } from "./fixtures/mainPageFixture";
import { loginFixtureTest } from "./fixtures/loginFixture";
import { login } from "./pageObjects/login";

mainPageFixtureTest.describe("Main page", async () => {
	// we can still use the beforeEach hook
    //option 1, define the login fixture inside the mainPage function and call it
	mainPageFixtureTest.beforeEach(async ({ page, logintest }) => {
		await page.goto("/");

		//option 1, using the fixture
		await logintest.login("standard_user", "secret_sauce");

		//option 2 , using the pageObject directly
		const newLogin = new login(page);
		await newLogin.login("standard_user", "secret_sauce");
	});

    // defining a function for our login fixture and call it here
    // as we can see we can use nested fixtures ( see notes )
    loginFixtureTest.beforeEach(async ({ logintest }) => {
        logintest.login("standard_user", "secret_sauce")
    })

	// we need to use our new function instead of the test function
	// we need to use our new fixture instead of the page one
	mainPageFixtureTest("Validate page", async ({ mainPagetest }) => {
		// now we have access to all the methods
		await expect(mainPagetest.getAppTitle()).toHaveText("Swag Labs");

		await expect(mainPagetest.getItem()).toHaveCount(6);
	});

    // here we need to have the item fxture define inside the mainPageFixtureTest funcion and then call it on the props object
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
