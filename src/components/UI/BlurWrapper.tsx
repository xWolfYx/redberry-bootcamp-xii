export default function BlurWrapper({
	isOpen,
	closeFn,
}: {
	isOpen: boolean;
	closeFn: () => void;
}) {
	return (
		isOpen && (
			<button
				type="button"
				onClick={closeFn}
				className="fixed inset-0 bg-black/20 backdrop-blur-xs size-full"
			/>
		)
	);
}
