import React, { useContext } from "react";
import { FullWidthButton } from "../components/Input/Buttons";
import TextButtonInput from "../components/Input/TextButtonInput";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";
import toast from "react-hot-toast";

export default function WelcomePage() {
	const navigate = useNavigate();
	const auth = useContext(AuthContext);

	async function createGroup() {
		if (!auth.isLoggedIn) {
			toast.error("You must be logged in to create a group");
			navigate("/login");
			return;
		}
		const res = await fetch(`${process.env.REACT_APP_API_URL}/flocks`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
		});
		if (res.status === 201) {
			const info = await res.json();
			navigate(`/flock/${info.coopName}/join`);
		} else {
			console.error("Failed to create group");
		}
	}

	return (
		<div className="flex flex-col space-y-normal justify-center w-5/6">
			<FullWidthButton onClick={createGroup}>Rally my flock</FullWidthButton>
			<TextButtonInput
				placeholder="Or enter coop name to join a flock"
				buttonText="let's go -->"
				onClick={(input) => navigate(`/flock/${input}/join`)}
			/>
		</div>
	);
}
