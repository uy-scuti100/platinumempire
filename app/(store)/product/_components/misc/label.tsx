import { formatPriceInNaira } from "@/lib/utils";
import clsx from "clsx";

const Label = ({
	title,
	amount,

	position = "bottom",
}: {
	title: string;
	amount: number;

	position?: "bottom" | "center";
}) => {
	return (
		<div
			className={clsx(
				"absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label",
				{
					"lg:px-20 lg:pb-[35%]": position === "center",
				}
			)}
		>
			<div className="flex items-center p-1 text-xs font-semibold text-black border rounded-full bg-white/70 backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
				<h3 className="flex-grow pl-2 mr-4 leading-none tracking-tight line-clamp-1">
					{title}
				</h3>
				<p>{formatPriceInNaira(amount)}</p>
			</div>
		</div>
	);
};

export default Label;
