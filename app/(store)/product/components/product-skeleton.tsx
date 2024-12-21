import { FaCaretRight } from "react-icons/fa";

export default function ProductSkeleton() {
	return (
		<div className="flex flex-col w-full transition-all duration-500 ease-in-out -10 md:flex-row sm:items-center">
			<div className="flex items-center w-full gap-3 px-3 mt">
				<div className="w-10 h-2 rounded-md bg-deep-brown/50 animate-pulse"></div>
				<FaCaretRight className="text-deep-brown/50 animate-pulse" />
				<div className="w-10 h-2 rounded-md bg-deep-brown/50 animate-pulse"></div>
				<FaCaretRight className="text-deep-brown/50 animate-pulse" />
				<div className="h-2 rounded-md w-44 bg-deep-brown/50 animate-pulse"></div>
			</div>
			<div className="w-full h-full">
				<div className="bg-[#bbb2a4] w-full h-[800px] animate-pulse max-h-[800px] mt-10"></div>
			</div>
			{/* deets */}
			<div className="flex flex-col w-full px-3 mt-10">
				<div className="w-[50%] h-3 rounded-md bg-deep-brown/50 animate-pulse"></div>
				<div className="w-[30%] mt-3 h-3 rounded-md bg-deep-brown/50 animate-pulse"></div>
				<div className="w-[30%] h-3 mt-1 rounded-md bg-deep-brown/50 animate-pulse"></div>

				<div className=" mt-3 w-[50%] h-3 rounded-md w- bg-deep-brown/50 animate-pulse"></div>
				<div className="w-[50%] mt-1 h-3 rounded-md w- bg-deep-brown/50 animate-pulse"></div>
				<div className="w-[50%] mt-1 h-3 rounded-md w- bg-deep-brown/50 animate-pulse"></div>
			</div>
		</div>
	);
}
