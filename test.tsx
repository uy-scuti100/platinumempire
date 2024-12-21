// import { createClient } from 'next-sanity';
// import imageUrlBuilder from '@sanity/image-url';

// export const sanityConfig = {
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
//   apiVersion: '2024-01-01',
//   useCdn: process.env.NODE_ENV === 'production',
// };

// export const sanityClient = createClient(sanityConfig);

// // Image URL builder
// export const imageBuilder = imageUrlBuilder(sanityClient);

// export function urlForImage(source: any) {
//   return imageBuilder.image(source);
// }

// // Fetch products query
// export async function getAllProducts() {
//   const query = `*[_type == "product"]{
//     _id,
//     name,
//     description,
//     price,
//     "imageUrl": image.asset->url,
//     category,
//     stock,
//     upsellItems[]-> {
//       _id,
//       name,
//       price,
//       "imageUrl": image.asset->url
//     }
//   }`;

//   return await sanityClient.fetch(query);
// }

// // Fetch single product
// export async function getProductById(id: string) {
//   const query = `*[_type == "product" && _id == $id][0]{
//     _id,
//     name,
//     description,
//     price,
//     "imageUrl": image.asset->url,
//     category,
//     stock,
//     upsellItems[]-> {
//       _id,
//       name,
//       price,
//       "imageUrl": image.asset->url
//     }
//   }`;

//   return await sanityClient.fetch(query, { id });
// }
// ```

// 2. Sanity Schema (for reference):

// <antArtifact identifier="sanity-schema" type="application/vnd.ant.code" language="typescript" title="Sanity Schema for Products">
// export default {
//   name: 'product',
//   title: 'Product',
//   type: 'document',
//   fields: [
//     {
//       name: 'name',
//       title: 'Name',
//       type: 'string',
//       validation: Rule => Rule.required()
//     },
//     {
//       name: 'description',
//       title: 'Description',
//       type: 'text'
//     },
//     {
//       name: 'price',
//       title: 'Price',
//       type: 'number',
//       validation: Rule => Rule.required().min(0)
//     },
//     {
//       name: 'image',
//       title: 'Product Image',
//       type: 'image',
//       options: {
//         hotspot: true
//       }
//     },
//     {
//       name: 'category',
//       title: 'Category',
//       type: 'string'
//     },
//     {
//       name: 'stock',
//       title: 'Stock Quantity',
//       type: 'number',
//       validation: Rule => Rule.required().min(0)
//     },
//     {
//       name: 'upsellItems',
//       title: 'Upsell Items',
//       type: 'array',
//       of: [{ type: 'reference', to: [{ type: 'product' }] }]
//     }
//   ]
// }
// ```

// 3. Updated Checkout Page:

// <antArtifact identifier="checkout-page-sanity" type="application/vnd.ant.code" language="typescript" title="Checkout Page with Sanity Integration">
// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import axios from 'axios';
// import { getAllProducts, urlForImage } from '../lib/sanity';
// import { initializePaystackTransaction } from '../lib/paystack';

// // Validation schema
// const checkoutSchema = z.object({
//   fullName: z.string().min(2, "Name must be at least 2 characters"),
//   email: z.string().email("Invalid email address"),
//   phone: z.string().min(10, "Phone number must be at least 10 digits"),
//   address: z.string().min(5, "Address must be at least 5 characters")
// });

// type CheckoutFormData = z.infer<typeof checkoutSchema>;

// const CheckoutPage: React.FC = () => {
//   const [cartItems, setCartItems] = useState<any[]>([]);
//   const [upsellProducts, setUpsellProducts] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const products = await getAllProducts();

//         // Assuming first items in cart and upsell products
//         setCartItems(products.slice(0, 2));
//         setUpsellProducts(products.filter(p =>
//           !cartItems.some(cartItem => cartItem._id === p._id)
//         ).slice(0, 4));
//       } catch (error) {
//         console.error('Failed to fetch products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm<CheckoutFormData>({
//     resolver: zodResolver(checkoutSchema)
//   });

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + (item.price || 0), 0);
//   };

//   const onSubmit = async (data: CheckoutFormData) => {
//     try {
//       const totalAmount = calculateTotal();

