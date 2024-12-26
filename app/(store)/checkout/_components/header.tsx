import Image from "next/image";
import Link from "next/link";

export function Header() {
	return (
		<header className="pt-4 px-6 bg-white shadow-sm">
			<Link
				href="/"
				className="space-x-2 flex flex-col items-center justify-end"
			>
				<div className="flex items-center justify-center border border-gray-300 p-1">
					<Image
						src="/logo1.png"
						alt="logo"
						sizes="(max-width: 480px) 100vw, (max-width: 768px) 85vw, (max-width: 1060px) 75vw, 60vw"
						loading="lazy"
						width={150}
						height={100}
						className="h-[50px] md:w-[150px] w-full object-contain"
					/>
				</div>
			</Link>
		</header>
	);
}
