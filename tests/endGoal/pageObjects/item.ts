import type { Page } from "@playwright/test";

export class item {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	getAddButton() {
		return this.page.locator("[data-test='add-to-cart']");
	}

	getRemoveButton() {
		return this.page.locator("[data-test='remove']");
	}
}
