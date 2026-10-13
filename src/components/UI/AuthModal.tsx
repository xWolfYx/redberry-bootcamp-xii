import clsx from "clsx";
import { Upload, X } from "lucide-react";
import { useForm } from "react-hook-form";
import type { LoginFormValues } from "../../api/authTypes";
import { useAuthStore } from "../../store/authStore";
import AuthFieldError from "./AuthFieldError";
import BlurWrapper from "./BlurWrapper";
import Button from "./Button";

export default function AuthModal() {
	const modal = useAuthStore((state) => state.modal);
	const closeModal = useAuthStore((state) => state.closeModal);
	const openRegister = useAuthStore((state) => state.openRegister);
	const openLogin = useAuthStore((state) => state.openLogin);

	if (!modal) return null;

	return (
		<>
			<BlurWrapper isOpen={!!modal} closeFn={closeModal} />
			<div
				className={clsx(
					"top-1/2 left-1/2 z-20 fixed flex flex-col bg-app-page px-8 py-7 rounded-[28px] min-w-100.75 -translate-x-1/2 -translate-y-1/2 transform",
					{ "w-118.75": modal === "register" },
				)}
			>
				<div className="gap-y-0.5 grid grid-cols-2 grid-rows-2 mb-2">
					<p className="font-extrabold text-[20px]">
						{modal === "register" ? "Sign up" : "Log in"}
					</p>
					<Button
						onClick={closeModal}
						className="justify-self-end bg-transparent size-6"
					>
						<X size={20} color="white" />
					</Button>
					<p className="text-[12px] text-app-secondary">
						Welcome {modal === "login" ? "back" : ""} to Kino XII
					</p>
				</div>
				{modal === "login" ? <Login /> : <Register />}
				<div className="flex flex-col justify-between items-center mt-6">
					<p className="flex gap-1.25 text-[14px] text-app-secondary">
						{modal === "login"
							? "Don't have an account?"
							: "Already have an account?"}
						<Button
							onClick={modal === "register" ? openLogin : openRegister}
							className="inline bg-transparent font-semibold text-app-custom-red"
						>
							{modal === "login" ? "Sign up" : "Log in"}
						</Button>
					</p>
				</div>
			</div>
		</>
	);
}

function Login() {
	const onSubmit = (values: LoginFormValues) => console.log(values);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>();
	return (
		<div className="flex flex-col">
			<form className="flex flex-col gap-5.5" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-2">
					<label
						htmlFor="email"
						className={clsx("text-[12px]", {
							"text-app-custom-red": errors.email,
						})}
					>
						Email
					</label>
					<input
						type="email"
						id="email"
						placeholder="example@gmail.com"
						className={clsx(
							"bg-app-card px-4 py-3 rounded-xl font-semibold text-[12px]",

							{
								"border border-app-custom-red outline-app-custom-red":
									errors.email,
							},
						)}
						{...register("email", {
							required: "Email field shouldn't be empty",
							pattern: {
								value: /^\S+@\S+\.\S+$/,
								message: "Enter a valid email address",
							},
						})}
					/>
					{errors.email && <AuthFieldError message={errors.email.message} />}
				</div>
				<div className="flex flex-col gap-2 mb-8">
					<label
						htmlFor="password"
						className={clsx("text-[12px]", {
							"text-app-custom-red": errors.password,
						})}
					>
						Password
					</label>
					<input
						type="password"
						id="password"
						placeholder="••••••••"
						className={clsx(
							"bg-app-card px-4 py-3 rounded-xl font-semibold text-[12px]",

							{
								"border border-app-custom-red outline-app-custom-red":
									errors.password,
							},
						)}
						{...register("password", {
							required: "Password field shouldn't be empty",
							minLength: { value: 3, message: "At least 3 characters" },
						})}
					/>
					{errors.password && (
						<AuthFieldError message={errors.password.message} />
					)}
				</div>
				<Button type="submit" className="py-2.5">
					Log in
				</Button>
			</form>
		</div>
	);
}

function Register() {
	return (
		<div className="flex flex-col">
			<form className="flex flex-col gap-6.5">
				<div className="relative flex gap-3 mb-2 cursor-pointer">
					<input
						type="file"
						id="img"
						className="z-10 absolute inset-0 opacity-0 cursor-pointer"
						accept="image/png, image/jpeg, image/webp"
					/>
					<div className="flex justify-center items-center bg-app-raised rounded-lg size-10 text-app-disabled cursor-pointer shrink-0">
						<Upload size={16} />
					</div>
					<div className="flex flex-col w-full">
						<label htmlFor="img" className="font-extrabold text-[14px]">
							Upload avatar (optional)
						</label>
						<span className="text-[12px] text-app-secondary">
							JPG, PNG or WEBP
						</span>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="userName" className="text-[12px]">
						Username
					</label>
					<input
						type="text"
						id="userName"
						placeholder="John"
						className="bg-app-card px-4 py-2.5 rounded-xl font-semibold text-[12px]"
					/>
				</div>
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
				<div className="flex *:flex-1 gap-2.25 mb-6">
					<div className="flex flex-col gap-2">
						<label htmlFor="password" className="text-[12px]">
							Password
						</label>
						<input
							type="password"
							id="password"
							placeholder="••••••••"
							className="bg-app-card px-4 py-3 rounded-xl font-semibold text-[12px]"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="confirm-password" className="text-[12px]">
							Confirm password
						</label>
						<input
							type="password"
							id="confirm-password"
							placeholder="••••••••"
							className="bg-app-card px-4 py-3 rounded-xl font-semibold text-[12px]"
						/>
					</div>
				</div>
				<Button className="py-2.5">Sign up</Button>
			</form>
		</div>
	);
}
