import { useQuery } from "@tanstack/react-query";
import { Timer } from "lucide-react";
import { TbTicketFilled } from "react-icons/tb";
import { useParams } from "react-router";
import type {
	Format,
	MovieDetails as MovieDetailsType,
	MovieSessions as MovieSessionsType,
} from "../api/movieTypes";
import Dates from "../components/UI/Dates";

const apiUrl = import.meta.env.VITE_REDBERRY_API;

async function getMovieDetails({
	queryKey,
}: {
	queryKey: ["movieDetails", string | undefined];
}): Promise<MovieDetailsType> {
	const [_, id] = queryKey;
	const res = await fetch(`${apiUrl}/movies/${id}`);
	const { data } = await res.json();

	return data;
}

async function getMovieSessions({
	queryKey,
}: {
	queryKey: ["movieSessions", string | undefined];
}): Promise<MovieSessionsType[]> {
	const [_, id] = queryKey;
	const res = await fetch(`${apiUrl}/movies/${id}/sessions`);

	if (!res.ok) throw new Error(`Failed to fetch sessions ${res.status}`);

	const { data } = await res.json();

	return data;
}

export default function MovieDetails() {
	const { id } = useParams<{ id: string }>();

	const { data, isPending, isError, error } = useQuery({
		queryKey: ["movieDetails", id],
		queryFn: getMovieDetails,
		enabled: !!id,
	});

	console.log(data);
	return (
		!isPending && (
			<section>
				<div className="relative flex mb-8.5 w-full h-141.75">
					<div className="absolute inset-0 bg-linear-to-r from-[rgba(0,0,0,0.8)] to-transparent" />
					<img
						src={data?.backdropUrl}
						alt={data?.title}
						className="w-full object-cover object-top"
					/>
					<div className="bottom-10.25 left-15 z-20 absolute flex gap-8.5">
						<img
							src={data?.posterUrl}
							alt={data?.title}
							className="rounded-[14px] w-72.25 h-93.5"
						/>
						<div className="flex flex-col items-start self-end py-2.25">
							<p className="bg-app-tint-red mb-2.5 px-2 py-0.5 rounded-full font-semibold text-[12px] text-app-custom-red uppercase">
								Now playing
							</p>
							<p className="font-extrabold text-[40px] uppercase">
								{data?.title}
							</p>
							<p className="mb-3.5 w-140 text-[14px]">{data?.synopsis} </p>
							<div className="flex items-center gap-[9.5px]">
								<p className="self-start bg-app-tint-red px-2 py-1.5 rounded-full text-[12px] text-app-custom-red">
									{data?.ageRating.code}
								</p>
								<p className="flex items-center gap-1 bg-app-tint-white px-3.5 py-1 rounded-full text-[12px]">
									<Timer size={14} />
									{data?.runtimeMinutes} Min
								</p>
								<p className="bg-app-tint-white px-3 py-1.5 rounded-full text-[12px]">
									{data?.formats[0].name}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="px-12.75">
					<p className="mb-6 font-extrabold text-[20px]">Sessions</p>
					<div>
						<Dates
							className="mb-6.75 size-20"
							dayStyles="text-[12px] font-semibold"
							dateStyles="font-extrabold text-[18px]"
						/>
					</div>
					<div className="flex justify-between">
						<MovieSessions id={id} />
						<MovieDescription description={data} />
					</div>
				</div>
			</section>
		)
	);
}

function MovieSessions({ id }: { id: string | undefined }) {
	const { data, isPending, isError, error } = useQuery({
		queryKey: ["movieSessions", id],
		queryFn: getMovieSessions,
	});

	return (
		<ul className="flex flex-col gap-6.75">
			{!isPending &&
				data?.map((s, i) => (
					<li key={i}>
						<p className="mb-4 font-extrabold text-[14px]">{s.venue.name}</p>
						<ul className="flex gap-2.5">
							{s.sessions.map((s) => (
								<li
									key={s.id}
									className="flex flex-col bg-app-card p-3.75 rounded-[18px] w-113.5"
								>
									<p className="mb-2.25 font-semibold text-[12px]">
										Hall {s.hall.name}
									</p>
									<div className="flex self-start bg-app-page rounded-xl divide-x-2 divide-dashed divide-white min-w-51.75">
										<div className="relative flex flex-col justify-center items-center gap-x-1.5 py-3 w-31">
											<div className="-top-1.5 right-[-6.5px] absolute bg-app-card rounded-full size-3" />
											<div className="right-[-6.5px] -bottom-1.5 absolute bg-app-card rounded-full size-3" />
											<p className="justify-self-center col-span-2 font-extrabold text-[20px]">
												{s.time}
											</p>
											<div className="flex items-center gap-1">
												<p className="text-[12px] text-app-secondary">
													{s.language.code}
												</p>
												<p className="bg-app-card px-3 py-0.75 rounded-full font-semibold text-[12px] text-app-secondary">
													{s.format.name}
												</p>
											</div>
										</div>
										<div className="flex flex-col justify-center items-center px-4.25 py-[18.5px]">
											<p className="font-extrabold text-[18px] text-app-custom-red">
												₾ {s.price}
											</p>
											<p className="flex items-center gap-1 text-[12px] text-app-secondary">
												<TbTicketFilled size={12} className="-rotate-45" />
												{s.seatsLeft} left
											</p>
										</div>
									</div>
								</li>
							))}
						</ul>
					</li>
				))}
		</ul>
	);
}

function MovieDescription({
	description,
}: {
	description: MovieDetailsType | undefined;
}) {
	const formats = description?.formats.map((f) => f.name).join(", ");

	return (
		<div className="w-110.25">
			<p className="mb-4.25 font-extrabold text-[20px]">Details</p>
			<ul className="flex flex-col gap-4.25">
				<li>
					<p className="font-semibold text-[12px] text-app-secondary uppercase">
						Director
					</p>
					<p className="font-semibold text-[14px]">{description?.director}</p>
				</li>
				<li>
					<p className="font-semibold text-[12px] text-app-secondary uppercase">
						Main cast
					</p>
					<p className="font-semibold text-[14px]">{description?.cast}</p>
				</li>
				<li>
					<p className="font-semibold text-[12px] text-app-secondary uppercase">
						Duration
					</p>
					<p className="font-semibold text-[14px]">
						{description?.runtimeMinutes} minutes
					</p>
				</li>
				<li>
					<p className="font-semibold text-[12px] text-app-secondary uppercase">
						Release date
					</p>
					<p className="font-semibold text-[14px]">
						{new Date(description?.releaseDate).toLocaleString("en-GB", {
							month: "long",
							day: "numeric",
							year: "numeric",
						})}
					</p>
				</li>
				<li>
					<p className="font-semibold text-[12px] text-app-secondary uppercase">
						Formats
					</p>
					<ul>
						<p className="font-semibold text-[14px]">{formats}</p>
					</ul>
				</li>
				<li>
					<p className="font-semibold text-[12px] text-app-secondary uppercase">
						From
					</p>
					<p className="font-semibold text-[14px]">
						₾ {description?.fromPrice}
					</p>
				</li>
				{description?.ageRating.minAge >= 16 && (
					<div className="bg-app-custom-orange/10 px-3.25 py-1.5 rounded-xl text-app-custom-orange">
						<p>Rating note</p>
						<p className="flex gap-1.75">
							<span>16+</span>
							<span>
								Not recommended for under-16s. Tickets require an account aged
								16 or over.
							</span>
						</p>
					</div>
				)}
			</ul>
		</div>
	);
}
