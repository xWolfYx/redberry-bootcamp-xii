import { BellRing } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Button from "../UI/Button";

export default function ComingSoon() {
	const [comingSoonMovies, setComingSoonMovies] = useState([]);

	useEffect(() => {
		async function getMovies() {
			const res = await fetch(
				`${import.meta.env.VITE_REDBERRY_API}/movies/coming-soon`,
			);
			const { data } = await res.json();
			setComingSoonMovies(data);
		}
		getMovies();
	}, []);

	console.log(comingSoonMovies);

	return (
		<section className="relative px-17.5 overflow-hidden">
			<div className="top-0 right-0 bottom-0 left-[80%] absolute bg-linear-to-l from-page to-transparent" />
			<div className="flex justify-between">
				<p className="mb-6 font-bold text-white uppercase">Coming soon...</p>
				<Link to="#" className="z-50 font-semibold text-[14px] text-custom-red">
					See all
				</Link>
			</div>
			<div className="flex *:flex-none items-start gap-5">
				{comingSoonMovies.map((movie) => (
					<ComingSoonCard movie={movie} key={movie.id} />
				))}
			</div>
		</section>
	);
}

function ComingSoonCard({ movie }) {
	return (
		<div className="flex justify-between gap-3.75 bg-card p-3 rounded-[20px] w-117.5 h-40 text-white">
			<img
				src={movie.posterUrl}
				alt={movie.name}
				className="rounded-[14px] w-1/2 object-cover"
			/>
			<div className="w-50.5">
				<p className="text-[12px] text-custom-red uppercase">In cinemas</p>
				<p className="text-[12px] 1.75">{movie.title}</p>
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
					<Button className="flex justify-center items-center bg-transparent px-3 py-1.5 border border-white text-[14px] text-white text-center capitalize">
						<BellRing size={16} />
						Notify me
					</Button>
				</div>
			</div>
		</div>
	);
}
