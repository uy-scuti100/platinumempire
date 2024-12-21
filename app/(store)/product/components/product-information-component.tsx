"use client";

import { IProduct } from "@/actions";
import { formatPriceInNaira, useDiscountedPrice } from "@/lib/utils";
import LinkComponent from "./link-component";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Prose from "./prose";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store/cart";

export default function ProductInformationComponent({
	product,
	isMobile,
}: {
	product: IProduct;
	isMobile: boolean;
}) {
	const searchParams = useSearchParams();
	const addToCart = useStore((state) => state.addToCart);

	const sizeTypes = [
		"clotheSizes",
		"shoeSizes",
		"bagSizes",
		"accessorySizes",
	] as const;
	const sizeType = sizeTypes.find((type) => (product?.[type]?.length ?? 0) > 0);
	const productSizes = sizeType ? product[sizeType] || "" : "";

	// Retrieve selected params for size and color
	const selectedSize = searchParams.get(sizeType || "") ?? "";
	const selectedColor = searchParams.get("color") ?? "";

	const [color, setColor] = useState<string>(selectedColor);
	const [size, setSize] = useState<string>(selectedSize);

	const discountPercentage = useDiscountedPrice(
		product?.price ?? 0,
		product?.discountedPrice ?? 0
	);
	const isOnSale = product?.onSale;
	const isInStock = product?.inStock ?? false;
	const canAddToCart =
		isInStock && size && (product.color?.length ? color : true);

	// Synchronize state with URL params
	useEffect(() => {
		setColor(selectedColor);
		setSize(selectedSize);
	}, [selectedColor, selectedSize]);

	const handleAddToCart = () => {
		if (!canAddToCart) {
			alert("Please select Size and Color");
			return;
		}
		addToCart({
			_id: product._id,
			name: product.name,
			slug: product.slug,
			image: product.imageUrls[0], // Assuming first image is main image
			price: isOnSale ? Number(product.discountedPrice) : Number(product.price),
			quantity: 1,
			selectedSize: size,
			selectedColor: color,
			inStock: isInStock,
		});
		// / Automatically open the cart tray
		useStore.getState().openCart();
	};

	return (
		<div className={`px-4 cols-span-1 ${!isMobile && "mt-0"}`}>
			{isOnSale && (
				<div className="">
					<p>
						<span className="text-xs font-light md:text-sm text-custom-hover">
							On Sale
						</span>
					</p>
				</div>
			)}
			<h1 className="text-xl font-medium text-black capitalize md:text-2xl line-clamp-1">
				{product?.name}
			</h1>
			{isOnSale ? (
				<div className="mt-2 tracking-wider">
					<span className="text-[#808080] line-through text-sm mr-2">
						{formatPriceInNaira(Number(product.price))}
					</span>
					<span className="text-[#1c1c1c] text-sm font-semibold ">
						{formatPriceInNaira(Number(product.discountedPrice))}
					</span>
					<span className="ml-2 text-sm text-custom-hover">
						{discountPercentage}% off
					</span>
				</div>
			) : (
				<div className="mt-2">
					<span className="text-[#1c1c1c] text-sm font-semibold ">
						{formatPriceInNaira(Number(product.price))}
					</span>
				</div>
			)}
			<div className="mt-4">
				<div className="pb-2">
					<p className=" text-sm text-[#808080] pb-2"> Sizes:</p>
					<div className="flex flex-wrap items-center gap-3 pb-4 text-sm font-light">
						{Array.isArray(productSizes) &&
							productSizes.length > 0 &&
							productSizes.map((size: string, i: number) => (
								<div key={i} className="rounded-none">
									<LinkComponent
										param={sizeType || ""}
										href={size}
										variant={selectedSize === size ? "default" : "outline"}
										className="w-full font-light capitalize rounded-full"
									>
										{size}
									</LinkComponent>
								</div>
							))}
					</div>
					<p className=" text-sm text-[#808080] pb-2"> Colors:</p>
					<div className="flex flex-wrap items-center gap-3 pb-4 text-sm font-light">
						{Array.isArray(product?.color) &&
							product?.color.length > 0 &&
							product.color.map((color: string, i: number) => (
								<div key={i} className="rounded-none">
									<LinkComponent
										param="color"
										href={color}
										variant={selectedColor === color ? "default" : "outline"}
										className="w-full font-light capitalize rounded-full"
									>
										{color}
									</LinkComponent>
								</div>
							))}
					</div>
				</div>
			</div>
			{/* description */}
			<div className="mt-4">
				<div>
					<Prose html={product.description} />
				</div>
			</div>
			{/* // add to cart button */}
			<div className="mt-6">
				<Button
					onClick={handleAddToCart}
					disabled={!isInStock}
					className="w-full py-6 text-sm font-semibold capitalize rounded-none"
				>
					{isInStock ? "Add to Cart" : "Out of Stock"}
				</Button>
			</div>
		</div>
	);
}
