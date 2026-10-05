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
			<div className="top-0 right-0 bottom-0 left-[80%] absolute bg-linear-to-l from-page to-transparent" />
			<div className="flex justify-between">
				<p className="mb-6 font-bold text-white uppercase">Now playing</p>
				<Link to="#" className="z-50 font-semibold text-[14px] text-custom-red">
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
		<div className="flex flex-col bg-card p-3 rounded-[20px] w-65 h-113 text-white">
			<img
				src={movie.posterUrl}
				alt={movie.name}
				className="mb-2.5 rounded-[14px] h-75 object-cover"
			/>
			<p className="font-semibold text-[18px] 1.75">{movie.title}</p>
			<div className="flex flex-col">
				<div className="flex gap-1 mb-1.75 text-[12px] text-secondary">
					<p>{movie.genres[0].name}</p>
					<span>·</span>
					<p>{movie.runtimeMinutes} min</p>
				</div>
				<p className="self-start bg-tint-red px-1.75 py-0.5 rounded-full text-[12px] text-custom-red">
					{movie.ageRating.code}
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
