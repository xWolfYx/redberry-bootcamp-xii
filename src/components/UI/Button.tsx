import { Link } from "react-router";
import { twMerge } from "tailwind-merge";

export default function Button({
	children,
	className,
}: {
	children: string | React.ReactNode;
	className?: string;
}) {
	return (
		<Link
			to="#"
			className={twMerge(
				`flex items-center gap-2 bg-white px-5.5 py-3.25 rounded-full font-bold text-[14px] text-black`,
				className,
			)}
		>
			{children}
		</Link>
	);
}
