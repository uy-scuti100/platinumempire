// export interface Product {
// 	_id?: string;
// 	name: string;
// 	slug: string;
// 	gender: "Male" | "Female" | "Unisex";
// 	description?: string;
// 	images: Image[];
// 	price: number;
// 	categories: "Clothings" | "Shoes" | "Bags" | "Accessories";
// 	shoeTypes?: ShoeTypeReference[];
// 	bagTypes?: BagTypeReference[];
// 	clotheTypes?: ClotheTypeReference[];
// 	accessoryTypes?: AccessoryTypeReference[];
// 	clotheSizes?: ClotheSize[];
// 	ShoeSizes?: ShoeSize[];
// 	BagSizes?: BagSize[];
// 	accessorySizes?: AccessorySize[];
// 	colors: ColorReference[];
// 	isNew: boolean;
// 	onSale: boolean;
// 	inStock: boolean;
// 	discountedPrice?: number;
// 	_createdAt: any;
// }

type AccessorySize = {
	_id: string;
	name: string;
};
type ClotheSize = {
	_id: string;
	name: string;
};
type ShoeSize = {
	_id: string;
	name: string;
};
type BagSize = {
	_id: string;
	name: string;
};
type ShoeTypeReference = {
	_id: string;
	name: string;
};

type BagTypeReference = {
	_id: string;
	name: string;
};

type ClotheTypeReference = {
	_id: string;
	name: string;
};

type AccessoryTypeReference = {
	_id: string;
	name: string;
};

type ColorReference = {
	_id: string;
	value: string;
	name: string;
	_type: "color";
};
