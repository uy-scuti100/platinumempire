import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Layemi Threads",
		short_name: "PFH",
		description:
			"Discover unparalleled style at Layemi Threads, your go-to destination for cutting-edge fashion trends and timeless classics. Immerse yourself in a world where elegance meets innovation. Explore our curated collections and redefine your wardrobe with the latest must-haves. Elevate your fashion journey with Layemi Threads – where every click unveils a new dimension of style. Your fashion, your statement. #FashionForward #PlatinumStyle",
		start_url: "/",
		display: "standalone",
		background_color: "#FFE793",
		theme_color: "#FFE4E1",
		icons: [
			{
				src: "/icon-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/icon-512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
	};
}
