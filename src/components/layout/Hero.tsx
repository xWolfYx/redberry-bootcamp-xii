import { Timer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TbTicketFilled } from "react-icons/tb";
import Button from "../UI/Button";

const apiUrl = import.meta.env.VITE_REDBERRY_API;

export default function Hero() {
	const [featuredMovies, setFeaturedMovies] = useState([]);
	const [activeIndex, setActiveIndex] = useState(0);

	const activeMovie = featuredMovies[activeIndex];
	const intervalRef = useRef(null);

	useEffect(() => {
		async function getMovies() {
			const res = await fetch(`${apiUrl}/movies/featured`);
			const { data } = await res.json();
			setFeaturedMovies(data);
		}
		getMovies();
	}, []);

	useEffect(() => {
		if (!featuredMovies.length) return;
		intervalRef.current = setInterval(() => {
			setActiveIndex((current) => (current + 1) % featuredMovies.length);
		}, 5000);
		return () => clearInterval(intervalRef.current);
	}, [featuredMovies]);

	const resetTimer = () => {
		clearTimeout(intervalRef.current);

		intervalRef.current = setTimeout(() => {
			setActiveIndex((current) => (current + 1) % featuredMovies.length);
		}, 5000);
	};

	const handleNextMovie = () => {
		setActiveIndex((curr) => (curr + 1) % featuredMovies.length);
		resetTimer();
	};
	const handlePrevMovie = () => {
		setActiveIndex(
			(curr) => (curr - 1 + featuredMovies.length) % featuredMovies.length,
		);
		resetTimer();
	};

	return (
		<section className="relative">
			{featuredMovies.length === 0 ? (
				<>
					<div className="w-full h-190"></div>
					<div className="absolute inset-0 bg-linear-to-r from-[rgba(0,0,0,0.8)] to-transparent" />
					<div className="bottom-44.75 left-16.75 absolute flex flex-col items-start w-145">
						<div className="bg-app-tint-red mb-3.75 rounded-full w-45 h-7 skeleton"></div>
						<div className="bg-app-tint-white mb-3.75 rounded-full w-70 h-12 skeleton"></div>
						<div className="flex gap-2 pb-5">
							<div className="bg-app-tint-red rounded-full w-8 h-6 skeleton"></div>
							<div className="flex items-center gap-1 bg-app-tint-white rounded-full w-14 h-6 skeleton"></div>
							<div className="bg-app-tint-white rounded-full w-14 h-6 skeleton"></div>
						</div>
						<div className="flex flex-col gap-2 *:bg-app-tint-white mb-5 *:rounded-full *:h-3.5">
							<div className="w-80 skeleton"></div>
							<div className="w-70 skeleton"></div>
							<div className="w-30 skeleton"></div>
						</div>
						<div className="flex gap-2.5">
							<div className="rounded-full w-35 h-11.75 skeleton"></div>
							<div className="rounded-full w-31 h-11.75 skeleton"></div>
						</div>
					</div>
				</>
			) : (
				<>
					<img
						src={activeMovie?.backdropUrl}
						alt={activeMovie?.title}
						className="w-full h-190 object-cover pointer-events-none"
						key={activeMovie?.id}
					/>
					<div className="absolute inset-0 bg-linear-to-r from-[rgba(0,0,0,0.8)] to-transparent" />

					{/* Movie Info */}
					<div className="bottom-44.75 left-16.75 absolute flex flex-col items-start w-145 text-white">
						<p className="bg-app-tint-red px-2.5 py-1.5 rounded-full font-bold text-[12px] text-custom-red uppercase">
							Premiere·week of{" "}
							{new Date(activeMovie?.releaseDate).toLocaleString("en-GB", {
								month: "short",
								day: "numeric",
							})}
						</p>
						<p className="mb-3.75 font-bold text-[40px] uppercase">
							{activeMovie?.title}
						</p>
						<div className="flex gap-2 pb-5">
							<p className="bg-app-tint-red px-3 py-1.5 rounded-full text-[12px] text-custom-red">
								{activeMovie?.ageRating.code}
							</p>
							<p className="flex items-center gap-1 bg-app-tint-white px-3 py-1.5 rounded-full text-[12px]">
								<Timer size={14} />
								{activeMovie?.runtimeMinutes} Min
							</p>
							{activeMovie?.formats.map((format) => (
								<p
									className="bg-app-tint-white px-3 py-1.5 rounded-full text-[12px]"
									key={format.id}
								>
									{format.name}
								</p>
							))}
						</div>
						<p className="mb-5 text-[14px]">{activeMovie?.synopsis}</p>
						<div className="flex gap-2.5">
							<Button className="bg-app-custom-red text-white">
								<TbTicketFilled size={16} className="-rotate-45" />
								Buy tickets
							</Button>
							<Button className="bg-app-tint-white hover:bg-app-secondary text-white transition duration-150">
								All sessions
							</Button>
						</div>
					</div>

					{/* Slider */}
					<div className="bottom-10.5 left-1/2 absolute flex justify-around items-center gap-5 m-auto w-full max-w-[calc(100vw-67px*2)] h-2 -translate-1/2">
						<div className="flex gap-1.75 *:bg-white *:rounded-full w-full *:w-1/4 h-0.75 transition duration-300">
							{featuredMovies.map((fm, i) => (
								<div
									className={i === activeIndex ? "bg-app-custom-red!" : ""}
									key={fm.id}
								/>
							))}
						</div>
						<div className="flex *:flex *:justify-center *:items-center gap-2.5 *:bg-app-scrim *:hover:bg-app-page *:p-0 *:size-13.5 *:text-white transition *:duration-350">
							<Button onClick={() => handlePrevMovie()}>
								<IoIosArrowBack size={34} />
							</Button>
							<Button onClick={() => handleNextMovie()}>
								<IoIosArrowForward size={34} />
							</Button>
						</div>
					</div>
				</>
			)}
		</section>
	);
}
