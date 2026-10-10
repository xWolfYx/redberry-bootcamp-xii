import { twMerge } from "tailwind-merge";

export default function Dates({
	className,
	dayStyles,
	dateStyles,
}: {
	className?: string;
	dayStyles?: string;
	dateStyles?: string;
}) {
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
		<ul className="flex items-start gap-3 overflow-hidden shrink-0">
			{dates.map((date) => (
				<li key={date.fullDate}>
					<button
						type="button"
						className={twMerge(
							"flex flex-col justify-center items-center bg-app-raised px-1.5 py-2.75 rounded-lg w-9.25 font-semibold text-[12px]",
							className,
						)}
					>
						<span className={dayStyles}>{date.day}</span>
						<span className={dateStyles}>{date.date}</span>
					</button>
				</li>
			))}
		</ul>
	);
}
