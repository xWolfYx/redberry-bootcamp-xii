export default function toggleArrayParam(
	params: URLSearchParams,
	paramName: string,
	value: string,
	checked: boolean,
) {
	const next = new URLSearchParams(params);
	const selected = next.getAll(paramName).filter((item) => item !== value);

	next.delete(paramName);

	const updated = checked ? [...selected, value] : selected;
	updated.map((item) => next.append(paramName, item));

	next.set("page", "1");

	return next;
}
