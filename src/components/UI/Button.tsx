import { Link } from "react-router";
import { twMerge } from "tailwind-merge";

export default function Button({
	children,
	type,
	className,
	href,
	isDisabled,
	onClick,
}: {
	children: string | React.ReactNode;
	type?: "button" | "submit" | "reset";
	href?: string;
	className?: string;
	isDisabled?: boolean;
	onClick?: () => void;
}) {
	const buttonStyles =
		"flex items-center justify-center gap-2 bg-white rounded-full font-bold text-[14px] text-black cursor-pointer";

	return href ? (
		<Link
			to={href}
			onClick={onClick}
			className={twMerge(buttonStyles, className)}
		>
			{children}
		</Link>
	) : (
		<button
			type={type || "button"}
			disabled={isDisabled}
			onClick={onClick}
			className={twMerge(buttonStyles, className)}
		>
			{children}
		</button>
	);
}
