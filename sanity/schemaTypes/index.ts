import { type SchemaTypeDefinition } from "sanity";

import { categorySchema } from "./categoriesType";
import { productSchema } from "./productType";
import { clotheSizeSchema } from "./clotheSizeType";
import { shoeSizeSchema } from "./shoeSizeType";
import { bagSizeSchema } from "./bagSizeType";
import { clotheTypeSchema } from "./clotheType";
import { accessorySizeSchema } from "./accessorySizeType";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		categorySchema,
		productSchema,
		clotheSizeSchema,
		shoeSizeSchema,
		bagSizeSchema,
		clotheTypeSchema,
		accessorySizeSchema,
	],
};
