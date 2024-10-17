import { test as base } from "@playwright/test";
import { cart } from "../pageObjects/cart";

// correlates the type of the fixture with the page object
type cartFixture = {
	carttest: cart;
};

// to add the new fixture to the block of pre existent ones
export const cartFixtureTest = base.extend<cartFixture>({
	// define our fixture
    // this is our fixture name
	carttest: async ({ page }, use) => {
		// this block will run before any test, just like the before hook
		// create a new context
        // this is the context we need to use for the tests
		const cartTest = new cart(page);

		// execution
		await use(cartTest);

		// this block will run after the tests, like an after hook
	},
});
