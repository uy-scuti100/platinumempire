"use client";

import { ICartProduct, useStore } from "@/lib/store/cart";
import { formatPriceInNaira } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import clsx from "clsx";
import { MinusIcon, PlusIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartProducts() {
	const cart = useStore((state) => state.cart);
	const removeFromCart = useStore((state) => state.removeFromCart);
	const increaseQuantity = useStore((state) => state.increaseQuantity);
	const decreaseQuantity = useStore((state) => state.decreaseQuantity);
	const toggleCart = useStore((state) => state.toggleCart);

	return (
		<menu className="flex flex-col space-y-6">
			{cart.length > 0 &&
				cart.map((item: ICartProduct, i) => {
					const {
						_id,
						name,
						slug,
						image,
						price,
						quantity,
						selectedSize,
						selectedColor,
					} = item;
					const newPrice = (price * quantity).toFixed(2);

					return (
						<li
							key={_id + i}
							className="flex flex-col w-full border-b border-neutral-300 "
						>
							<div className="relative flex flex-row justify-between w-full px-1 py-4">
								<div className="absolute z-40 -mt-2 -ml-1">
									<DeleteItemButton
										action={() =>
											removeFromCart(_id, selectedSize, selectedColor)
										}
									/>
								</div>
								<div className="flex flex-row">
									<div className="relative w-[64px] h-[64px] overflow-hidden border rounded-md border-neutral-300">
										<Image
											src={urlFor(image).url()}
											fill
											loading="lazy"
											alt={name}
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											className="object-cover w-full h-full "
										/>
									</div>
									<Link
										href={`/product/${slug}`}
										onClick={toggleCart}
										className="z-30 flex flex-row ml-2 space-x-4"
									>
										<div className="flex flex-col flex-1 text-base">
											<span className="leading-tight line-clamp-1">{name}</span>
											<div className="text-sm text-neutral-500">
												{selectedColor && (
													<span className="text-sm capitalize">
														{selectedColor}
													</span>
												)}
												{selectedColor && <span> / </span>}
												{selectedSize && (
													<span className="text-sm">{selectedSize}</span>
												)}
											</div>
										</div>
									</Link>
								</div>

								<div className="flex flex-col justify-between h-16">
									<div className="flex flex-col items-end">
										<h3 className="flex justify-end mr-1 space-y-2 text-sm text-right">
											{formatPriceInNaira(Number(newPrice))}
										</h3>
									</div>
									<div className="flex flex-row items-center ml-auto">
										<div className="flex flex-row items-center ml-auto border rounded-full h-9 border-neutral-200 dark:border-neutral-700">
											<EditItemQuantityButton
												type="minus"
												action={() =>
													decreaseQuantity(_id, selectedSize, selectedColor)
												}
											/>
											<p className="w-6 text-center">
												<span className="w-full text-sm">{quantity}</span>
											</p>
											<EditItemQuantityButton
												type="plus"
												action={() =>
													increaseQuantity(_id, selectedSize, selectedColor)
												}
											/>
										</div>
									</div>
								</div>
							</div>
						</li>
					);
				})}
		</menu>
	);
}

function EditItemQuantityButton({
	type,
	action,
}: {
	type: "plus" | "minus";
	action: () => void;
}) {
	return (
		<button
			type="button"
			aria-label={
				type === "plus" ? "Increase item quantity" : "Reduce item quantity"
			}
			className={clsx(
				"ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80",
				{
					"ml-auto": type === "minus",
				}
			)}
			onClick={action}
		>
			{type === "plus" ? (
				<PlusIcon className="w-4 h-4" />
			) : (
				<MinusIcon className="w-4 h-4" />
			)}
		</button>
	);
}

const DeleteItemButton = ({ action }: { action: () => void }) => {
	return (
		<button
			type="submit"
			aria-label="Remove cart item"
			className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-neutral-500"
			onClick={action}
		>
			<X className="mx-[1px] h-4 w-4 text-white dark:text-black" />
		</button>
	);
};
