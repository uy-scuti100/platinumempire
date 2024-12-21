import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
	S.list()
		.title("Platinum Fashion Hub Admin Dashboard")
		.items([
			S.documentTypeListItem("products").title("Products"),
			S.divider(),
			S.documentTypeListItem("category").title("Categories"),
			S.divider(),
			S.documentTypeListItem("clotheType").title("Clothe Types"),
			S.divider(),
			S.documentTypeListItem("clotheSize").title("Clothe Sizes"),
			S.documentTypeListItem("shoeSize").title("Shoe Sizes"),
			S.documentTypeListItem("bagSize").title("Bag Sizes"),
			S.documentTypeListItem("accessorySize").title("Accessory Sizes"),

			...S.documentTypeListItems().filter(
				(item) =>
					item.getId() &&
					![
						"products",
						"category",
						"clotheSize",
						"shoeSize",
						"bagSize",
						"clotheType",
						"accessorySize",
					].includes(item.getId()!)
			),
		]);
