import { defineConfig, defineType } from "sanity";

export const orderSchema = defineType({
	name: "products",
	title: "Products",
	type: "document",
	//@ts-expect-error
	icon: TrolleyIcon,
	fields: [],
});
