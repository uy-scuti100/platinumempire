"use server";
import { shuffleArray } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";

export interface IProduct {
	_id: string;
	name: string;
	slug: string;
	color: string[];
	description: string;
	categories: string[];
	price: number;
	isNew: boolean;
	onSale: boolean;
	inStock: boolean;
	discountedPrice: number;
	_createdAt: string;
	imageUrls: string[];
	lqips: string[];
	clotheTypes?: string[];
	bagSizes?: string[];
	shoeSizes?: (37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48)[]; // Updated to enforce sizes 37-48
	accessorySizes?: string[];
	clotheSizes?: string[];
}

// Fetch All Poducts
export async function fetchAllProducts(
	query: string,
	start: number = 0,
	limit: number = 12
): Promise<{ products: IProduct[]; totalCount: number }> {
	const COUNT_QUERY = `
    count(${query})
  `;
	const ALL_PRODUCTS_QUERY = `
      ${query}[${start}...${start + limit}] {
        _id,
        name,
        "slug": slug.current,
        "categories": categories[]->name,
        "lqips": images[].asset->metadata.lqip,
        price,
        isNew,
        onSale,
        inStock,
        discountedPrice,
        _createdAt,
        "imageUrls": images[].asset->url,
      }
    `;

	try {
		const [totalCount, products] = await Promise.all([
			client.fetch<number>(COUNT_QUERY),
			client.fetch<IProduct[]>(ALL_PRODUCTS_QUERY),
		]);

		const shuffledProducts = shuffleArray(products as IProduct[]);
		return { products: shuffledProducts || [], totalCount: totalCount || 0 };
	} catch (error) {
		console.error("Error fetching products:", error);
		return { products: [], totalCount: 0 };
	}
}

// Fetch Related Products
export const fetchRelatedProducts = async (
	slug: string,
	clotheTypes: string[],
	categories: string[],
	price: number
) => {
	const CATEGORY_NAMES = categories.map((cat) => `"${cat}"`).join(", ");
	const MIN_PRICE = price * 0.8;
	const MAX_PRICE = price * 1.2;

	const CLOTHES_TYPE_FILTER =
		clotheTypes.length > 0
			? `&& count(clotheTypes[_type == "reference" && references(*[_type == "clotheType" && name in [${clotheTypes.map((type) => `"${type}"`).join(", ")}]]._id)]) > 0`
			: "";

	// Initial query for related products - try to get more than 9 to ensure we have enough
	const RELATED_PRODUCTS_QUERY = `
      *[_type == "products" && slug.current != "${slug}"
        ${CLOTHES_TYPE_FILTER}
        && count(categories[_type == "reference" && references(*[_type == "category" && name in [${CATEGORY_NAMES}]]._id)]) > 0
        && price >= ${MIN_PRICE} && price <= ${MAX_PRICE}
      ] {
        _id,
        name,
        "slug": slug.current,
        price,
        discountedPrice,
        "imageUrls": images[].asset->url,
        "lqips": images[].asset->metadata.lqip
      }[0...12]
    `;

	try {
		let products = await client.fetch<IProduct[]>(RELATED_PRODUCTS_QUERY);

		// If we don't have enough products, fetch more with the fallback query
		if (!products || products.length < 9) {
			const fetchedIds = products?.map((p) => p._id) || [];
			const NEEDED_COUNT = 12; // Fetch a few extra to ensure we have enough

			const FALLBACK_QUERY = `
          *[_type == "products" 
            && slug.current != "${slug}"
            && !(_id in $fetchedIds)
            && count(categories[_type == "reference" && references(*[_type == "category" && name in [${CATEGORY_NAMES}]]._id)]) > 0
          ] | order(_createdAt desc)[0...${NEEDED_COUNT}] {
            _id,
            name,
            "slug": slug.current,
            price,
            discountedPrice,
            "imageUrls": images[].asset->url,
            "lqips": images[].asset->metadata.lqip
          }
        `;

			const fallbackProducts = await client.fetch<IProduct[]>(FALLBACK_QUERY, {
				fetchedIds,
			});

			// Combine products, ensuring no duplicates
			products = [...(products || []), ...fallbackProducts];

			// If we still don't have enough, fetch more without price constraints
			if (products.length < 9) {
				const allFetchedIds = products.map((p) => p._id);
				const FINAL_FALLBACK_QUERY = `
            *[_type == "products" 
              && slug.current != "${slug}"
              && !(_id in $allFetchedIds)
            ] | order(_createdAt desc)[0...${NEEDED_COUNT}] {
              _id,
              name,
              "slug": slug.current,
              price,
              discountedPrice,
              "imageUrls": images[].asset->url,
              "lqips": images[].asset->metadata.lqip
            }
          `;

				const finalFallbackProducts = await client.fetch<IProduct[]>(
					FINAL_FALLBACK_QUERY,
					{ allFetchedIds }
				);
				products = [...products, ...finalFallbackProducts];
			}
		}

		// Return exactly 9 products if we have enough, otherwise return all we found
		return products.slice(0, Math.max(9, products.length));
	} catch (error) {
		console.error("Error fetching related products:", error);
		return [];
	}
};
// Fetch Single product\
export const fetchProductBySlug = async (
	slug: string
): Promise<IProduct | undefined> => {
	const PRODUCT_BY_SLUG_QUERY = defineQuery(`
        *[_type == "products" && slug.current == "${slug}"]{
            _id,
            name,
            "slug": slug.current,
            onSale,
            color,
            isNew,
            inStock,
            discountedPrice,
            price,
            description,
            shoeSizes,
            "categories": categories[]->name,
            "bagSizes": bagSizes[]->name,
            "accessorySizes": accessorySizes[]->name,
            "clotheTypes": clotheTypes[]->name,
            "clotheSizes": clotheSizes[]->name,
            "imageUrls": images[].asset->url,
            "lqips": images[].asset->metadata.lqip,
        }
      `);
	try {
		const products = await client.fetch<IProduct[]>(PRODUCT_BY_SLUG_QUERY);
		return products[0];
	} catch (error) {
		console.error("Error fetching product by slug:", error);
		return undefined;
	}
};

