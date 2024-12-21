import { IProduct } from "@/actions";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
export default function ProductBreadcrumb({ product }: { product: IProduct }) {
	return (
		<div className="px-4">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<Link
							href={"/products"}
							className="text-xs font-medium text-black underline capitalize"
						>
							Products
						</Link>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<Link
							href={{
								pathname: "/products",
								query: {
									categories: product?.categories?.[0] ?? "",
								},
							}}
							className="text-xs font-medium text-black underline capitalize"
						>
							{product?.categories?.[0]}
						</Link>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbPage className="text-xs font-medium capitalize font-mont text-[#777]">
						{product?.name}
					</BreadcrumbPage>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
}
