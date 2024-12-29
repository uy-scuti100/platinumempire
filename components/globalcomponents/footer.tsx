import Link from "next/link";
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { Input } from "../ui/input";
import { FooterModals } from "./footer-modals";

export default function Footer() {
	return (
		<footer className="px-5 pt-16 bg-background">
			<div className="container mx-auto">
				<div className="text-center">
					<h2 className="mb-6 text-2xl font-semibold uppercase">
						Subscribe to our newsletter
					</h2>
					<p className="text-muted-foreground">
						Be the first to get the latest news about trends, promotions, and
						much more
					</p>
				</div>
				{/* form */}
				<form className="flex flex-col w-full max-w-md gap-4 mx-auto my-10 sm:flex-row">
					<Input
						type="email"
						placeholder="Your email address"
						className="flex-grow text-center rounded-none  h-[50px]"
					/>
					<button className="rounded-none  btn btn-accent min-w-[150px] text-white whitespace-nowrap">
						Join
					</button>
				</form>
				{/* links */}
				<div className="flex flex-wrap justify-center gap-6 mb-10">
					<FooterModals />
				</div>
				{/* social buttons */}
				<div className="flex justify-center gap-6 mb-10 text-xl">
					<Link
						href="https://www.instagram.com/platinumcrochet1?igsh=cnhmMmw0YnhjaWww&utm_source=qr"
						target="_blank"
						rel="noopener noreferrer"
						className="transition-colors text-primary hover:text-primary/80"
					>
						<FaInstagram />
					</Link>
					<Link
						href="https://www.facebook.com/share/17xcAw6rWG/?mibextid=wwXIfr"
						target="_blank"
						rel="noopener noreferrer"
						className="transition-colors text-primary hover:text-primary/80"
					>
						<FaFacebook />
					</Link>
					<Link
						href="https://www.tiktok.com/@platinums.empire?_t=ZM-8sXHv2w5qwo&_r=1"
						target="_blank"
						rel="noopener noreferrer"
						className="transition-colors text-primary hover:text-primary/80"
					>
						<FaTiktok />
					</Link>
					<Link
						href="https://wa.link/e6ur5f"
						target="_blank"
						rel="noopener noreferrer"
						className="transition-colors text-primary hover:text-primary/80"
					>
						<FaWhatsapp />
					</Link>
				</div>
			</div>
			<div className="py-8 border-t border-border">
				<div className="container mx-auto">
					<div className="text-sm text-center text-muted-foreground">
						&copy; Platinum Fashion Hub Inc {new Date().getFullYear()}. <br />{" "}
						All rights reserved.
					</div>
				</div>
				<div className="mt-10 text-sm text-center text-muted-foreground">
					<p>Designed and Developed by</p>
					<Link
						href="https://x.com/Hussain_Joe"
						target="_blank"
						rel="noreferrer"
						className="inline-block mt-1 font-semibold hover:underline"
					>
						🏮 UY SCUTI 🧘🏿‍♂️
					</Link>
				</div>
			</div>
		</footer>
	);
}
