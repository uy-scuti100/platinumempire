import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Cart Product Interface
export interface ICartProduct {
	_id: string;
	name: string;
	image: string;
	slug: string;
	price: number;
	quantity: number;
	selectedSize?: string;
	selectedColor?: string;
	inStock?: boolean;
	uniqueKey: string; // Unique key for React rendering
}

// Store State Interface
interface CartState {
	cart: ICartProduct[];
	isCartOpen: boolean; // New state for cart tray visibility
	addToCart: (product: Omit<ICartProduct, "uniqueKey">) => void;
	removeFromCart: (
		productId: string,
		selectedSize?: string,
		selectedColor?: string
	) => void;
	increaseQuantity: (
		productId: string,
		selectedSize?: string,
		selectedColor?: string
	) => void;
	decreaseQuantity: (
		productId: string,
		selectedSize?: string,
		selectedColor?: string
	) => void;
	removeAll: () => void;
	getCartTotal: () => number;
	getTotalItems: () => number;
	toggleCart: () => void; // Toggle the cart tray
	openCart: () => void; // Open the cart tray
	closeCart: () => void; // Close the cart tray

	getCart: () => ICartProduct[];
}

// Initial State
const initialState: Pick<CartState, "cart" | "isCartOpen"> = {
	cart: [],
	isCartOpen: false, // Cart is initially closed
};

export const useStore = create<CartState>()(
	persist(
		(set, get) => ({
			...initialState,

			addToCart: (product) => {
				set((state) => {
					const {
						_id,
						name,
						image,
						slug,
						price,
						quantity = 1,
						selectedColor,
						selectedSize,
						inStock = true,
					} = product;

					if (!_id || !name || price <= 0) {
						throw new Error("Invalid product data");
					}

					if (!inStock) {
						throw new Error("Product is out of stock");
					}

					// Generate a unique identifier based on _id, size, and color
					const uniqueKey = `${_id}-${selectedSize || "no-size"}-${selectedColor || "no-color"}`;

					const existingItemIndex = state.cart.findIndex(
						(item) => item.uniqueKey === uniqueKey
					);

					if (existingItemIndex > -1) {
						const updatedCart = [...state.cart];
						const existingItem = updatedCart[existingItemIndex];

						updatedCart[existingItemIndex] = {
							...existingItem,
							quantity: existingItem.quantity + quantity,
						};

						return { cart: updatedCart, isCartOpen: true }; // Open cart tray after adding
					}

					return {
						cart: [
							...state.cart,
							{
								_id,
								name,
								image,
								slug,
								price,
								quantity,
								selectedColor,
								selectedSize,
								inStock,
								uniqueKey, // Add uniqueKey here
							},
						],
						isCartOpen: true, // Open cart tray after adding
					};
				});
			},

			removeFromCart: (productId, selectedSize, selectedColor) =>
				set((state) => {
					const uniqueKey = `${productId}-${selectedSize || "no-size"}-${selectedColor || "no-color"}`;
					return {
						cart: state.cart.filter((item) => item.uniqueKey !== uniqueKey),
					};
				}),

			increaseQuantity: (productId, selectedSize, selectedColor) =>
				set((state) => {
					const uniqueKey = `${productId}-${selectedSize || "no-size"}-${selectedColor || "no-color"}`;
					const updatedCart = [...state.cart];
					const index = updatedCart.findIndex(
						(item) => item.uniqueKey === uniqueKey
					);
					if (index !== -1) {
						updatedCart[index] = {
							...updatedCart[index],
							quantity: updatedCart[index].quantity + 1,
						};
					}
					return { cart: updatedCart };
				}),

			decreaseQuantity: (productId, selectedSize, selectedColor) =>
				set((state) => {
					const uniqueKey = `${productId}-${selectedSize || "no-size"}-${selectedColor || "no-color"}`;
					const updatedCart = [...state.cart];
					const index = updatedCart.findIndex(
						(item) => item.uniqueKey === uniqueKey
					);

					if (index !== -1) {
						const product = updatedCart[index];
						if (product.quantity > 1) {
							updatedCart[index] = {
								...product,
								quantity: product.quantity - 1,
							};
						}
					}
					return { cart: updatedCart };
				}),

			removeAll: () => set({ cart: [] }),

			getCartTotal: () => {
				return get().cart.reduce(
					(total, item) => total + item.price * item.quantity,
					0
				);
			},

			getTotalItems: () => {
				return get().cart.reduce((total, item) => total + item.quantity, 0);
			},
			getCart: () => get().cart,
			// Toggle the cart tray visibility
			toggleCart: () =>
				set((state) => ({
					isCartOpen: !state.isCartOpen,
				})),

			// Open the cart tray
			openCart: () => set({ isCartOpen: true }),

			// Close the cart tray
			closeCart: () => set({ isCartOpen: false }),
		}),
		{
			name: "optimized-cart-store",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
