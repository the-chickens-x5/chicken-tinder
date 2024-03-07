import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FullWidthText } from "../components/Input/Text";
import TextButtonInput from "../components/Input/TextButtonInput";
import LoadingPage from "./LoadingPage";
import { toast } from "react-hot-toast";

export default function NameFormPage() {
	const navigate = useNavigate();
	const params = useParams();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function checkChickAndFlock() {
			const chickId = localStorage.getItem("chickId");
			if (chickId) {
				const chickResponse = await fetch(
					`${process.env.REACT_APP_API_URL}/flocks/${params.coopName}/chicks/${chickId}`
				);
				console.log(chickResponse.status);
				if (chickResponse.status === 200) {
					localStorage.setItem("chickName", chickResponse.name);
					navigate(`/flock/${params.coopName}/lobby/`);
					return;
				}
			}

			localStorage.clear();

			const flockResponse = await fetch(
				`${process.env.REACT_APP_API_URL}/flocks/${params.coopName}/basket`
			);
			if (flockResponse.status === 200) {
				setLoading(false);
			} else {
				navigate("/welcome");
			}
		}

		checkChickAndFlock();
	}, [navigate, params.coopName]);

	async function addChick(name) {
		const result = await fetch(
			process.env.REACT_APP_API_URL + `/flocks/${params.coopName}/chicks`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name: name }),
			}
		);

		if (result.status === 400) {
			toast.error("Chick already exists", {
				position: "bottom-right",
			});
			return null;
		} else {
			return result.json();
		}
	}

	async function onClick(chickName) {
		const chick = await addChick(chickName);
		if (chick) {
			localStorage.setItem("chickName", chick.name);
			localStorage.setItem("chickId", chick._id);
			navigate(`/flock/${params.coopName}/lobby/`);
		}
	}

	return (
		<>
			{loading ? (
				<LoadingPage />
			) : (
				<div className="flex flex-col space-y-normal justify-center w-5/6">
					<FullWidthText>What's your name?</FullWidthText>
					<TextButtonInput
						placeholder="Chickie McDee"
						buttonText="let's go -->"
						onClick={onClick}
					/>
				</div>
			)}
		</>
	);
}
