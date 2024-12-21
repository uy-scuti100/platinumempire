import { cn } from "@/lib/utils";

export default function SearchIcon({
	isAboveLimit,
	pathname,
}: {
	isAboveLimit: boolean;
	pathname: string;
}) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={cn(
				`${isAboveLimit ? "text-black" : "text-white"}`,
				pathname !== "/" && "text-black",
				"duration-500 transition-colors ease-in-out lucide lucide-search"
			)}
		>
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.3-4.3" />
		</svg>
	);
}
