import Image from "next/image";
import { upsellProducts } from "@/lib/data";

export default function UpsellSection({ products = upsellProducts }) {
	return (
		<div className="bg-white shadow overflow-hidden sm:rounded-lg">
			<div className="px-4 py-5 sm:px-6">
				<h2 className="text-lg leading-6 font-medium text-gray-900">
					You May Also Like
				</h2>
			</div>
			<div className="border-t border-gray-200">
				<ul role="list" className="divide-y divide-gray-200">
					{products.map((product) => (
						<li key={product.id} className="px-4 py-4 sm:px-6">
							<div className="flex items-center space-x-4">
								<div className="flex-shrink-0 h-12 w-12 relative">
									<Image
										src={product.image}
										alt={product.name}
										layout="fill"
										objectFit="cover"
										className="rounded-full"
									/>
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-sm font-medium text-gray-900 truncate">
										{product.name}
									</p>
									<p className="text-sm text-gray-500">
										${product.price.toFixed(2)}
									</p>
								</div>
								<div>
									<button
										type="button"
										className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										Add to Cart
									</button>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
