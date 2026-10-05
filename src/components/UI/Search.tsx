import { SearchIcon, X } from "lucide-react";
import { useState } from "react";

export default function Search() {
	const [search, setSearch] = useState("");

	return (
		<div className="relative">
			<SearchIcon className="top-1/2 left-2 z-1 absolute size-3.5 text-white -translate-y-1/2" />
			<input
				type="search"
				placeholder="Search films and live events"
				className="[&::-webkit-search-cancel-button]:hidden flex-1 bg-tint-white backdrop-blur-xs px-3 py-1.5 pl-7 rounded-full focus:outline focus:outline-white/15 w-95 focus:w-120 h-10.25 text-[14px] text-white transition-[width] duration-300"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			{search.length > 0 && (
				<button
					type="button"
					className="top-1/2 right-2 absolute flex justify-center items-center bg-tint-white rounded-full size-6 text-white -translate-y-1/2 cursor-pointer"
					onClick={() => setSearch("")}
				>
					<X size={14} strokeWidth={3} />
				</button>
			)}
		</div>
	);
}
