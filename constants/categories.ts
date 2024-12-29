export interface InfoProp {
	image: any;
	text: string;
	param?: {
		gender?: string;
		category?: string;
		clotheType?: string;
	};
}

import men2piece from "../public/222piece.jpg";
import menshoodies from "../public/men-hoodie.png";
import mensdenim from "../public/mensdenim2.jpg";
import menshirt from "../public/menShirt.jpg";
import mensshort from "../public/mensshort.jpg";
import menstrouser from "../public/menstrouser.jpg";
import menshoe from "../public/messhoe.jpg";

import gown from "../public/gown.jpg";
import lingerie from "../public/lingerie.jpg";
import women2piece from "../public/women2piece.jpg";
import womenbikini from "../public/womenbikinini.jpg";
import womendenim from "../public/womendenim.jpg";
import womenstrouser from "../public/womenstrouser.jpg";
import womentop from "../public/womentop.jpg";
import wsh from "../public/wsh.jpg";

export const menCategories: InfoProp[] = [
	{
		image: menshirt,
		text: "Tops/Shirts",
		param: {
			gender: "men",
			category: "wears",
			clotheType: "Shirts",
		},
	},
	{
		image: menstrouser,
		text: "Trousers",
		param: {
			gender: "men",
			category: "wears",
			clotheType: "Trousers",
		},
	},
	{
		image: menshoodies,
		text: "Hoodies",
		param: {
			gender: "men",
			category: "wears",
			clotheType: "Hoodies",
		},
	},
	{
		image: mensdenim,
		text: "Jackets",
		param: {
			gender: "men",
			category: "wears",
			clotheType: "Jackets",
		},
	},
	{
		image: men2piece,
		text: "2 Piece",
		param: {
			gender: "men",
			category: "wears",
			clotheType: "2Piece",
		},
	},
	{
		image: mensshort,
		text: "Shorts",
		param: {
			gender: "men",
			category: "wears",
			clotheType: "Shorts",
		},
	},
	{
		image: menshoe,
		text: "Shoes",
		param: {
			gender: "men",
			category: "shoes",
		},
	},
];
export const wommenCategories: InfoProp[] = [
	{
		image: womentop,
		text: "Tops",
		param: {
			gender: "women",
			category: "wears",
			clotheType: "Tops",
		},
	},
	{
		image: womenstrouser,
		text: "Trousers/Cargopants",
		param: {
			gender: "women",
			category: "wears",
			clotheType: "Cargopants",
		},
	},
	{
		image: gown,
		text: "Gowns",
		param: {
			gender: "women",
			category: "wears",
			clotheType: "Gowns",
		},
	},
	{
		image: women2piece,
		text: "Two Piece",
		param: {
			gender: "women",
			category: "wears",
			clotheType: "2Piece",
		},
	},
	{
		image: womendenim,
		text: "Denim Jackets",
		param: {
			gender: "women",
			category: "wears",
			clotheType: "Jackets",
		},
	},
	{
		image: womenbikini,
		text: "Bikini",
		param: {
			gender: "women",
			category: "wears",
			clotheType: "Bikini",
		},
	},
	{
		image: lingerie,
		text: "Lingerie",
		param: {
			gender: "women",
			category: "wears",
			clotheType: "Lingerie",
		},
	},
	{
		image: wsh,
		text: "Shoes",
		param: {
			gender: "women",
			category: "shoes",
		},
	},
];
interface SideBarLinksProp {
	title: string;
	links: {
		title: string;
		link: string;
		category?: string;
		type?: string;
	}[];
}
export const SIDEBARLINKS = [
	{
		title: "NEW IN",
		links: [
			{
				title: "wears",
				type: true,
			},
			{
				title: "shoes",
				type: true,
			},
			{
				title: "bags",
				type: true,
			},
			{
				title: "accessories",
				type: true,
			},
		],
	},

	{
		title: "UNISEX",
		links: [
			{
				gender: "unisex",
				title: "wears",
			},
			{
				gender: "unisex",
				title: "shoes",
			},
			{
				gender: "unisex",
				title: "bags",
			},
			{
				gender: "unisex",
				title: "accessories",
			},
		],
	},

	{
		title: "MALE",
		links: [
			{
				gender: "men",
				title: "wears",
			},
			{
				gender: "men",
				title: "shoes",
				category: "shoes",
			},
			{
				gender: "men",
				title: "bags",
				category: "bags",
			},
			{
				gender: "men",
				title: "accessories",
				category: "accessories",
			},
		],
	},
	{
		title: "FEMALE",
		links: [
			{
				gender: "women",
				title: "wears",
			},
			{
				gender: "women",
				title: "shoes",
			},
			{
				gender: "women",
				title: "bags",
			},
			{
				gender: "women",
				title: "accessories",
			},
		],
	},
	{
		title: "ON SALE",
		links: [
			{
				title: "wears",
				sale: true,
			},
			{
				title: "shoes",
				sale: true,
			},
			{
				title: "bags",
				sale: true,
			},
			{
				title: "accessories",
				sale: true,
			},
		],
	},
];
