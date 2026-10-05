import { Link } from "react-router";

export default function Footer() {
	return (
		<footer className="flex flex-col p-[27px_34px_34px_34px]">
			<hr className="mt-6.75 mb-5 text-raised" />
			<div className="flex justify-between items-center">
				<Link to="/" className="font-bold text-5 text-white uppercase">
					Kino <span className="text-custom-red">XII</span>
				</Link>{" "}
				<p className="text-[12px] text-secondary">
					© 2026 Kino XII. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
