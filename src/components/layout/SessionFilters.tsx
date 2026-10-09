export default function SessionFilters({ filterData, isPending }) {
	return (
		<>
			{isPending ? (
				<SessionFiltersSkeleton />
			) : (
				<div className="flex flex-col gap-6 row-start-2 -row-end-1 bg-app-card p-6 rounded-2xl w-[320px]">
					<p className="mb-6 font-bold text-[18px]">Filters</p>
					<Venues venues={filterData.venues} />
					<hr className="text-app-raised" />
					<Dates />
					<hr className="text-app-raised" />
					<Format formats={filterData.formats} />
					<hr className="text-app-raised" />
					<Language languages={filterData.languages} />
					<hr className="text-app-raised" />
					<TimeBand timeBands={filterData.timeBands} />
					<hr className="text-app-raised" />
					<p className="mt-15.25 text-[12px] text-app-secondary text-center">
						0 filters active
					</p>
				</div>
			)}
		</>
	);
}

function SessionFiltersSkeleton() {
	return (
		<div className="flex flex-col gap-6 row-start-2 -row-end-1 bg-app-card p-6 rounded-2xl w-[320px]">
			<p className="mb-6 font-bold text-[18px]">Filters</p>
			{/* Venue skeleton */}
			<p className="mb-3 font-semibold text-[12px] text-app-secondary uppercase">
				Venue
			</p>
			<div className="flex flex-col gap-4">
				<div className="flex items-center gap-2.5">
					<div className="rounded-[5px] size-4.5 skeleton" />
					<div className="flex w-35 h-5 skeleton" />
				</div>
				<div className="flex items-center gap-2.5">
					<div className="rounded-[5px] size-4.5 skeleton" />
					<div className="flex w-42 h-5 skeleton" />
				</div>
				<div className="flex items-center gap-2.5">
					<div className="rounded-[5px] size-4.5 skeleton" />
					<div className="flex w-30 h-5 skeleton" />
				</div>
				<div className="flex items-center gap-2.5">
					<div className="rounded-[5px] size-4.5 skeleton" />
					<div className="flex w-40 h-5 skeleton" />
				</div>
			</div>
			<hr className="text-app-raised" />
			{/* Date skeleton */}
			<p className="mb-3 font-semibold text-[12px] text-app-secondary uppercase">
				Date
			</p>
			<div className="flex items-start gap-3 overflow-hidden *:shrink-0">
				<div className="rounded-lg w-9.25 h-14 font-semibold text-[12px] skeleton" />
				<div className="rounded-lg w-9.25 h-14 font-semibold text-[12px] skeleton" />
				<div className="rounded-lg w-9.25 h-14 font-semibold text-[12px] skeleton" />
				<div className="rounded-lg w-9.25 h-14 font-semibold text-[12px] skeleton" />
				<div className="rounded-lg w-9.25 h-14 font-semibold text-[12px] skeleton" />
				<div className="rounded-lg w-9.25 h-14 font-semibold text-[12px] skeleton" />
				<div className="rounded-lg w-9.25 h-14 font-semibold text-[12px] skeleton" />
			</div>
			<hr className="text-app-raised" />
			{/* Format skeleton */}
			<p className="mb-3 font-semibold text-[12px] text-app-secondary uppercase">
				Format
			</p>
			<div className="flex flex-col gap-3">
				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-2.5">
						<div className="rounded-[5px] size-4.5 skeleton" />
						<div className="flex w-35 h-5 skeleton" />
					</div>
					<div className="flex items-center gap-2.5">
						<div className="rounded-[5px] size-4.5 skeleton" />
						<div className="flex w-42 h-5 skeleton" />
					</div>
					<div className="flex items-center gap-2.5">
						<div className="rounded-[5px] size-4.5 skeleton" />
						<div className="flex w-30 h-5 skeleton" />
					</div>
					<div className="flex items-center gap-2.5">
						<div className="rounded-[5px] size-4.5 skeleton" />
						<div className="flex w-40 h-5 skeleton" />
					</div>
					<div className="flex items-center gap-2.5">
						<div className="rounded-[5px] size-4.5 skeleton" />
						<div className="flex w-30 h-5 skeleton" />
					</div>
				</div>
			</div>
			<hr className="text-app-raised" />
			{/* Language skeleton */}
			<p className="mb-3 font-semibold text-[12px] text-app-secondary uppercase">
				Language
			</p>
			<div className="flex flex-col gap-3">
				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-2.5">
						<div className="rounded-[5px] size-4.5 skeleton" />
						<div className="flex w-42 h-5 skeleton" />
					</div>
					<div className="flex items-center gap-2.5">
						<div className="rounded-[5px] size-4.5 skeleton" />
						<div className="flex w-30 h-5 skeleton" />
					</div>
					<div className="flex items-center gap-2.5">
						<div className="rounded-[5px] size-4.5 skeleton" />
						<div className="flex w-40 h-5 skeleton" />
					</div>
					<div className="flex items-center gap-2.5">
						<div className="rounded-[5px] size-4.5 skeleton" />
						<div className="flex w-30 h-5 skeleton" />
					</div>
				</div>
			</div>
			<hr className="text-app-raised" />
			<p className="mb-3 font-semibold text-[12px] text-app-secondary uppercase">
				Time of day
			</p>
			<div className="flex flex-col gap-3">
				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-2.5">
						<div className="rounded-[5px] size-4.5 skeleton" />
						<div className="flex w-42 h-5 skeleton" />
					</div>
					<div className="flex items-center gap-2.5">
						<div className="rounded-[5px] size-4.5 skeleton" />
						<div className="flex w-30 h-5 skeleton" />
					</div>
					<div className="flex items-center gap-2.5">
						<div className="rounded-[5px] size-4.5 skeleton" />
						<div className="flex w-40 h-5 skeleton" />
					</div>
				</div>
			</div>
			<hr className="text-app-raised" />
			<p className="mt-15.25 text-[12px] text-app-secondary text-center">
				0 filters active
			</p>
		</div>
	);
}

