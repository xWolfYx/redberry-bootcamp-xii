import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TbTicketFilled } from "react-icons/tb";
import { useSearchParams } from "react-router";
import Button from "../UI/Button";

const apiUrl = import.meta.env.VITE_REDBERRY_API;

async function getSessions({ queryKey }) {
	const [_, queryString] = queryKey;
	const url = `${apiUrl}/sessions?${queryString ? `${queryString}` : ""}`;
	console.log(url);

	const res = await fetch(url);

	if (!res.ok) throw new Error(`Failed to filter options ${res.status}`);

	const { data } = await res.json();
	return data;
}

export default function SessionsList({ sorts }) {
	const [searchParams, setSearchParams] = useSearchParams();

	const currentSort = searchParams.get("sort") || "time_asc";

	const setSortParam = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSearchParams((prev) => {
			prev.set("sort", e.target.value);
			return prev;
		});
	};

	const { data, isPending, isError, error } = useQuery({
		queryKey: ["sessions", searchParams.toString()],
		queryFn: getSessions,
	});

	return (
		<div className="col-start-2 row-start-2 -row-end-1 font-semibold text-[14px]">
			<div className="flex justify-between">
				<p className="mb-6">
					{isPending ? (
						<p>
							Showing <span className="loading loading-infinity loading-xs" />{" "}
							sessions
						</p>
					) : data?.length > 0 ? (
						`Showing ${data.length} sessions`
					) : (
						"No sessions found"
					)}
				</p>
				<div className="flex items-center gap-2">
					<p className="text-[14px] text-app-secondary">Sort:</p>
					<select
						className="h-full select-ghost select"
						onChange={(e) => setSortParam(e)}
					>
						{sorts?.map((s) => (
							<option key={s.id} value={s.id} selected={s.id === currentSort}>
								{s.label}
							</option>
						))}
					</select>
				</div>
			</div>
			<ul className="flex flex-col gap-8">
				{isPending ? (
					<li>
						<SessionCardSkeleton />
					</li>
				) : (
					data?.map(({ movie, sessions }, i: number) => (
						<Fragment key={movie.id}>
							{i !== 0 && <hr className="text-app-raised" />}
							<MovieCard movie={movie} />
							<ul className="flex gap-3">
								{sessions.map((s) => (
									<SessionCard session={s} key={s.id} />
								))}
							</ul>
						</Fragment>
					))
				)}
			</ul>
			<div className="flex *:flex justify-center *:justify-center items-center *:items-center gap-2.5 *:bg-app-card *:hover:bg-app-raised mt-13 *:p-0 *:size-10 *:text-white transition *:duration-350">
				<Button className="">
					<IoIosArrowBack size={13} />
				</Button>
				<Button className="bg-app-custom-red">1</Button>
				<Button>2</Button>
				<Button>3</Button>
				<Button>...</Button>
				<Button>10</Button>
				<Button className="">
					<IoIosArrowForward size={13} />
				</Button>
			</div>
		</div>
	);
}

function SessionsSkeleton() {
	return (
		<li className="col-start-2 row-start-2 -row-end-1 font-semibold text-[14px]">
			<div className="flex justify-between">
				<p>
					Showing <span className="loading loading-infinity loading-xs" />{" "}
					sessions
				</p>
				<div className="flex items-center gap-2">
					<p className="text-[14px] text-app-secondary">Sort:</p>
					<span className="skeleton skeleton-text">
						Loading Sort options...
					</span>
				</div>
			</div>
			<div>Loading...</div>
		</li>
	);
}

function MovieCard({ movie }) {
	return (
		<div className="inline-grid self-start gap-x-4 gap-y-3 grid-cols-[auto_auto_auto] grid-rows-2">
			<img
				src={movie.posterUrl}
				alt={movie.title}
				className="row-start-1 -row-end-1 rounded-lg w-14 h-20 object-cover"
			/>
			<p className="self-end font-extrabold text-[18px]">{movie.title}</p>
			<p className="self-end bg-app-tint-red px-2 py-0.5 rounded-full text-[12px] text-app-custom-red">
				{movie.ageRating.code}
			</p>
			<p className="text-[14px] text-app-secondary">
				{movie.runtimeMinutes} min
			</p>
		</div>
	);
}

function SessionCard({ session }) {
	return (
		<li className="flex flex-col gap-3.5">
			<div className="items-between gap-y-1.5 grid grid-cols-[1fr_auto] grid-rows-[auto_auto_auto] bg-app-card p-3.75 rounded-2xl w-63 h-26">
				<p className="self-start font-bold text-[18px]">
					{new Date(session.startsAt).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
						hour12: false,
					})}
				</p>
				<p className="flex justify-center items-center bg-app-raised rounded-full w-17 h-6 font-light text-[12px]">
					{session.format.name}
				</p>
				<p className="font-light text-[12px] text-app-secondary">
					{session.language.name}
				</p>
				<p
					className={`flex justify-self-end items-center gap-1 font-light text-[12px] ${session.seatsLeft < 10 ? "text-app-custom-red" : "text-app-custom-green"}`}
				>
					<TbTicketFilled size={12} className="-rotate-45" />
					{session.seatsLeft} left
				</p>
				<p className="self-end text-[12px] capitalize">
					{session.hall.venue.name} · hall {session.hall.name}
				</p>
				<p className="justify-self-end capitalize">₾ {session.price}</p>
			</div>
		</li>
	);
}

// TODO: Finish the skeleton
function SessionCardSkeleton() {
	return (
		<div className="flex flex-col gap-3.5">
			<div className="inline-grid self-start gap-x-4 gap-y-3 grid-cols-[auto_auto_auto] grid-rows-2">
				<div className="row-start-1 -row-end-1 rounded-lg w-14 h-20" />
				<div className="self-end" />
				<p className="self-end bg-app-tint-red px-2 py-0.5 rounded-full" />
				<div />
			</div>
			<div className="grid grid-cols-2 grid-rows-3 bg-app-card p-3.75 rounded-2xl w-63 h-26">
				<div className="" />
				<p className="flex justify-center items-center bg-app-raised px-1.25 py-2.5 rounded-full"></p>
				<div className="" />
				<p className={`self-end`}></p>
				<div className="" />
			</div>
		</div>
	);
}
