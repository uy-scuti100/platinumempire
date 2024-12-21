import { orderItems } from "@/lib/data";

export default function OrderSummary({ items = orderItems }) {
	const total = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	return (
		<div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
			<div className="px-4 py-5 sm:px-6">
				<h2 className="text-lg leading-6 font-medium text-gray-900">
					Order Summary
				</h2>
			</div>
			<div className="border-t border-gray-200">
				<dl>
					{items.map((item) => (
						<div
							key={item.id}
							className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
						>
							<dt className="text-sm font-medium text-gray-500">{item.name}</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{item.quantity} x ${item.price.toFixed(2)}
							</dd>
						</div>
					))}
					<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">Total</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
							${total.toFixed(2)}
						</dd>
					</div>
				</dl>
			</div>
		</div>
	);
}
