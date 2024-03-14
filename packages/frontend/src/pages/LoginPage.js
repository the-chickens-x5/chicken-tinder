import React, { useContext, useState } from "react";
import { FullWidthButton } from "../components/Input/Buttons";
import { Input } from "../components/Input/Input";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";
import toast from "react-hot-toast";

export default function LoginPage() {
	const navigate = useNavigate();
	const auth = useContext(AuthContext);
	const [emailValue, setEmail] = useState("");
	const [passValue, setPassword] = useState("");
	const redirectPath = new URLSearchParams(window.location.search).get("redirect") || "/welcome";

	const handleChangeEmail = (event) => {
		setEmail(event.target.value);
	};

	const handleChangePass = (event) => {
		setPassword(event.target.value);
	};

	async function handleLogin(event) {
		event.preventDefault();
		const res = await auth.login(emailValue, passValue);
		if (res) {
			navigate(redirectPath);
		} else {
			toast.error("Login failed. Please try again.");
		}
	}

	return (
		<div className="flex flex-col space-y-normal justify-center w-5/6">
			<form className="flex flex-col space-y-10 justify-center items-center">
				<Input placeholder="user@chickentinder.com" onChange={handleChangeEmail}>
					Email
				</Input>
				<div className="flex flex-col w-full">
					<Input onChange={handleChangePass}>Password</Input>
					<span className="text-sm">
						No account?{" "}
						<a href="/register" className="text-blue-500 hover:underline">
							Register here
						</a>
					</span>
				</div>
				<FullWidthButton onClick={handleLogin}>Login</FullWidthButton>
			</form>
		</div>
	);
}
