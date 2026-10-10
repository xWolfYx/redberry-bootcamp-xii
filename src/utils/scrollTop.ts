import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollTop() {
	const { pathname, search } = useLocation();
	const page = new URLSearchParams(search).get("page");

	// Line 10 is suppressing the false Biome warning
	// So if you don't want to have the annoying red line, don't delete it.

	// biome-ignore lint/correctness/useExhaustiveDependencies: pathname triggers scrolling on route changes.
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname, page]);

	return null;
}
