"use client";

import { IProduct, notifyWhenInStock } from "@/actions/products";
import ConfettiSuccess from "@/components/globalcomponents/confetti";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useStore } from "@/lib/store/cart";
import { formatPriceInNaira, useDiscountedPrice } from "@/lib/utils";
import { PlusIcon, Share } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import LinkComponent from "./link-component";
import Prose from "./prose";
import { SizeChart } from "./size-chart";

const generateAllShoeSizes = () => Array.from({ length: 12 }, (_, i) => i + 37);

export default function ProductInformationComponent({
	product,
}: {
	product: IProduct;
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

	const selectedSize = searchParams.get(sizeType || "") ?? "";
	const selectedColor = searchParams.get("color") ?? "";

	const canShowJeanSizes =
		product.clotheTypes?.includes("Trousers") && product.gender === "men";
	// Size handling logic
	const productSizes =
		sizeType === "shoeSizes"
			? generateAllShoeSizes()
			: sizeType
				? product[sizeType as keyof IProduct] || []
				: [];

	const availableSizes =
		sizeType === "shoeSizes"
			? ((product.shoeSizes || []) as number[])
			: (productSizes as string[]);

	const [color, setColor] = useState(selectedColor);
	const [size, setSize] = useState(selectedSize);
	const [errorState, setErrorState] = useState(false);
	const [isWhatsApp, setIsWhatsApp] = useState(false);
	const [notifyState, notifyAction, isPending] = useActionState(
		notifyWhenInStock,
		null
	);

	const discountPercentage = useDiscountedPrice(
		product?.price ?? 0,
		product?.discountedPrice ?? 0
	);
	const isOnSale = product?.onSale;
	const isInStock = product?.inStock ?? false;
	const canAddToCart =
		isInStock && size && (product.color?.length ? color : true);

	useEffect(() => {
		setColor(selectedColor);
		setSize(selectedSize);
	}, [selectedColor, selectedSize]);

	useEffect(() => {
		if (!errorState) return;
		const timeoutId = setTimeout(() => setErrorState(false), 2000);
		return () => clearTimeout(timeoutId);
	}, [errorState]);

	const handleShare = () => {
		if (navigator.share) {
			navigator.share({
				title: `${product.name} | Platinum fashion hub`,
				text: `Check out this product: ${product.name}`,
				url: window.location.href,
			});
		} else {
			alert("Sharing is not supported in this browser.");
		}
	};

	const handleAddToCart = () => {
		if (!canAddToCart) {
			setErrorState(true);
			return;
		}
		addToCart({
			_id: product._id,
			name: product.name,
			slug: product.slug,
			image: product.imageUrls[0],
			price: isOnSale ? Number(product.discountedPrice) : Number(product.price),
			quantity: 1,
			selectedSize: size,
			selectedColor: color,
			inStock: isInStock,
		});
		useStore.getState().openCart();
	};

	return (
		<div className="mt-4 cols-span-1 md:mt-0">
			{isOnSale && (
				<p>
					<span className="text-sm font-medium text-custom-hover">On Sale</span>
				</p>
			)}
			<h1 className="mb-3 text-2xl font-semibold text-black capitalize md:text-3xl line-clamp-2">
				{product?.name}
			</h1>

			<div className="mb-4 tracking-wider">
				{isOnSale ? (
					<div className="flex justify-between items-center w-full">
						<div>
							<span className="text-[#808080] line-through text-base mr-2">
								{formatPriceInNaira(Number(product.price))}
							</span>
							<span className="text-[#1c1c1c] text-xl font-bold">
								{formatPriceInNaira(Number(product.discountedPrice))}
							</span>
							<span className="ml-2 text-sm text-custom font-bold">
								{discountPercentage}% off
							</span>
						</div>

						<Button
							variant={"link"}
							className="flex items-center"
							onClick={handleShare}
						>
							<Share className="h-4 w-4 mr-2" />
							Share
						</Button>
					</div>
				) : (
					<div className="flex justify-between items-center w-full">
						<span className="text-[#1c1c1c] text-xl font-bold">
							{formatPriceInNaira(Number(product.price))}
						</span>
						<Button
							variant={"link"}
							className="flex items-center"
							onClick={handleShare}
						>
							<Share className="h-4 w-4 mr-2" />
							Share
						</Button>
					</div>
				)}
			</div>

			<div className="mb-6">
				<div className="pb-4">
					<div className="flex justify-between items-center gap-3 text-sm w-full">
						<p className="text-base text-[#808080] pb-2 font-medium">Sizes:</p>
						{canShowJeanSizes && (
							<div>
								<SizeChart />
							</div>
						)}
					</div>
					<div className="flex flex-wrap items-center gap-3 pb-4 text-sm">
						{Array.isArray(productSizes) &&
							productSizes.length > 0 &&
							productSizes.map((size, i) => {
								const isShoeSize = sizeType === "shoeSizes";
								const isSizeAvailable = isShoeSize
									? (availableSizes as number[]).includes(Number(size))
									: true;

								return (
									<div key={i} className="rounded-none">
										<LinkComponent
											disabled={!isInStock || (isShoeSize && !isSizeAvailable)}
											param={sizeType || ""}
											href={String(size)}
											variant={
												selectedSize === String(size) ? "default" : "outline"
											}
											className={`w-full capitalize rounded-none  relative
    ${(!isInStock || (isShoeSize && !isSizeAvailable)) && "opacity-50"}
    ${isShoeSize && !isSizeAvailable && "button-slant-line-through"} 
    ${errorState ? "border-[#DA0205] animate-pulse duration-300" : ""}
  `}
										>
											{size}
										</LinkComponent>
									</div>
								);
							})}
					</div>

					{Array.isArray(product?.color) && (
						<>
							<p className="text-base text-[#808080] pb-2 font-medium">
								Colors:
							</p>
							<div className="flex flex-wrap items-center gap-3 pb-4 text-sm">
								{product.color
									.filter((color) => color.trim())
									.map((color: string, i: number) => (
										<div key={i} className="rounded-none">
											<LinkComponent
												param="color"
												disabled={!isInStock}
												href={color}
												variant={
													selectedColor === color ? "default" : "outline"
												}
												className={`w-full capitalize rounded-none  
                        ${!isInStock && "opacity-50"}
                        ${errorState ? "border-[#DA0205] animate-pulse duration-300" : ""}
                      `}
											>
												{color}
											</LinkComponent>
										</div>
									))}
							</div>
						</>
					)}
				</div>

				<div className="mb-6 bg-[#F1F1F1] p-4">
					<h2 className="mb-2 text-lg font-semibold">Description</h2>
					<div className="text-sm text-gray-600">
						<Prose html={product.description} />
					</div>
				</div>

				{errorState && (
					<div className="mb-4">
						<p className="text-sm text-[#DA0205] font-semibold">
							Please select a size
							{product.color?.length && <span className=""> and color</span>}
						</p>
					</div>
				)}

				{isInStock ? (
					<div className="mt-6">
						<Button
							onClick={handleAddToCart}
							className={`relative w-full py-6 text-base font-semibold flex justify-center tracking-wide capitalize items-center rounded-none  ${
								!canAddToCart && "opacity-50"
							}`}
						>
							<div className="absolute left-0 ml-4">
								<PlusIcon className="h-5" />
							</div>
							Add to Cart
						</Button>
					</div>
				) : (
					<div className="p-4 mt-6 bg-[#F2ECE2] text-[#725f39]">
						<ConfettiSuccess isActive={notifyState?.success ?? false} />
						<h3 className="mb-2 text-lg font-semibold">Out of Stock</h3>
						<p className="mb-3">
							Enter your phone number and we will notify you when it is back in
							stock
						</p>
						<form action={notifyAction}>
							<input type="hidden" name="productId" value={product._id} />
							<Input
								type="tel"
								name="phone"
								placeholder="08012345678"
								className="mb-3 text-base rounded-none  border border-[#CBCBCB]"
								required
							/>

							<div className="flex items-center mb-3 space-x-2">
								<Checkbox
									id="isWhatsApp"
									name="isWhatsApp"
									checked={isWhatsApp}
									className="rounded-none "
									onCheckedChange={(checked) =>
										setIsWhatsApp(checked as boolean)
									}
								/>
								<label
									htmlFor="isWhatsApp"
									className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									This is my WhatsApp number
								</label>
							</div>

							<textarea
								name="message"
								placeholder="Add a note (optional)"
								className="w-full min-h-[100px] border-[#CBCBCB] resize-none p-3 mb-3 border rounded-none  text-base"
							/>

							<Button
								type="submit"
								className="w-full rounded-none  h-[50px] text-base font-semibold tracking-wide capitalize"
								disabled={isPending}
							>
								{isPending ? "Please wait..." : "Notify Me"}
							</Button>
						</form>

						{notifyState && (
							<p
								className={`mt-2 font-bold text-center ${
									notifyState.success
										? "text-green-600"
										: "text-red-600 text-sm"
								}`}
							>
								{notifyState.message}
							</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
