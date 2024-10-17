import { test as base } from "@playwright/test";
import { login } from "../pageObjects/login";

// correlates the type of the fixture with the page object
type loginFixture = {
	logintest: login;
};

// to add the new fixture to the block of pre existent ones
export const loginFixtureTest = base.extend<loginFixture>({
	// define our fixture
	// this is our fixture name
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
