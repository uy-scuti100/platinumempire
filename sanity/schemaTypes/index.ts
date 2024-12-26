import { type SchemaTypeDefinition } from "sanity";

import { accessorySizeSchema } from "./accessorySizeType";
import { bagSizeSchema } from "./bagSizeType";
import { categorySchema } from "./categoriesType";
import { clotheSizeSchema } from "./clotheSizeType";
import { clotheTypeSchema } from "./clotheType";
import { countrySchema } from "./countries";
import { orderSchema } from "./order";
import { productSchema } from "./productType";
import { shippingSchema } from "./shipping";
// import { shoeSizeSchema } from "./shoeSizeType";
import { stockRequestSchema } from "./stockRequset";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		categorySchema,
		productSchema,
		clotheSizeSchema,
		// shoeSizeSchema,
		bagSizeSchema,
		clotheTypeSchema,
		accessorySizeSchema,
		stockRequestSchema,
		orderSchema,
		shippingSchema,
		countrySchema,
	],
};