//       // Initialize Paystack transaction
//       const paystackResponse = await initializePaystackTransaction(
//         totalAmount,
//         data.email
//       );

//       // Redirect to Paystack payment page
//       window.location.href = paystackResponse.data.authorization_url;
//     } catch (error) {
//       console.error('Checkout error:', error);
//       alert('Failed to process payment. Please try again.');
//     }
//   };

//   const addUpsellItem = (product: any) => {
//     if (!cartItems.some(item => item._id === product._id)) {
//       setCartItems(prev => [...prev, product]);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Order Summary */}
//         <div>
//           <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
//           {cartItems.map(item => (
//             <div key={item._id} className="flex justify-between mb-2">
//               <div className="flex items-center">
//                 {item.imageUrl && (
//                   <img
//                     src={urlForImage(item.imageUrl).width(50).height(50).url()}
//                     alt={item.name}
//                     className="w-12 h-12 mr-2 object-cover"
//                   />
//                 )}
//                 <span>{item.name}</span>
//               </div>
//               <span>
//                 ${item.price.toFixed(2)}
//               </span>
//             </div>
//           ))}
//           <div className="font-bold mt-4">
//             Total: ${calculateTotal().toFixed(2)}
//           </div>
//         </div>

//         {/* Checkout Form */}
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <label>Full Name</label>
//             <input
//               {...register('fullName')}
//               className="w-full p-2 border"
//             />
//             {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
//           </div>

//           <div>
//             <label>Email</label>
//             <input
//               {...register('email')}
//               className="w-full p-2 border"
//             />
//             {errors.email && <p className="text-red-500">{errors.email.message}</p>}
//           </div>

//           <div>
//             <label>Phone</label>
//             <input
//               {...register('phone')}
//               className="w-full p-2 border"
//             />
//             {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
//           </div>

//           <div>
//             <label>Address</label>
//             <textarea
//               {...register('address')}
//               className="w-full p-2 border"
//             />
//             {errors.address && <p className="text-red-500">{errors.address.message}</p>}
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-2"
//           >
//             Proceed to Payment
//           </button>
//         </form>

//         {/* Upsell Products */}
//         <div className="col-span-full">
//           <h3 className="text-xl font-bold mb-4">Recommended Products</h3>
//           <div className="grid grid-cols-4 gap-4">
//             {upsellProducts.map(product => (
//               <div
//                 key={product._id}
//                 className="border p-4 text-center"
//               >
//                 {product.imageUrl && (
//                   <img
//                     src={urlForImage(product.imageUrl).width(200).height(200).url()}
//                     alt={product.name}
//                     className="w-full h-48 object-cover mb-2"
//                   />
//                 )}
//                 <h4>{product.name}</h4>
//                 <p>${product.price.toFixed(2)}</p>
//                 <button
//                   onClick={() => addUpsellItem(product)}
//                   className="mt-2 bg-green-500 text-white p-2"
//                 >
//                   Add to Order
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;
// ```

// 4. Webhook Handler (Remains the same as in previous implementation)

// Environment Configuration:
// ```
// NEXT_PUBLIC_SANITY_PROJECT_ID="your_sanity_project_id"
// NEXT_PUBLIC_SANITY_DATASET="production"
// PAYSTACK_SECRET_KEY="your_paystack_secret_key"
// PAYSTACK_PUBLIC_KEY="your_paystack_public_key"
// NEXT_PUBLIC_SITE_URL="http://localhost:3000"
// ```

// Key Changes:
// - Replaced Prisma with Sanity client
// - Added Sanity configuration for fetching products
// - Integrated Sanity image URL builder
// - Dynamic product fetching in checkout page
// - Added product images from Sanity

// Additional Setup:
// 1. Install Sanity CLI globally: `npm install -g @sanity/cli`
// 2. Initialize Sanity project if not already done: `sanity init`
// 3. Create the product schema in your Sanity studio

// Recommendations:
// - Implement cart state management (e.g., with Context or Redux)
// - Add more robust error handling
// - Create a separate cart component
// - Implement product stock checking

// Would you like me to elaborate on any part of the implementation or explain how to set up the Sanity schema and queries?
