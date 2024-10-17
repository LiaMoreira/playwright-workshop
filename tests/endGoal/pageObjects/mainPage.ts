import type { Page } from "@playwright/test";

export class mainPage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	getItem() {
		return this.page.locator("[data-test='inventory-item']");
	}

	getItemPosition(position: number) {
		return this.page.locator("[data-test='inventory-item']").nth(position);
	}

	getItemName() {
		return this.page.locator("[data-test='inventory-item-name']");
	}

	getAppTitle() {
		return this.page.locator(".app_logo");
	}

	getCartBadge() {
		return this.page.locator("[data-test='shopping-cart-badge']");
	}

	getAddItemButton(itemName) {
		return this.page.locator(`[data-test='add-to-cart-${itemName}']`);
	}

	getRemoveItemButton(itemName) {
		return this.page.locator(`[data-test='remove-${itemName}']`);
	}

	getCartLink() {
		return this.page.locator("[data-test='shopping-cart-link']");
	}
}
