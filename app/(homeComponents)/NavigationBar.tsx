"use client";

import * as React from "react";
import Link from "next/link";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";

import image1 from "/public/2piece.jpg";
import image2 from "/public/womenstrouser.jpg";
import image3 from "/public/fineshoe2.jpg";
import men1 from "/public/menshirtnav.jpg";
import men2 from "/public/mentrousernav.jpg";
import men3 from "/public/menshoenav.jpg";
import women1 from "/public/womenshirtnav.jpg";
import women2 from "/public/womentrousernav.jpg";
import women3 from "/public/womenshoenav.jpg";
import access1 from "/public/necklace.jpg";
import access2 from "/public/ringlight.jpg";
import access3 from "/public/nails.jpg";

export function Navigation() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{/* one */}
				<NavigationMenuItem>
					<NavigationMenuTrigger className="bg-white/60 rounded-none">
						NEW IN
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-10 grid-cols-3 h-[400px] p-4">
							<li className="col-span-1">
								<Link href="/shop">
									<div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors bg-accent hover:text-accent-foreground  focus:text-accent-foreground">
										<h3 className="text-sm font-medium leading-none pb-3">
											NEW IN
										</h3>
										<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
											Elevate your style with our latest arrivals! Discover the
											essence of fashion-forward trends and timeless classics in
											our newly added collection. Immerse yourself in a world
											where every piece tells a unique story. From statement
											pieces to everyday essentials, find the perfect additions
											to your wardrobe. Explore the artistry of design and
											embrace the allure of what&lsquo;s NEW IN.
										</p>
									</div>
								</Link>

								<div className="grid grid-cols-2 mt-5 gap-5">
									<div className="border-r border-accent">
										<h4 className="font-bold">MEN</h4>
										<div className="flex flex-col gap-5 mt-10">
											<Link href={"/"} className="text-xs">
												{" "}
												T-Shirts/Polo{" "}
											</Link>
											<Link href={"/"} className="text-xs">
												{" "}
												Trousers Hoodies{" "}
											</Link>
											<Link href={"/"} className="text-xs">
												{" "}
												Denim Jackets
											</Link>
											<Link href={"/"} className="text-xs">
												{" "}
												Two Piece Shorts Shoes
											</Link>
										</div>
									</div>
									{/* <div className="h-full w-0 p-[1px] bg-accent" /> */}
									<div className="">
										<h4 className="font-bold">WOMEN</h4>
										<div className="flex flex-col gap-5 mt-10">
											<Link href={"/"} className="text-xs">
												{" "}
												T-Shirts/Polo{" "}
											</Link>
											<Link href={"/"} className="text-xs">
												{" "}
												Trousers Hoodies{" "}
											</Link>
											<Link href={"/"} className="text-xs">
												{" "}
												Denim Jackets
											</Link>
											<Link href={"/"} className="text-xs">
												{" "}
												Two Piece Shorts Shoes
											</Link>
										</div>
									</div>
								</div>
							</li>
							<li className="col-span-2 flex gap-5">
								<div className="h-[350px] w-[200px] group overflow-hidden relative">
									<Image
										src={image1}
										alt="category"
										placeholder="blur"
										height={300}
										width={300}
										className="transition-transform transform-gpu group-hover:scale-110 duration-700 ease-in-out object-cover h-[300px] w-[300px]"
									/>

									<p className="text-sm uppercase font-bold mt-5">
										Mens new arrival
									</p>
								</div>
								<div className="h-[350px] w-[200px] group overflow-hidden relative">
									<Image
										src={image2}
										alt="category"
										placeholder="blur"
										height={300}
										width={300}
										className="transition-transform transform-gpu group-hover:scale-110 duration-700 ease-in-out object-cover h-[300px] w-[300px]"
									/>

									<p className="text-sm uppercase font-bold mt-5">
										Womens new arrival
									</p>
								</div>
								<div className="h-[350px] w-[200px] group overflow-hidden relative">
									<Image
										src={image3}
										alt="category"
										placeholder="blur"
										height={300}
										width={300}
										className="transition-transform transform-gpu group-hover:scale-110 duration-700 ease-in-out object-cover h-[300px] w-[300px]"
									/>

									<p className="text-sm uppercase font-bold mt-5">
										Brand new Sneakers
									</p>
								</div>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				{/* two */}
				<NavigationMenuItem>
					<NavigationMenuTrigger className="bg-white/60 rounded-none">
						MALE
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-10 grid-cols-3 h-[400px] p-4">
							<li className="col-span-1">
								<Link href="/shop">
									<div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors bg-accent hover:text-accent-foreground  focus:text-accent-foreground">
										<h3 className="text-sm font-medium leading-none pb-3">
											MEN
										</h3>
										<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
											Redefine your wardrobe with our curated selection for men.
											Elevate your style game with the latest trends and
											timeless classics designed for the modern gentleman. From
											sharp suiting to casual essentials, our MEN collection
											embodies sophistication and comfort. Discover the perfect
											fusion of craftsmanship and contemporary fashion. Explore
											now and make a statement with every step you take.
										</p>
									</div>
								</Link>

								<div className=" mt-5 gap-5">
									<div className="">
										<h4 className="font-bold">MEN</h4>
										<div className="flex flex-col gap-5 mt-10">
											<Link href={"/"} className="text-xs">
												{" "}
												T-Shirts/Polo{" "}
											</Link>
											<Link href={"/"} className="text-xs">
												{" "}
												Trousers Hoodies{" "}
											</Link>
											<Link href={"/"} className="text-xs">
												{" "}
												Denim Jackets
											</Link>
											<Link href={"/"} className="text-xs">
												{" "}
												Two Piece Shorts Shoes
											</Link>
										</div>
									</div>
								</div>
							</li>
							<li className="col-span-2 flex gap-5">
								<div className="h-[350px] w-[200px] group overflow-hidden relative">
									<Image
										src={men1}
										alt="category"
										placeholder="blur"
										height={300}
										width={300}
										className="transition-transform transform-gpu group-hover:scale-110 duration-700 ease-in-out object-cover h-[300px] w-[300px]"
									/>

									<p className="text-sm uppercase font-bold mt-5">
										Mens T shirt
									</p>
								</div>
								<div className="h-[350px] w-[200px] group overflow-hidden relative">
									<Image
										src={men2}
										alt="category"
										placeholder="blur"
										height={300}
										width={300}
										className="transition-transform transform-gpu group-hover:scale-110 duration-700 ease-in-out object-cover h-[300px] w-[300px]"
									/>

									<p className="text-sm uppercase font-bold mt-5">
										MENS Trousers/Pants
									</p>
								</div>
								<div className="h-[350px] w-[200px] group overflow-hidden relative">
									<Image
										src={men3}
										alt="category"
										placeholder="blur"
										height={300}
										width={300}
										className="transition-transform transform-gpu group-hover:scale-110 duration-700 ease-in-out object-cover h-[300px] w-[300px]"
									/>

									<p className="text-sm uppercase font-bold mt-5">
										Mens Sneakers
									</p>
								</div>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				{/* three */}
				<NavigationMenuItem>
					<NavigationMenuTrigger className="bg-white/60 rounded-none">
						WOMEN
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-10 grid-cols-3 h-[400px] p-4">
							<li className="col-span-1">
								<Link href="/shop">
									<div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors bg-accent hover:text-accent-foreground  focus:text-accent-foreground">
										<h3 className="text-sm font-medium leading-none pb-3">
											WOMEN
										</h3>
										<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
											Empower your style journey with our thoughtfully curated
											collection for women. Dive into a world of elegance and
											self-expression, where every piece tells a unique story.
											From chic ensembles to comfortable casuals, our WOMEN
											collection embraces diversity and celebrates
											individuality. Unveil the latest trends and timeless
											classics designed to complement the modern woman. Explore
											the artistry of fashion and make a statement with every
											outfit.
										</p>
									</div>
								</Link>

								<div className=" mt-5 gap-5">
									<div className="">
										<h4 className="font-bold">WOMEN</h4>
										<div className="grid grid-cols-2 ">
											<div className="flex flex-col gap-5 mt-10">
												<Link href="/" className="pb-2 text-xs">
													Tops
												</Link>
												<Link href="/" className="pb-2 text-xs">
													Trousers/Cargo Pants
												</Link>
												<Link href="/" className="pb-2 text-xs">
													{" "}
													Gowns
												</Link>
												<Link href="/" className="pb-2 text-xs">
													Two Piece (Up and Down)
												</Link>
												<Link href="/" className="pb-2 text-xs">
													Denim Jackets
												</Link>
											</div>
											<div className="flex flex-col gap-5 mt-10">
												<Link href="/" className="pb-2 text-xs">
													Shoes
												</Link>
												<Link href="/" className="pb-2 text-xs">
													Bikini
												</Link>
												<Link href="/" className="pb-2 text-xs">
													Lingerie
												</Link>
												<Link href="/" className="pb-2 text-xs">
													Bags
												</Link>
											</div>
										</div>
									</div>
								</div>
							</li>
							<li className="col-span-2 flex gap-5">
								<div className="h-[350px] w-[200px] group overflow-hidden relative">
									<Image
										src={women1}
										alt="category"
										placeholder="blur"
										height={300}
										width={300}
										className="transition-transform transform-gpu group-hover:scale-110 duration-700 ease-in-out object-cover h-[300px] w-[300px]"
									/>

									<p className="text-sm uppercase font-bold mt-5">
										WOMENS NEW TOPS
									</p>
								</div>
								<div className="h-[350px] w-[200px] group overflow-hidden relative">
									<Image
										src={women2}
										alt="category"
										placeholder="blur"
										height={300}
										width={300}
										className="transition-transform transform-gpu group-hover:scale-110 duration-700 ease-in-out object-cover h-[300px] w-[300px]"
									/>

									<p className="text-sm uppercase font-bold mt-5">
										WOMENS PANTS/CARGO PANTS
									</p>
								</div>
								<div className="h-[350px] w-[200px] group overflow-hidden relative">
									<Image
										src={women3}
										alt="category"
										placeholder="blur"
										height={300}
										width={300}
										className="transition-transform transform-gpu group-hover:scale-110 duration-700 ease-in-out object-cover h-[300px] w-[300px]"
									/>

									<p className="text-sm uppercase font-bold mt-5">
										WOMENS SHOES
									</p>
								</div>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				{/* four */}
				<NavigationMenuItem>
					<NavigationMenuTrigger className="bg-white/60 rounded-none">
						ACCESSORIES
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-10 grid-cols-3 h-[400px] p-4">
							<li className="col-span-1">
								<Link href="/shop">
									<div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors bg-accent hover:text-accent-foreground  focus:text-accent-foreground">
										<h3 className="text-sm font-medium leading-none pb-3">
											ACCESSORIES
										</h3>
										<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
											Elevate your personal style with our diverse collection of
											ACCESSORIES. Discover the perfect finishing touches to
											complete your look, from exquisite jewelry that adds a
											touch of glamour to everyday essentials that enhance your
											daily routine. Whether it&lsquo;s dazzling earrings,
											statement necklaces, or practical utilities like ring
											lights, our curated selection is designed to complement
											your unique lifestyle. Explore the art of accessorizing
											and let each piece express your individuality.
										</p>
									</div>
								</Link>

								<div className=" mt-5 gap-5">
									<div className="">
										<h4 className="font-bold">ACCESSORIES</h4>
										<div className="flex flex-col gap-5 mt-10 ">
											<Link href={"/"} className="text-xs">
												Jewellery
											</Link>
											<Link href={"/"} className="text-xs">
												Ring Light
											</Link>
											<Link href={"/"} className="text-xs">
												Belts
											</Link>
											<Link href={"/"} className="text-xs">
												Press-On-Nails
											</Link>
										</div>
									</div>
								</div>
							</li>
							<li className="col-span-2 flex gap-5">
								<div className="h-[350px] w-[200px] group overflow-hidden relative">
									<Image
										src={access1}
										alt="category"
										placeholder="blur"
										height={300}
										width={300}
										className="transition-transform transform-gpu group-hover:scale-110 duration-700 ease-in-out object-cover h-[300px] w-[300px]"
									/>

									<p className="text-sm uppercase font-bold mt-5">
										Mens new arrival
									</p>
								</div>
								<div className="h-[350px] w-[200px] group overflow-hidden relative">
									<Image
										src={access2}
										alt="category"
										placeholder="blur"
										height={300}
										width={300}
										className="transition-transform transform-gpu group-hover:scale-110 duration-700 ease-in-out object-cover h-[300px] w-[300px]"
									/>

									<p className="text-sm uppercase font-bold mt-5">
										Womens new arrival
									</p>
								</div>
								<div className="h-[350px] w-[200px] group overflow-hidden relative">
									<Image
										src={access3}
										alt="category"
										placeholder="blur"
										height={300}
										width={300}
										className="transition-transform transform-gpu group-hover:scale-110 duration-700 ease-in-out object-cover h-[300px] w-[300px]"
									/>

									<p className="text-sm uppercase font-bold mt-5">
										Brand new Sneakers
									</p>
								</div>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				{/* five */}
				<NavigationMenuItem>
					<NavigationMenuTrigger className="bg-white/60 rounded-none">
						SALE
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-10 grid-cols-3 h-[400px] p-4">
							<li className="col-span-1">
								<Link href="/shop">
									<div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors bg-accent hover:text-accent-foreground  focus:text-accent-foreground">
										<h3 className="text-sm font-medium leading-none pb-3">
											SALE
										</h3>
										<p className=" text-sm leading-snug text-muted-foreground">
											Explore our curated selection of discounted goods, each
											offering unbeatable value without compromising on quality.
											From stylish apparel to must-have accessories, our ON SALE
											NOW section is your gateway to incredible savings. Embrace
											the thrill of a good deal and elevate your style without
											breaking the bank. Don&lsquo;t miss out — discover
											discounted treasures that make every purchase a delight!
										</p>
									</div>
								</Link>

								<div className="grid grid-cols-2 mt-5 gap-5">
									<div className="border-r border-accent"></div>
								</div>
							</li>
							<li className="col-span-2 flex gap-5">
								<div className="h-[350px] w-[200px] group overflow-hidden relative">
									<Image
										src={image1}
										alt="category"
										placeholder="blur"
										height={300}
										width={300}
										className="transition-transform transform-gpu group-hover:scale-110 duration-700 ease-in-out object-cover h-[300px] w-[300px]"
									/>

									<p className="text-sm uppercase font-bold mt-5">On Sale</p>
								</div>
								<div className="h-[350px] w-[200px] group overflow-hidden relative">
									<Image
										src={image2}
										alt="category"
										placeholder="blur"
										height={300}
										width={300}
										className="transition-transform transform-gpu group-hover:scale-110 duration-700 ease-in-out object-cover h-[300px] w-[300px]"
									/>

									<p className="text-sm uppercase font-bold mt-5">On Sale</p>
								</div>
								<div className="h-[350px] w-[200px] group overflow-hidden relative">
									<Image
										src={image3}
										alt="category"
										placeholder="blur"
										height={300}
										width={300}
										className="transition-transform transform-gpu group-hover:scale-110 duration-700 ease-in-out object-cover h-[300px] w-[300px]"
									/>

									<p className="text-sm uppercase font-bold mt-5">On Sale</p>
								</div>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
