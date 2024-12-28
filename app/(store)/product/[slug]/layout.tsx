import { fetchProductBySlug } from "@/actions/products";
import { siteConfig } from "@/lib/utils";
import { QueryClient } from "@tanstack/react-query";
export type paramsType = Promise<{ slug: string }>;

export async function generateMetadata({
	params,
}: {
	params: paramsType;
}): Promise<{ [key: string]: any } | undefined> {
	const { slug } = await params;
	const queryClient = new QueryClient();
	const product = await queryClient.fetchQuery({
		queryKey: ["SINGLE_PRODUCT", slug],
		queryFn: () => fetchProductBySlug(slug as string),
	});

	if (product) {
		const categories = product.categories;
		const name = product.name;
		const type = product.clotheTypes;
		const color = product.color;
		const desc = product.description;
		const slug = product.slug;
		const imageUrls = product.imageUrls;

		const keywords: string[] = [];
		if (categories && name && type && color && desc && slug) {
			keywords.push(
				...(categories?.flat() ?? []),
				name,
				...(type?.flat() ?? []),
				...(color?.flat() ?? []),
				desc,
				slug
			);
		}
		return {
			title: `${name.charAt(0).toUpperCase() + name.slice(1)}`,
			metadataBase: new URL(siteConfig.url),
			description: desc,
			keywords,
			openGraph: {
				type: "website",
				locale: "en_US",
				url: `${siteConfig.url}/product/${slug}`,
				title: name,
				description: desc,
				siteName: siteConfig.name,
				images: [{ url: imageUrls[0], width: 1200, height: 630, alt: name }],
			},
			twitter: {
				card: "summary_large_image",
				site: "@hussain_joe",
				creator: "@hussain_joe",
				title: `${name.charAt(0).toUpperCase() + name.slice(1)}`,
				description: desc,
				images: [{ url: imageUrls[0], width: 1200, height: 630, alt: name }],
			},
		};
	}
}
export default async function SingleProductLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <main>{children}</main>;
}

// {Array.isArray(imageUrls) && imageUrls > 0 imageUrls.map((image, i => {url: image, width: 1200, height: 630, alt: name )}
// image: [
// 	Array.isArray(imageUrls) &&
// 		imageUrls.length > 0 &&
// 		imageUrls.map((img, i) => {
// 			url: img;
// 		}),
// ],