// fetch Two New Products From Each Category To Be USed on The Home Page as Featured products
export const fetchTwoFromEachCategory = async (categories: string[]) => {
	// Single GROQ query to fetch 2 products per category
	const TWO_FROM_EACH_CATEGORY_QUERY = `
    *[_type == "category" && name in $categories ] {
        name,
        "products": *[_type == "products" && isNew == true && references(^._id)]
        | order(_createdAt desc)[0...2] {
            name,
            "slug": slug.current,
            isNew,
            price,
            "imageUrls": images[].asset->url,
            "lqips": images[].asset->metadata.lqip
        }
    }
  `;

	try {
		// Fetch data using the query
		const results = await client.fetch<
			{ name: string; products: IProduct[] }[]
		>(TWO_FROM_EACH_CATEGORY_QUERY, { categories });

		// Flatten the results to combine all products from all categories
		const allProducts = results.flatMap((category) => category.products);

		// Limit the total number of products to 6 (in case there are more)
		const limitedProducts = allProducts.slice(0, 6);

		const shuffledLimitedProducts = shuffleArray(limitedProducts as IProduct[]);

		return shuffledLimitedProducts || [];
	} catch (error) {
		console.error("Error fetching two from each category products:", error);
		return [];
	}
};

// Get all states
export const fetchUpsellProducts = async (
	cartItems: {
		_id: string;
		slug: string;
		name: string;
		price: number;
		selectedColor: string;
		selectedSize: string;
	}[]
) => {
	// Get cart IDs and calculate min/max prices for each item
	const cartIds = cartItems.map((item) => item._id);
	const priceRanges = cartItems.map((item) => ({
		min: item.price * 1.2,
		max: item.price * 1.5,
	}));

	// Create OR conditions for each price range
	const priceRangeConditions = priceRanges
		.map((range) => `(price >= ${range.min} && price <= ${range.max})`)
		.join(" || ");

	const UPSALE_QUERY = `
      *[_type == "products"
        && !(_id in $cartIds)
        && inStock == true
        && (${priceRangeConditions})
      ] | order(price desc)[0...12] {
        _id,
        name,
        "slug": slug.current,
        price,
        discountedPrice,
        "imageUrls": images[].asset->url,
        "lqips": images[].asset->metadata.lqip
      }
    `;

	try {
		const products = await client.fetch<IProduct[]>(UPSALE_QUERY, {
			cartIds: cartIds,
		});

		// If we don't have enough products, fetch some without price constraints
		if (!products || products.length < 6) {
			const FALLBACK_QUERY = `
          *[_type == "products"
            && !(_id in $cartIds)
            && inStock == true
            && price >= ${Math.min(...priceRanges.map((r) => r.min))}
          ] | order(price asc)[0...${12 - (products?.length || 0)}] {
            _id,
            name,
            "slug": slug.current,
            price,
            discountedPrice,
            "imageUrls": images[].asset->url,
            "lqips": images[].asset->metadata.lqip
          }
        `;

			const fallbackProducts = await client.fetch<IProduct[]>(FALLBACK_QUERY, {
				cartIds: cartIds,
			});

			const allProducts = [...(products || []), ...fallbackProducts];
			const shuffledUpsellProducts = shuffleArray(allProducts as IProduct[]);

			return shuffledUpsellProducts;
		}

		return products;
	} catch (error) {
		console.error("Error fetching upsell products:", error);
		return [];
	}
};

export async function notifyWhenInStock(currentState: any, formData: FormData) {
	try {
		const phone = formData.get("phone") as string;
		const isWhatsApp = formData.get("isWhatsApp") === "on";
		const message = formData.get("message") as string;
		const productId = formData.get("productId") as string;

		if (!phone || !productId) {
			return {
				success: false,
				message: "Phone number and product are required.",
			};
		}

		// Validate phone number
		if (!/^\d{11}$/.test(phone)) {
			return {
				success: false,
				message: "Please enter a valid 11-digit phone number.",
			};
		}

		const response = await fetch(
			`https://${process.env.SANITY_STUDIO_PROJECT_ID}.api.sanity.io/${process.env.SANITY_API_VERSION}/data/mutate/${process.env.SANITY_STUDIO_DATASET}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}`,
				},
				body: JSON.stringify({
					mutations: [
						{
							create: {
								_type: "stockRequest",
								product: {
									_type: "reference",
									_ref: productId,
								},
								phone,
								isWhatsApp,
								message: message || undefined,
								status: "pending",
								createdAt: new Date().toISOString(),
							},
						},
					],
				}),
			}
		);
		if (!response.ok) {
			throw new Error("Failed to create stock request");
		}

		return {
			success: true,
			message: "Thank you! We will notify you when this item is back in stock.",
		};
	} catch (error) {
		console.error("Error creating stock request:", error);
		return {
			success: false,
			message: "Something went wrong. Please try again later.",
		};
	}
}
