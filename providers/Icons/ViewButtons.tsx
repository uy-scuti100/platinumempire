import { Button } from "@/components/ui/button";
import React from "react";

interface ViewProps {
	setView: () => void;
	view: string;
}

export const FourGridView: React.FC<ViewProps> = ({ setView, view }) => {
	return (
		<svg
			onClick={setView}
			role="presentation"
			width="18"
			viewBox="0 0 18 18"
			fill="none"
			className={`w-[18px] hidden md:block cursor-pointer ${view === "quadruple" ? "" : "opacity-50"}`}
		>
			<path
				fill="currentColor"
				d="M0 0h18v2H0zm0 4h18v2H0zm0 4h18v2H0zm0 4h18v2H0zm0 4h18v2H0z"
			></path>
		</svg>
	);
};

export const ThreeGridView: React.FC<ViewProps> = ({ setView, view }) => {
	return (
		<svg
			onClick={setView}
			role="presentation"
			width="18"
			viewBox="0 0 18 18"
			fill="none"
			className={`w-[18px] hidden md:block cursor-pointer ${view === "triple" ? "" : "opacity-50"}`}
		>
			<path
				fill="currentColor"
				d="M0 0h4v4H0zM0 7h4v4H0zM0 14h4v4H0zM7 0h4v4H7zM7 7h4v4H7zM7 14h4v4H7zM14 0h4v4h-4zM14 7h4v4h-4zM14 14h4v4h-4z"
			></path>
		</svg>
	);
};

export const SingleView: React.FC<ViewProps> = ({ setView, view }) => {
	return (
		<svg
			onClick={setView}
			role="presentation"
			width="100%"
			height="100%"
			viewBox="0 0 18 18"
			fill="none"
			className={`w-[18px] md:hidden cursor-pointer ${view === "single" ? "" : "opacity-50"}`}
		>
			<path fill="currentColor" d="M0 0h18v18H0z"></path>
		</svg>
	);
};
export const DoubleView: React.FC<ViewProps> = ({ setView, view }) => {
	return (
		<svg
			onClick={setView}
			role="presentation"
			width="100%"
			height="100%"
			viewBox="0 0 18 18"
			fill="none"
			className={`w-[18px] cursor-pointer ${view === "double" ? "" : "opacity-50"}`}
		>
			<path
				fill="currentColor"
				d="M0 0h8v8H0zM0 10h8v8H0zM10 0h8v8h-8zM10 10h8v8h-8z"
			></path>
		</svg>
	);
};
