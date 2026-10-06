import { Link } from "react-router";
import Button from "./Button";
import Search from "./Search";

export default function Navbar() {
	return (
		<nav className="flex justify-between items-center bg-linear-to-b from-black px-15 pt-7.5 pb-10">
			<div className="flex items-center gap-9 font-bold text-nowrap">
				<Link
					to="/"
					className="font-bold text-[20px] text-white uppercase tracking-wide"
				>
					Kino <span className="text-app-custom-red">XII</span>
				</Link>
				<Link
					to="/sessions"
					className="font-light text-[12px] text-white uppercase tracking-wide"
				>
					Sessions
				</Link>
			</div>
			<div className="flex items-center gap-8">
				<Search />
				<div className="flex gap-3 *:text-nowrap">
					<Button className="bg-app-custom-red text-white">Sign up</Button>
					<Button>Log in</Button>
				</div>
			</div>
		</nav>
	);
}
