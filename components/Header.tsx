import Link from "next/link";
import React from "react";
export const Header = () => {
	return (
		<nav className="flex flex-col p-2 max-w-5xl mx-auto">

			<h1 className="text-5xl text-white text-center">
				<Link className="text-white text-5xl"  href={"/"}>Home page</Link>
			</h1>
		</nav>
	);
};
