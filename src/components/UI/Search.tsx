import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { SearchIcon, X } from "lucide-react";
import { useState } from "react";
import { LuPopcorn } from "react-icons/lu";
import { Link } from "react-router";
import type { Movie } from "../../api/movieTypes";
import BlurWrapper from "./BlurWrapper";
import Button from "./Button";

const apiUrl = import.meta.env.VITE_REDBERRY_API;

async function searchMovies({
	queryKey,
}: {
	queryKey: readonly ["searchResults", string];
}): Promise<Movie[]> {
	const [_, q] = queryKey;
	const res = await fetch(`${apiUrl}/search?q=${encodeURIComponent(q)}`);
	if (!res.ok) throw new Error(`Failed to fetch movies ${res.status}`);

	const { data } = await res.json();
	return data;
}

export default function Search() {
	const [search, setSearch] = useState("");
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	const query = search.trim();

	const { data, isPending, isError, error } = useQuery({
		queryKey: ["searchResults", query],
		queryFn: searchMovies,
		enabled: query.length > 0,
	});

	const closeSearch = () => {
		clearSearch();
		setIsSearchOpen(false);
	};

	const clearSearch = () => {
		setSearch("");
	};

	console.log(data);

	return (
		<div className="relative">
			<BlurWrapper isOpen={isSearchOpen} closeFn={closeSearch} />
			<div className="relative">
				<SearchIcon className="top-1/2 left-2 z-1 absolute size-3.5 text-white -translate-y-1/2" />
				<input
					type="search"
					placeholder="Search films and live events"
					className={clsx(
						"[&::-webkit-search-cancel-button]:hidden flex-1 bg-app-tint-white backdrop-blur-xs px-3 py-1.5 pl-7 rounded-full w-95 focus:w-120 h-10.25 text-[14px] text-white transition-[width] duration-300",
						{ "outline outline-white/15 w-120": isSearchOpen },
					)}
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					onFocus={() => setIsSearchOpen(true)}
				/>
				{query.length > 0 && (
					<button
						type="button"
						className="top-1/2 right-2 absolute flex justify-center items-center bg-app-tint-white rounded-full size-6 text-white -translate-y-1/2 cursor-pointer"
						onClick={() => setSearch("")}
					>
						<X size={14} strokeWidth={3} />
					</button>
				)}
			</div>
			{isSearchOpen && (
				<div className="[&::-webkit-scrollbar-button]:hidden absolute bg-app-page mt-1.25 px-2 py-2 rounded-2xl w-120 min-h-62 max-h-85.5 overflow-y-auto scrollbar-thin scrollbar-thumb-app-custom-red">
					{search.length > 0 ? (
						<div className="flex flex-col">
							<div className="flex justify-between px-2.5 py-2">
								<p className="mb-2.25 text-[12px] text-app-secondary uppercase">
									Films & events
								</p>
								<p className="text-[12px] text-app-secondary">
									{data?.length} results
								</p>
							</div>
							<ul className="flex flex-col gap-4.5">
								{data?.map((d) => (
									<li
										key={d.id}
										className="hover:bg-app-raised py-2 pr-5 pl-2.5 rounded-[10px] cursor-pointer"
									>
										<Link
											to={`/movies/${d.slug}`}
											className="flex items-center gap-4 pr-5"
											onClick={closeSearch}
										>
											<img
												src={d.posterUrl}
												alt={d.title}
												className="rounded-md w-10"
											/>
											<div className="flex flex-col font-semibold text-[14px]">
												<p>{d.title}</p>
												<p className="flex items-center gap-1 text-app-secondary">
													<span className="font-light text-[12px] capitalize">
														{d.kind}
													</span>
													·
													<span className="font-light text-[12px]">
														{d.ageRating.code}
													</span>
													·
													<span className="font-light text-[12px]">
														{d.runtimeMinutes} min
													</span>
												</p>
											</div>
											<p
												className={`ml-auto font-semibold text-[14px] ${d.isComingSoon ? "text-app-custom-orange" : ""}`}
											>
												{d.isComingSoon ? "Coming soon" : `₾${d.fromPrice}`}
											</p>
										</Link>
									</li>
								))}
							</ul>
						</div>
					) : (
						<div className="flex flex-col items-center py-6.5">
							<div className="flex justify-center items-center bg-app-raised mb-4 rounded-full size-12">
								<LuPopcorn size={20} />
							</div>
							<p className="mb-0.5 font-semibold text-[14px]">
								What do you want to watch?
							</p>
							<p className="mb-4.5 text-[14px] text-app-secondary">
								Search by title, director or cast
							</p>
							<Button
								href="/sessions"
								className="bg-app-raised px-6 py-2.5 text-[14px] text-white"
							>
								Browse all sessions
							</Button>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
