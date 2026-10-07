import { useQuery } from "@tanstack/react-query";
import SessionFilters from "../components/layout/SessionFilters";
import SessionsList from "../components/layout/SessionsList";

const apiUrl = import.meta.env.VITE_REDBERRY_API;

async function getFilterOptions() {
	const res = await fetch(`${apiUrl}/filter-options`);

	if (!res.ok) throw new Error(`Failed to filter options ${res.status}`);

	const { data } = await res.json();
	return data;
}

export default function Sessions() {
	const { data, isPending, isError, error } = useQuery({
		queryKey: ["filterData"],
		queryFn: getFilterOptions,
	});

	return (
		<main className="gap-x-12.75 gap-y-9 grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] px-12.75 pt-31">
			<div className="row-start-1 row-end-2 mb-9">
				<h2 className="font-bold text-[24px] text-white">Sessions</h2>
				<p className="text-[14px] text-app-secondary">
					Browse showtimes across all venues
				</p>
			</div>
			<SessionFilters filterData={data} isPending={isPending} />
			<SessionsList
				data={data}
				isPending={isPending}
				isError={isError}
				error={error}
			/>
		</main>
	);
}
