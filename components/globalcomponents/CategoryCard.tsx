import { InfoProp } from "@/constants/categories";
import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({ info }: { info: InfoProp }) {
	const { image, param, text } = info;
	return (
		<Link
			href={{
				pathname: "/products",
				query: {
					...(param?.gender && { gender: param.gender }),
					...(param?.category && { categories: param.category }),
					...(param?.clotheType && { clotheType: param.clotheType }),
				},
			}}
			// onClick={() => window.scrollTo(0, 0)}
			className="relative flex-grow h-[310px] w-[207px] group overflow-hidden "
		>
			<Image
				src={image}
				alt="category"
				fill
				loading="lazy"
				sizes="(max-width: 480px) 100vw, (max-width: 768px) 85vw, (max-width: 1060px) 75vw, 60vw"
				placeholder="blur"
				className="transition-transform transform-gpu group-hover:scale-110 duration-700 ease-in-out object-cover"
			/>
			<div className="group-hover:opacity-0 duration-300 transition-opacity ease-in-out absolute inset-0 bg-black/30 flex justify-start items-end bg-blend-darken">
				{/* <div className="text-white text-2xl font-bold text-center  transition-opacity ease-in-out "> */}

				<div className=" flex items-center m-2 px-2 py-1 md:text-2xl text-lg font-semibold text-black border rounded-none  bg-white/70 backdrop-blur-md">
					{text}
				</div>
			</div>
		</Link>
	);
}
