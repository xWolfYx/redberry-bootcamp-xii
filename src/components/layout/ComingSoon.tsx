import { useQuery } from "@tanstack/react-query";
import { BellRing } from "lucide-react";
import { Link } from "react-router";
import Button from "../UI/Button";

async function getMovies() {
	const res = await fetch(
		`${import.meta.env.VITE_REDBERRY_API}/movies/coming-soon`,
	);

	if (!res.ok) throw new Error(`Failed to fetch movies ${res.status}`);

	const { data } = await res.json();
	return data;
}

export default function ComingSoon() {
	const { data, isPending, isError, error } = useQuery({
		queryKey: ["comingSoonMovies"],
		queryFn: getMovies,
	});
	return (
		<section className="relative mb-44.25 px-17.5 overflow-hidden">
			<div className="top-0 right-0 bottom-0 left-[80%] absolute bg-linear-to-l from-app-page to-transparent" />
			<div className="flex justify-between">
				<p className="mb-6 font-bold text-white uppercase">Coming soon...</p>
				<Link
					to="#"
					className="z-50 font-semibold text-[14px] text-app-custom-red"
				>
					See all
				</Link>
			</div>
			<div className="flex *:flex-none items-start gap-5">
				{isPending && <ComingSoonCardSkeleton />}
				{isError && (
					<>
						<p className="text-white">Failed to load movies.</p>
						<p className="text-app-secondary">{error.message}</p>
					</>
				)}
				{!isPending &&
					!isError &&
					data?.map((movie) => <ComingSoonCard movie={movie} key={movie.id} />)}
			</div>
		</section>
	);
}
function ComingSoonCardSkeleton() {
	return Array.from({ length: 8 }).map((_, i) => (
		<div
			className="flex justify-between gap-3.75 bg-app-card p-3 rounded-[20px] w-117.5 h-40 skeleton"
			key={i}
		>
			<div className="rounded-[14px] w-1/2 object-cover skeleton" />
			<div className="w-50.5">
				<p className="mb-0.5 w-30 h-4 skeleton" />
				<div className="mb-0.5 w-27 h-4.5 skeleton" />
				<div className="flex flex-col">
					<div className="flex gap-1 mb-1.75">
						<div className="w-22 h-4.5 skeleton" />
					</div>
					<div className="self-start bg-app-tint-red mb-4.5 rounded-full w-8.5 h-5.5 skeleton" />
				</div>
				<div className="rounded-full w-24 h-8 skeleton" />
			</div>
		</div>
	));
}
function ComingSoonCard({ movie }) {
	return (
		<div className="flex justify-between gap-3.75 bg-app-card p-3 rounded-[20px] w-117.5 h-40 text-white">
			<img
				src={movie.posterUrl}
				alt={movie.title}
				className="rounded-[14px] w-1/2 object-cover"
			/>
			<div className="w-50.5">
				<p className="mb-0.5 text-[12px] text-app-custom-red uppercase">
					In cinemas{" "}
					{new Date(movie.releaseDate).toLocaleString("en-GB", {
						month: "long",
						day: "numeric",
					})}
				</p>
				<p className="mb-0.5 text-[12px]">{movie.title}</p>
				<div className="flex flex-col">
					<div className="flex gap-1 mb-1.75 text-[12px] text-app-secondary text-semibold">
						<p>{movie.genres[0].name}</p>
						<span>·</span>
						<p>{movie.runtimeMinutes} min</p>
					</div>
					<p className="self-start bg-app-tint-red mb-4.5 px-2 py-0.5 rounded-full text-[12px] text-app-custom-red">
						{movie.ageRating.code}
					</p>
				</div>
				<div className="flex justify-between items-center">
					<Button className="flex justify-center items-center bg-transparent hover:bg-app-tint-white px-3 py-1.5 border border-white text-[11px] text-white text-center capitalize transition duration-150">
						<BellRing size={14} />
						Notify me
					</Button>
				</div>
			</div>
		</div>
	);
}
