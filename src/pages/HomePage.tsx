import ComingSoon from "../components/layout/ComingSoon";
import Hero from "../components/layout/Hero";
import NowPlaying from "../components/layout/NowPlaying";

export default function Home() {
	return (
		<main className="flex flex-col gap-10 w-full">
			<Hero />
			<hr className="text-raised" />
			<NowPlaying />
			<hr className="text-raised" />
			<ComingSoon />
		</main>
	);
}
