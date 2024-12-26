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
	name: "Platinum Fashion Hub",
	url: "https://mozack.vercel.app",
	ogImage:
		"https://i.pinimg.com/736x/9e/4a/8c/9e4a8c3df22bba32f180d5c6c880c0bd.jpg",

	description:
		"Discover unparalleled style at Platinum Fashion Hub, your go-to destination for cutting-edge fashion trends and timeless classics. Immerse yourself in a world where elegance meets innovation. Explore our curated collections and redefine your wardrobe with the latest must-haves. Elevate your fashion journey with Platinum Fashion Hub – where every click unveils a new dimension of style. Your fashion, your statement. #FashionForward #PlatinumStyle",
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
