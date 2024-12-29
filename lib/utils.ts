import { IProduct } from "@/actions/products";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatPriceInNaira = (price: number) => {
	const nairaformnat = new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
		maximumFractionDigits: 0,
	});
	return nairaformnat.format(price);
};
export const formatDate = (date: string) => {
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

export const useDiscountedPrice = (
	productPrice: number,
	discountedPrice: number
) => {
	if (!productPrice && discountedPrice) return 0;
	const discountPercentage =
		productPrice > discountedPrice
			? ((productPrice - discountedPrice) / productPrice) * 100
			: 0;

	return discountPercentage.toFixed();
};

export const siteConfig = {
	name: "Layemi Threads",
	url: "https://platinumempire.vercel.app/",
	ogImage:
		"https://res.cloudinary.com/dsfhfgn4y/image/upload/v1735208754/opengraph-image_dcwmcc.png",
	description:
		"Layemi Threads is your destination for the latest fashion trends and timeless styles. Discover curated collections that elevate your wardrobe and make every outfit a statement. Explore, shop, and define your style with Layemi Threads. #FashionForward #PlatinumStyle",
	links: {
		twitter: "https://twitter.com/hussain_joe",
		github: "https://github.com/uy-scuti100",
	},
};

export const shuffleArray = (array: IProduct[]) => {
	let currentIndex = array.length,
		randomIndex;

	// While there are elements remaining to shuffle
	while (currentIndex !== 0) {
		// Pick a remaining element
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// Swap the current element with the random element
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
};
export const getRandomProducts = (products: IProduct[]) => {
	const shuffledProducts = shuffleArray(products);
	const randomProducts = shuffledProducts.slice(0, 4);
	return randomProducts;
};
export function searchParamsToObject(searchParams: {
	[key: string]: string | string[] | undefined;
}) {
	const params: { [key: string]: string | string[] } = {};

	for (const [key, value] of Object.entries(searchParams)) {
		if (value !== undefined) {
			params[key] = value;
		}
	}

	return params;
}

export async function getFileBlob(url: string) {
	const response = await fetch(url);

	if (!response.ok) {
		if (response.status === 401) {
			throw new Error("UNAUTHORIZED");
		}
		throw new Error("UNKNOWN_ERROR");
	}

	const blob = await response.blob();

	return blob;
}

interface DownloadUrlOptions {
	downloadBlob?: boolean;
}

export async function downloadUrl(
	url: string,
	filename: string = "file",
	options?: DownloadUrlOptions
) {
	const { downloadBlob = true } = options || {};
	let downloadUrl = url;

	if (downloadBlob) {
		const blob = await getFileBlob(url);
		const blobUrl = URL.createObjectURL(blob);
		downloadUrl = blobUrl;
	}

	const a = document.createElement("a");

	a.href = downloadUrl;
	a.download = filename;

	function handleOnClick() {
		setTimeout(() => URL.revokeObjectURL(downloadUrl), 150);
		removeEventListener("click", handleOnClick);
	}

	a.addEventListener("click", handleOnClick, false);

	a.click();
}
