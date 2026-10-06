import { useEffect, useState } from "react";
import { Link } from "react-router";
import Button from "../UI/Button";

export default function NowPlaying() {
	const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

	useEffect(() => {
		async function getMovies() {
			const res = await fetch(
				`${import.meta.env.VITE_REDBERRY_API}/movies/now-playing`,
			);
			const { data } = await res.json();
			setNowPlayingMovies(data);
		}
		getMovies();
	}, []);

	return (
		<section className="relative px-17.5 overflow-hidden">
			<div className="top-0 right-0 bottom-0 left-[80%] absolute bg-linear-to-l from-app-page to-transparent" />
			<div className="flex justify-between">
				<p className="mb-6 font-bold text-white uppercase">Now playing</p>
				<Link
					to="#"
					className="z-50 font-semibold text-[14px] text-app-custom-red"
				>
					See all
				</Link>
			</div>
			<div className="flex *:flex-none items-start gap-4.25">
				{nowPlayingMovies.map((movie) => (
					<NowPlayingMovieCard movie={movie} key={movie.id} />
				))}
			</div>
		</section>
	);
}

function NowPlayingMovieCard({ movie }) {
	return (
		<div className="group flex flex-col bg-app-card p-3 rounded-[20px] w-65 hover:w-111.75 h-113 text-white transition-[width] duration-400">
			<img
				src={movie.posterUrl}
				alt={movie.name}
				className="flex-1 mb-2.5 rounded-[14px] w-full min-h-0 object-cover transition-[flex]"
			/>
			<p className="font-semibold text-[18px] 1.75">{movie.title}</p>
			<div className="flex flex-col mb-3">
				<div className="flex gap-1 mb-1.75 text-[12px] text-app-secondary">
					<p>{movie.genres[0].name}</p>
					<span>·</span>
					<p>{movie.runtimeMinutes} min</p>
				</div>
				<p className="self-start bg-tint-red px-1.75 py-0.5 rounded-full text-[12px] text-app-custom-red">
					{movie.ageRating.code}
				</p>
			</div>
			<div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300">
				<p className="opacity-0 group-hover:opacity-100 overflow-hidden text-[14px] text-app-secondary transition-all translate-y-2.5 group-hover:translate-y-0 duration-300">
					{movie.synopsis}
				</p>
			</div>
			<div className="flex justify-between items-center mt-2.5">
				<p className="font-semibold text-[12px]">From ₾ {movie.fromPrice}</p>
				<Button className="bg-custom-red px-5.5 py-1.75 text-[14px] text-white text-center capitalize">
					Buy ticket
				</Button>
			</div>
		</div>
	);
}
