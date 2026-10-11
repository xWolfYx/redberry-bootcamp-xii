import { X } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import BlurWrapper from "./BlurWrapper";
import Button from "./Button";

export default function AuthModal() {
	const modal = useAuthStore((state) => state.modal);
	const closeModal = useAuthStore((state) => state.closeModal);

	if (!modal) return null;

	return (
		<>
			<BlurWrapper isOpen={!!modal} closeFn={closeModal} />
			<div className="top-1/2 left-1/2 z-20 fixed flex flex-col bg-app-page px-8 py-7 rounded-[28px] w-100.75 h-99.75 -translate-x-1/2 -translate-y-1/2 transform">
				{modal === "login" ? <Login /> : <Register />}
			</div>
		</>
	);
}

function Login() {
	const openRegister = useAuthStore((state) => state.openRegister);
	const closeModal = useAuthStore((state) => state.closeModal);

	return (
		<div className="flex flex-col">
			<div className="grid grid-cols-2 grid-rows-2 mb-2">
				<p className="font-extrabold text-[20px]">Log in</p>
				<Button
					onClick={closeModal}
					className="justify-self-end bg-transparent size-8"
				>
					<X size={20} color="white" />
				</Button>
				<p className="text-[12px] text-app-secondary">
					Welcome back to Kino XII
				</p>
			</div>
			<form className="flex flex-col gap-6.5">
				<div className="flex flex-col gap-2">
					<label htmlFor="email" className="text-[12px]">
						Email
					</label>
					<input
						type="email"
						id="email"
						placeholder="example@gmail.com"
						className="bg-app-card px-4 py-2.5 rounded-xl font-semibold text-[12px]"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="email" className="text-[12px]">
						Password
					</label>
					<input
						type="email"
						id="password"
						placeholder="••••••••"
						className="bg-app-card px-4 py-3 rounded-xl font-semibold text-[12px]"
					/>
				</div>
				<div className="flex flex-col justify-between items-center gap-6">
					<Button className="self-stretch py-2.5">Log in</Button>
					<p className="flex gap-1.25 text-[14px]">
						Don't have an account?
						<Button
							onClick={openRegister}
							className="inline bg-transparent font-semibold text-app-custom-red"
						>
							Sign up
						</Button>
					</p>
				</div>
			</form>
		</div>
	);
}

function Register() {
	return <div>Register</div>;
}
