import { IProduct } from "@/actions";
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
export const toBase64 = (str: string) =>
	typeof window === "undefined"
		? Buffer.from(str).toString("base64")
		: window.btoa(str);

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

export const srConfig = (delay: number = 100, viewFactor: number = 0.25) => ({
	origin: "bottom",
	distance: "100px",
	duration: 500,
	delay,
	rotate: { x: 0, y: 0, z: 0 },
	opacity: 0,
	scale: 1,
	easing: "cubic-bezier(0.645, 0.045, 0.355, 1)",
	mobile: true,
	reset: false,
	useDelay: "always",
	viewFactor,
	viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
});

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

// const revealContainer = useRef<HTMLDivElement | null>(null);

// // Call the hook at the top level of the component
// const prefersReducedMotion = usePrefersReducedMotion();

// useEffect(() => {
//     if (prefersReducedMotion) {
//         return;
//     }

//     if (revealContainer.current && sr) {
//         sr.reveal(revealContainer.current, srConfig());
//     }
// }, [prefersReducedMotion]);
