import type { Page } from "@playwright/test";

export class cart {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	getTitle() {
		return this.page.locator("[data-test='title']");
	}

	getContinueButton() {
		return this.page.locator("[data-test='continue-shopping']");
	}
}
