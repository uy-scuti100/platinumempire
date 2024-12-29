import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
	S.list()
		.title("Layemi Threads Admin Dashboard")
		.items([
			S.documentTypeListItem("products").title("Products"),
			S.divider(),
			S.documentTypeListItem("category").title("Categories"),
			S.divider(),
			S.documentTypeListItem("clotheType").title("Clothe Types"),
			S.divider(),
			S.documentTypeListItem("clotheSize").title("Clothe Sizes"),
			S.documentTypeListItem("bagSize").title("Bag Sizes"),
			S.documentTypeListItem("accessorySize").title("Accessory Sizes"),
			S.divider(),
			S.documentTypeListItem("stockRequest").title("Stock Requests"),
			S.divider(),
			S.documentTypeListItem("order").title("Orders"),
			S.divider(),
			S.documentTypeListItem("state").title("Shipping"),
			S.divider(),
			S.documentTypeListItem("country").title("Countries"),

			...S.documentTypeListItems().filter(
				(item) =>
					item.getId() &&
					![
						"products",
						"category",
						"clotheSize",
						"bagSize",
						"clotheType",
						"accessorySize",
						"stockRequest",
						"order",
						"state",
						"country",
					].includes(item.getId()!)
			),
		]);
