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
					...(param?.clotheType && { clotheTypes: param.clotheType }),
				},
			}}
			scroll={false}
			className="relative flex-grow h-[310px] w-[207px] group overflow-hidden "
		>
			<Image
				src={image}
				alt="category"
				fill
				placeholder="blur"
				className="transition-transform transform-gpu group-hover:scale-110 duration-700 ease-in-out object-cover"
			/>
			<div className="group-hover:opacity-0 duration-300 transition-opacity ease-in-out absolute inset-0 bg-black/30 flex justify-center items-center bg-blend-darken">
				<div className="text-white text-2xl font-bold text-center  transition-opacity ease-in-out ">
					{text}
				</div>
			</div>
		</Link>
	);
}
