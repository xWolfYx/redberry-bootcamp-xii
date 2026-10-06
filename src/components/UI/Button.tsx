import { Link } from "react-router";
import { twMerge } from "tailwind-merge";

export default function Button({
	children,
	className,
	href,
	onClick,
}: {
	children: string | React.ReactNode;
	href?: string;
	className?: string;
	onClick?: () => void;
}) {
	const buttonStyles =
		"flex items-center gap-2 bg-white px-5.5 py-3.25 rounded-full font-bold text-[14px] text-black cursor-pointer";

	return href ? (
		<Link to={href} className={twMerge(buttonStyles, className)}>
			{children}
		</Link>
	) : (
		<button
			type="button"
			onClick={onClick}
			className={twMerge(buttonStyles, className)}
		>
			{children}
		</button>
	);
}
