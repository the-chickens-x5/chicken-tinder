import React, { useState } from "react";
import { FullWidthButton } from "../components/Input/Buttons";
import { Input } from "../components/Input/Input";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function RegisterPage() {
	const navigate = useNavigate();
	const [emailValue, setEmail] = useState("");
	const [passValue, setPassword] = useState("");
	const [userName, setUserName] = useState("");

	const handleChangeEmail = (event) => {
		setEmail(event.target.value);
	};

	const handleChangePass = (event) => {
		setPassword(event.target.value);
	};

	const handleChangeUserName = (event) => {
		setUserName(event.target.value);
	};

	async function handleRegister(event) {
		event.preventDefault(); // prevents refresh of page (or whatever default event)
		try {
			const result = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name: userName, email: emailValue, pass: passValue }),
			});
			if (result.status === 201) {
				toast.success("Registration successful!");
				navigate(`/login`);
			} else {
				toast.error("Registration failed. Please try again.");
			}
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<div className="flex flex-col space-y-normal justify-center w-5/6">
			<form className="flex flex-col space-y-10 justify-center items-center">
				<Input placeholder="chickenFeet123" onChange={handleChangeUserName}>
					Username
				</Input>
				<Input placeholder="user@chickentinder.com" onChange={handleChangeEmail}>
					Email
				</Input>
				<Input onChange={handleChangePass}>Password</Input>
				<FullWidthButton onClick={handleRegister}>Register</FullWidthButton>
			</form>
		</div>
	);
}
