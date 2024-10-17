import { test as base } from "@playwright/test";
import { mainPage } from "../pageObjects/mainPage";
import { login } from "../pageObjects/login";
import { cart } from "../pageObjects/cart";
import { item } from "../pageObjects/item";

// correlates the type of the fixture with the page object
type mainPageFixture = {
	mainPagetest: mainPage;
	logintest: login;
	carttest: cart;
	itemtest: item;
};

// to add the new fixture to the block of pre existent ones
export const mainPageFixtureTest = base.extend<mainPageFixture>({
	// define our fixture
	mainPagetest: async ({ page }, use) => {
		// this block will run before any test, just like the before hook
		// create a new context
		const mainPageTest = new mainPage(page);
		const loginTest = new login(page);

		await page.goto("/");
		await loginTest.login("standard_user", "secret_sauce");
		console.log("Hi, I am in");

		// execution
		await use(mainPageTest);

		// this block will run after the tests, like an after hook
		console.log("I am done!");
	},
	// if we need to use methods from this file, we can just add this fixture to our new function
	carttest: async ({ page }, use) => {
		// this block will run before any test, just like the before hook
		// create a new context
		// this is the context we need to use for the tests
		const cartTest = new cart(page);

		// execution
		await use(cartTest);

		// this block will run after the tests, like an after hook
	},
	itemtest: async ({ page }, use) => {
		// this block will run before any test, just like the before hook
		// create a new context
		// this is the context we need to use for the tests
		const itemTest = new item(page);

		// execution
		await use(itemTest);

		// this block will run after the tests, like an after hook
	},
	logintest: async ({ page }, use) => {
		// this block will run before any test, just like the before hook
		// create a new context
		// this is the context we need to use for the tests
		const loginTest = new login(page);

		// execution
		await use(loginTest);

		// this block will run after the tests, like an after hook
	},
});
