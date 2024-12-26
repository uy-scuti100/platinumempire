"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

type ModalContent = {
	title: string;
	content: React.ReactNode;
};

const modalContents: Record<string, ModalContent> = {
	"Returns Policy": {
		title: "Returns Policy",
		content: (
			<p>
				We accept returns within 24 hours of receiving your item, provided the
				product is in merchantable quality (unworn, undamaged, and with tags
				intact). Please ensure the item is returned in its original condition
				and packaging. For assistance, contact us directly through our support
				channels.
			</p>
		),
	},
	"Track your order": {
		title: "Track Your Order",
		content: (
			<>
				<p>
					Track your order with ease! Simply reach out to us on WhatsApp using
					the link below, and provide your order details for updates:
				</p>
				<Button className="mt-4 rounded-none" variant="default" asChild>
					<a
						href="https://wa.me/08148439316"
						target="_blank"
						rel="noopener noreferrer"
					>
						Track via WhatsApp
					</a>
				</Button>
			</>
		),
	},
	"Shipping & delivery": {
		title: "Shipping & Delivery",
		content: (
			<>
				<p>
					<strong>Processing & Dispatch:</strong> Orders are processed and
					dispatched the next day after placement.
				</p>
				<p>
					<strong>Delivery Timelines:</strong>
				</p>
				<ul className="list-disc list-inside">
					<li>Within Lagos: 3 working days</li>
					<li>Outside Lagos: 3-7 working days</li>
				</ul>
				<p>
					<strong>Pick-Up Option:</strong> Prefer to pick up your order? You can
					collect it immediately during our working hours: 9 AM - 6 PM, Monday
					to Saturday.
				</p>
			</>
		),
	},
};

export function FooterModals() {
	const [open, setOpen] = useState<string | null>(null);

	return (
		<>
			{Object.entries(modalContents).map(([key, { title, content }]) => (
				<Dialog
					key={key}
					open={open === key}
					onOpenChange={(isOpen) => setOpen(isOpen ? key : null)}
				>
					<DialogTrigger asChild>
						<Button
							variant="link"
							className="underline transition-colors text-primary hover:text-primary/80 "
						>
							{key}
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-[400px]">
						<DialogHeader>
							<DialogTitle>{title}</DialogTitle>
						</DialogHeader>
						<div className="mt-4">{content}</div>
					</DialogContent>
				</Dialog>
			))}
		</>
	);
}
