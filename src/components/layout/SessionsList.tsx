import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TbTicketFilled } from "react-icons/tb";
import { useSearchParams } from "react-router";
import Button from "../UI/Button";

const apiUrl = import.meta.env.VITE_REDBERRY_API;

async function getSessions({ queryKey }) {
	const [_, queryString] = queryKey;
	const url = `${apiUrl}/sessions?${queryString}`;

	const res = await fetch(url);

	if (!res.ok) throw new Error(`Failed to filter options ${res.status}`);

	const { data } = await res.json();
	return data;
}

export default function SessionsList({ sorts }) {
	const [searchParams, setSearchParams] = useSearchParams();

	const currentSort = searchParams.get("sort") || "time_asc";


	const currentPage = Number(searchParams.get("page") || 1);

	const setPage = (page: number) => {
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			next.set("page", String(page));
			return next;
		});
	};

	const { data, isPending, isError, error } = useQuery({
		queryKey: ["sessions", searchParams.toString()],
		queryFn: getSessions,
	});

	const lastPage = data?.meta.lastPage ?? 1;
	const startPage = Math.max(1, currentPage - 2);
	const endPage = Math.min(lastPage, currentPage + 2);
	const visiblePages = Array.from(
		{ length: endPage - startPage + 1 },
		(_, i) => startPage + i,
	);

	return (
		<div className="col-start-2 row-start-2 -row-end-1 font-semibold text-[14px]">
			<div className="flex justify-between">
				<p className="mb-6">
					{isPending ? (
						<>
							Showing <span className="loading loading-xs loading-infinity" />{" "}
							sessions
						</>
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
						value={currentSort}
						onChange={(e) => setSortParam(e)}
					>
						{sorts?.map((s) => (
							<option key={s.id} value={s.id}>
								{s.label}
							</option>
						))}
					</select>
				</div>
			</div>
			<ul className="flex flex-col gap-8">
				{isPending
					? Array.from({ length: 3 }).map((_, i) => (
							<SessionCardSkeleton key={i} />
						))
					: data?.map(({ movie, sessions }, i: number) => (
							<Fragment key={movie.id}>
								{i !== 0 && <hr className="text-app-raised" />}
								<MovieCard movie={movie} />
								<ul className="flex gap-3">
									{sessions.map((s) => (
										<SessionCard session={s} key={s.id} />
									))}
								</ul>
							</Fragment>
						))}
			</ul>
			<div className="flex *:flex justify-center *:justify-center items-center *:items-center gap-2.5 *:bg-app-card *:hover:bg-app-raised mt-13 *:p-0 *:size-10 *:text-white transition *:duration-350">
				{/* Pagination */}
				{!isPending && (
					<>
						<Button
							isDisabled={currentPage === 1}
							onClick={() => setPage(currentPage - 1)}
						>
							<IoIosArrowBack size={13} />
						</Button>

						{visiblePages[0] > 1 && (
							<>
								<Button onClick={() => setPage(1)}>1</Button>
								{visiblePages[0] > 2 && <span>...</span>}
							</>
						)}

						{visiblePages.map((page) => (
							<Button
								key={page}
								onClick={() => setPage(page)}
								className={
									currentPage === page
										? "bg-app-custom-red!"
										: "bg-transparent!"
								}
							>
								{page}
							</Button>
						))}

						{visiblePages[visiblePages.length - 1] < lastPage && (
							<>
								{visiblePages[visiblePages.length - 1] < lastPage - 1 && (
									<span>...</span>
								)}
								<Button onClick={() => setPage(lastPage)}>{lastPage}</Button>
							</>
						)}
						<Button
							isDisabled={currentPage === data.meta.lastPage}
							onClick={() => setPage(currentPage + 1)}
						>
							<IoIosArrowForward size={13} />
						</Button>
					</>
				)}
			</div>
		</div>
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
			<div className="items-between items-start gap-y-1.5 grid grid-cols-[1fr_auto] grid-rows-[auto_auto_auto] bg-app-card p-3.75 rounded-2xl w-63 h-26">
				<p className="self-start font-bold text-[18px]">
					{new Date(session.startsAt).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
						hour12: false,
					})}
				</p>
				<p className="flex justify-center items-center bg-app-raised px-2.5 py-1 rounded-full font-light text-[12px]">
					{session.format.name}
				</p>
				<p className="font-light text-[12px] text-app-secondary">
					{session.language.name}
				</p>
				<p
					className={`flex items-center gap-1 justify-self-end text-[12px] font-light ${session.seatsLeft < 10 ? "text-app-custom-red" : "text-app-custom-green"}`}
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

function SessionCardSkeleton() {
	return (
		<>
			<div className="inline-grid self-start gap-x-4 gap-y-3 grid-cols-[auto_auto_auto] grid-rows-2">
				<div className="row-start-1 -row-end-1 rounded-lg w-14 h-20 skeleton" />
				<div className="self-end w-30 h-6 skeleton" />
				<div className="justify-self-start self-end bg-app-tint-red rounded-full w-8 h-5 skeleton" />
				<div className="w-14 h-5 skeleton" />
			</div>
			<div className="flex gap-3.5">
				{Array.from({ length: 5 }).map((_, i) => (
					<div
						className="gap-y-1.5 grid grid-cols-[1fr_auto] grid-rows-[auto_auto_auto] bg-app-card p-3.75 rounded-2xl w-63 h-26"
						key={i}
					>
						<div className="self-start w-14 h-5.5 skeleton" />
						<div className="flex justify-center items-center bg-app-raised rounded-full w-17 h-6 skeleton" />
						<div className="w-25 h-3.5 font-light skeleton" />
						<div className="justify-self-end w-12 h-3.5 font-light skeleton" />
						<div className="w-28 h-3.5 font-light skeleton" />
						<div className="justify-self-end w-8 h-3.5 font-light skeleton" />
					</div>
				))}
			</div>
		</>
	);
}
