"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface ILinkComponent {
	className?: string;
	children: React.ReactNode;
	disabled: boolean;
	href: string;
	variant?: string;
	param: string;
}

export default function LinkComponent({
	className,
	children,
	href,
	param,
	disabled,
	variant = "outline",
}: ILinkComponent) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleClick = () => {
		// Clone existing parameters to preserve them
		const newParams = new URLSearchParams(searchParams.toString());

		// Check if the parameter is already selected
		if (newParams.get(param) === href) {
			// Remove the parameter if it's already selected
			newParams.delete(param);
		} else {
			// Add or update the parameter
			newParams.set(param, href);
		}

		// @ts-expect-error Push the updated parameters to the URL without reloading
		router.push(`?${newParams.toString()}`, { scroll: false, shallow: true });
	};

	return (
		<Button
			onClick={handleClick}
			disabled={disabled}
			variant={
				variant as
					| "default"
					| "destructive"
					| "outline"
					| "secondary"
					| "ghost"
					| "link"
			}
			className={className}
		>
			{children}
		</Button>
	);
}

// return (state: ProductState) => {
//     const newParams = new URLSearchParams(window.location.search);
//     Object.entries(state).forEach(([key, value]) => {
//       newParams.set(key, value);
//     });
//     router.push(`?${newParams.toString()}`, { scroll: false });
//   };
