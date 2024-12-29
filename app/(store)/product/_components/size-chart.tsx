"use client";

import { Ruler } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/lib/useprefferedMotion";

const MaleSizeGuideContent = () => (
	<div className="p-6">
		<p className="mb-4 text-sm text-muted-foreground">
			At Platinum Fashion Hub we know correctly fitting trousers are important.
			To help you enjoy our products as much as possible, use the standardized
			Mens Jean size conversion chart below.
		</p>

		<h3 className="uppercase text-sm font-semibold pb-3"> Size Guide</h3>
		<table className="w-full border-collapse border border-border">
			<thead className="bg-muted">
				<tr>
					<th className="py-2 px-4 text-left border border-border">Size</th>
					<th className="py-2 px-4 text-left border border-border">US</th>
					<th className="py-2 px-4 text-left border border-border">EU</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td className="py-2 px-4 border border-border">L - XL</td>
					<td className="py-2 px-4 border border-border">30 - 32</td>
					<td className="py-2 px-4 border border-border">40 - 42</td>
				</tr>
				<tr>
					<td className="py-2 px-4 border border-border">XXL</td>
					<td className="py-2 px-4 border border-border">33 - 35</td>
					<td className="py-2 px-4 border border-border">43 - 45</td>
				</tr>
				<tr>
					<td className="py-2 px-4 border border-border">3XL - 4XL</td>
					<td className="py-2 px-4 border border-border">36 - 40</td>
					<td className="py-2 px-4 border border-border">46 - 50</td>
				</tr>
			</tbody>
		</table>
	</div>
);
const FemaleSizeGuideContent = () => (
	<div className="p-6">
		<p className="mb-4 text-sm text-muted-foreground">
			At Platinum Fashion Hub we know correctly fitting trousers are important.
			To help you enjoy our products as much as possible, use the standardized
			Woens Trousers size conversion chart below.
		</p>

		<h3 className="uppercase text-sm font-semibold pb-3"> Size Guide</h3>
		<table className="w-full border-collapse border border-border">
			<thead className="bg-muted">
				<tr>
					<th className="py-2 px-4 text-left border border-border">Size</th>
					<th className="py-2 px-4 text-left border border-border">UK Size</th>
					<th className="py-2 px-4 text-left border border-border">UK Waist</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td className="py-2 px-4 border border-border">XS</td>
					<td className="py-2 px-4 border border-border">4 - 6</td>
					<td className="py-2 px-4 border border-border">25 - 26</td>
				</tr>
				<tr>
					<td className="py-2 px-4 border border-border">S</td>
					<td className="py-2 px-4 border border-border">8</td>
					<td className="py-2 px-4 border border-border">27 - 28</td>
				</tr>
				<tr>
					<td className="py-2 px-4 border border-border">M</td>
					<td className="py-2 px-4 border border-border">10</td>
					<td className="py-2 px-4 border border-border">29 - 30</td>
				</tr>
				<tr>
					<td className="py-2 px-4 border border-border">L</td>
					<td className="py-2 px-4 border border-border">12</td>
					<td className="py-2 px-4 border border-border">31 - 32</td>
				</tr>
				<tr>
					<td className="py-2 px-4 border border-border">XL</td>
					<td className="py-2 px-4 border border-border">14</td>
					<td className="py-2 px-4 border border-border">33 - 34</td>
				</tr>
				<tr>
					<td className="py-2 px-4 border border-border">XXl</td>
					<td className="py-2 px-4 border border-border">16</td>
					<td className="py-2 px-4 border border-border">35 - 36</td>
				</tr>
				<tr>
					<td className="py-2 px-4 border border-border">3XL</td>
					<td className="py-2 px-4 border border-border">18</td>
					<td className="py-2 px-4 border border-border">37 - 38</td>
				</tr>
				<tr>
					<td className="py-2 px-4 border border-border">4XL</td>
					<td className="py-2 px-4 border border-border">20</td>
					<td className="py-2 px-4 border border-border">39 - 40</td>
				</tr>
			</tbody>
		</table>
	</div>
);

export function SizeChart({ gender }: { gender: "men" | "women" }) {
	const isMobile = useMediaQuery("(min-width: 768px)");

	if (isMobile) {
		return (
			<Sheet>
				<SheetTrigger asChild>
					<Button
						variant="ghost"
						className="flex items-center gap-2 underline hover:bg-transparent"
					>
						<Ruler className="h-3 w-3" />
						<span className="text-xs">Size Chart</span>
					</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle className="uppercase text-sm">
							{gender === "men"
								? "Men's Jean Size Guide"
								: "Women's Trouser Size Guide"}
						</SheetTitle>
					</SheetHeader>
					{gender === "men" ? (
						<MaleSizeGuideContent />
					) : (
						<FemaleSizeGuideContent />
					)}
				</SheetContent>
			</Sheet>
		);
	}

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button
					variant="ghost"
					className="flex items-center gap-2 underline hover:bg-transparent"
				>
					<Ruler className="h-3 w-3" />
					<span className="text-xs">Size Chart</span>
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle className="uppercase text-sm">
						{gender === "men"
							? "Men's Jean Size Guide"
							: "Women's Trouser Size Guide"}
					</DrawerTitle>
				</DrawerHeader>
				{gender === "men" ? (
					<MaleSizeGuideContent />
				) : (
					<FemaleSizeGuideContent />
				)}
			</DrawerContent>
		</Drawer>
	);
}
