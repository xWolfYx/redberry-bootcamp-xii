import type { Dispatch, SetStateAction } from "react";
import { useSearchParams } from "react-router";
import type {
	FilterData,
	Format as FormatType,
	Language as LanguageType,
	TimeBand as TimeBandType,
	Venue as VenueType,
} from "../../api/movieTypes";
import toggleArrayParam from "../../utils/toggleArrayParam";
import Dates from "../UI/Dates";

export default function SessionFilters({
	filterData,
	isPending,
}: {
	filterData: FilterData;
	isPending: boolean;
}) {
	const [searchParams, setSearchParams] = useSearchParams();

	return (
		<>
			{isPending ? (
				<SessionFiltersSkeleton />
			) : (
				<div className="flex flex-col gap-6 row-start-2 -row-end-1 bg-app-card mb-auto p-6 rounded-2xl w-[320px]">
					<p className="mb-6 font-bold text-[18px]">Filters</p>
					<Venues
						venues={filterData?.venues}
						searchParams={searchParams}
						setSearchParams={setSearchParams}
					/>
					<hr className="text-app-raised" />
					<p className="mb-3 font-semibold text-[12px] text-app-secondary uppercase">
						Date
					</p>
					<Dates />
					<hr className="text-app-raised" />
					<Format
						formats={filterData?.formats}
						searchParams={searchParams}
						setSearchParams={setSearchParams}
					/>
					<hr className="text-app-raised" />
					<Language
						languages={filterData?.languages}
						searchParams={searchParams}
						setSearchParams={setSearchParams}
					/>
					<hr className="text-app-raised" />
					<TimeBand
						timeBands={filterData?.timeBands}
						searchParams={searchParams}
						setSearchParams={setSearchParams}
					/>
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

function Venues({
	venues,
	searchParams,
	setSearchParams,
}: {
	venues: VenueType[];
	searchParams: URLSearchParams;
	setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
}) {
	const toggleVenue = (slug: string, checked: boolean) => {
		setSearchParams((prev: URLSearchParams) =>
			toggleArrayParam(prev, "venues[]", slug, checked),
		);
	};

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
							value={v.slug}
							checked={searchParams.getAll("venues[]").includes(v.slug)}
							onChange={(e) => toggleVenue(v.slug, e.target.checked)}
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

function Format({
	formats,
	searchParams,
	setSearchParams,
}: {
	formats: FormatType[];
	searchParams: URLSearchParams;
	setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
}) {
	const toggleFormat = (slug: string, checked: boolean) => {
		setSearchParams((prev: URLSearchParams) =>
			toggleArrayParam(prev, "formats[]", slug, checked),
		);
	};

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
							value={f.slug}
							checked={searchParams.getAll("formats[]").includes(f.slug)}
							onChange={(e) => toggleFormat(f.slug, e.target.checked)}
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

function Language({
	languages,
	searchParams,
	setSearchParams,
}: {
	languages: LanguageType[];
	searchParams: URLSearchParams;
	setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
}) {
	const toggleLanguage = (slug: string, checked: boolean) => {
		setSearchParams((prev: URLSearchParams) =>
			toggleArrayParam(prev, "languages[]", slug, checked),
		);
	};
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
							value={l.slug}
							checked={searchParams.getAll("languages[]").includes(l.slug)}
							onChange={(e) => toggleLanguage(l.slug, e.target.checked)}
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

function TimeBand({
	timeBands,
	searchParams,
	setSearchParams,
}: {
	timeBands: TimeBandType[];
	searchParams: URLSearchParams;
	setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
}) {
	const toggleTimeBand = (slug: string, checked: boolean) => {
		setSearchParams((prev: URLSearchParams) =>
			toggleArrayParam(prev, "bands[]", slug, checked),
		);
	};

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
							value={tb.id}
							checked={searchParams.getAll("bands[]").includes(tb.id)}
							onChange={(e) => toggleTimeBand(tb.id, e.target.checked)}
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
