"use client";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Menu({
	isAboveLimit,
	pathname,
}: {
	isAboveLimit: boolean;
	pathname: string;
}) {
	const [open, setOpen] = useState(false);

	const isMobile =
		typeof window !== "undefined" ? window.innerWidth < 768 : false;
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<div className="relative cursor-pointer">
					<HiOutlineMenuAlt4
						size={24}
						className={cn(
							`${isAboveLimit ? "text-black" : "text-white"}`,
							pathname !== "/" && "text-black",
							"duration-500 transition-colors ease-in-out"
						)}
					/>
				</div>
			</SheetTrigger>
			<SheetContent
				side={isMobile ? "bottom" : "left"}
				className="overflow-auto z-[9999]"
			>
				<SheetHeader>
					<SheetTitle className="p-2 mt-8 border border-black">
						<Image
							src="/logo1.png"
							priority
							sizes="(max-width: 480px) 100vw, (max-width: 768px) 85vw, (max-width: 1060px) 75vw, 60vw"
							alt="logo"
							width={300}
							height={300}
							className="h-[65px] md:w-[300px] w-full object-contain"
						/>
					</SheetTitle>
					<SheetDescription className="p-2 font-bold uppercase">
						Exlore our categories of fashion items
					</SheetDescription>
				</SheetHeader>

				<div className="mb-5">
					<Accordion type="single" collapsible className="w-full">
						{SIDEBARLINKS.map((link) => (
							<AccordionItem value={link.title} key={link.title}>
								<AccordionTrigger className="hover:no-underline">
									{link.title}
								</AccordionTrigger>
								<AccordionContent className="">
									<ul className="flex flex-col gap-3 pl-5">
										{link.links?.map((subLink) => (
											<Button
												asChild
												variant={"link"}
												className="inline-block p-0 underline"
												key={subLink.title}
											>
												<Link
													href={{
														pathname: "/products",
														query: {
															...("gender" in subLink && {
																gender: subLink.gender,
															}),
															...("type" in subLink && { isNew: subLink.type }),
															...(subLink.title && {
																categories: subLink.title,
															}),
															...("sale" in subLink && {
																onSale: subLink.sale,
															}),
														},
													}}
													onClick={() => setOpen(false)}
													className="pb-2 first-letter:uppercase opacity-80"
												>
													{subLink.title}
												</Link>
											</Button>
										))}
									</ul>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</SheetContent>
		</Sheet>
	);
}

export const SIDEBARLINKS = [
	{
		title: "NEW ARRIVALS",
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
		title: "ON SALES",
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