function Venues({ venues }) {
	return (
		<>
			<p className="mb-3 font-semibold text-[12px] text-app-secondary uppercase">
				Venue
			</p>
			<ul className="flex flex-col gap-3">
				{venues?.map((v) => (
					<li className="flex items-center gap-2.5" key={v.id}>
						<input
							type="checkbox"
							className="checked:bg-app-custom-red border-app-disabled checked:border-app-custom-red rounded-[5px] size-4.5 text-white checkbox checkbox-primary"
							name={v.name}
							id={`venue-${v.id}`}
						/>
						<label
							htmlFor={`venue-${v.id}`}
							className="flex items-center gap-1.25 text-app-secondary"
						>
							<span className="text-[14px] text-white">{v.name}</span>·
							<span className="text-[12px]">{v.city}</span>
						</label>
					</li>
				))}
			</ul>
		</>
	);
}

function Dates() {
	const dates = Array.from({ length: 7 }, (_, index) => {
		const date = new Date();
		date.setDate(date.getDate() + index);

		return {
			day: date.toLocaleDateString("en-US", { weekday: "short" }),
			date: date.getDate(),
			fullDate: date.toISOString().split("T")[0],
		};
	});

	return (
		<>
			<p className="mb-3 font-semibold text-[12px] text-app-secondary uppercase">
				Date
			</p>

			<ul className="flex items-start gap-3 overflow-hidden shrink-0">
				{dates.map((date) => (
					<li key={date.fullDate}>
						<button
							type="button"
							className="flex flex-col justify-center items-center bg-app-raised px-1.5 py-2.75 rounded-lg w-9.25 font-semibold text-[12px]"
						>
							<span>{date.day}</span>
							<span>{date.date}</span>
						</button>
					</li>
				))}
			</ul>
		</>
	);
}

function Format({ formats }) {
	return (
		<>
			<p className="mb-3 font-semibold text-[12px] text-app-secondary uppercase">
				Format
			</p>
			<ul className="flex flex-col gap-3">
				{formats?.map((f) => (
					<li className="flex items-center gap-2.5" key={f.id}>
						<input
							type="checkbox"
							className="checked:bg-app-custom-red border-app-disabled checked:border-app-custom-red rounded-[5px] size-4.5 text-white checkbox checkbox-primary"
							name={f.name}
							id={`format-${f.id}`}
						/>
						<label
							htmlFor={`format-${f.id}`}
							className="flex items-center gap-1.25 text-[14px] text-white"
						>
							{f.name}
						</label>
					</li>
				))}
			</ul>
		</>
	);
}

function Language({ languages }) {
	return (
		<>
			<p className="mb-3 font-semibold text-[12px] text-app-secondary uppercase">
				Language
			</p>
			<ul className="flex flex-col gap-3">
				{languages?.map((l) => (
					<li className="flex items-center gap-2.5" key={l.id}>
						<input
							type="checkbox"
							className="checked:bg-app-custom-red border-app-disabled checked:border-app-custom-red rounded-[5px] size-4.5 text-white checkbox checkbox-primary"
							name={l.name}
							id={`language-${l.id}`}
						/>
						<label
							htmlFor={`language-${l.id}`}
							className="flex items-center gap-1.25 text-[14px] text-white"
						>
							{l.name}
						</label>
					</li>
				))}
			</ul>
		</>
	);
}

function TimeBand({ timeBands }) {
	return (
		<>
			<p className="mb-3 font-semibold text-[12px] text-app-secondary uppercase">
				Time of day
			</p>
			<ul className="flex flex-col gap-3">
				{timeBands?.map((tb) => (
					<li className="flex items-center gap-2.5" key={tb.id}>
						<input
							type="checkbox"
							className="checked:bg-app-custom-red border-app-disabled checked:border-app-custom-red rounded-[5px] size-4.5 text-white checkbox checkbox-primary"
							name={tb.label}
							id={`time-band-${tb.id}`}
						/>
						<label
							htmlFor={`time-band-${tb.id}`}
							className="flex items-center gap-1.25 text-[14px] text-app-secondary"
						>
							<span className="text-[14px] text-white">
								{tb.label.split(" ")[0]}
							</span>
							·
							<span className="text-[12px]">
								{tb.id === "morning" && "before 12:00"}
								{tb.id === "afternoon" && "12:00 - 18:00"}
								{tb.id === "evening" && "after 18:00"}
							</span>
						</label>
					</li>
				))}
			</ul>
		</>
	);
}
