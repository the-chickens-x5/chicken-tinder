import React, { useContext, useEffect, useState } from "react";
import GroupListPage from "./GroupListPage";
import NominationPage from "./NominationPage";
import VotingPage from "./VotingPage";
import WinnerPage from "./WinnerPage";
import LoadingPage from "./LoadingPage";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthContext from "../context/auth-context";
import CoopContext from "../context/coop-context";

export default function MainFlockPage() {
	const params = useParams();
	const navigate = useNavigate();
	const [flock, setFlock] = useState(null);
	const [loading, setLoading] = useState(true);
	const auth = useContext(AuthContext);
	const coop = useContext(CoopContext);

	async function loadFlockState() {
		try {
			setLoading(true);
			const resp = await fetch(`${process.env.REACT_APP_API_URL}/flocks/${params.coopName}`);
			if (resp.status >= 200 && resp.status < 300) {
				const jsn = await resp.json();
				setFlock(jsn);
			} else {
				toast.error("Failed to load the flock info");
			}
			setLoading(false);
		} catch (e) {
			console.error(e);
			toast.error("Failed to load the flock info");
			navigate("/welcome");
			setLoading(false);
		}
	}

	async function nextStep(e, jump = null) {
		e.preventDefault();
		try {
			const body = jump ? { step: jump } : {};
			const resp = await fetch(
				`${process.env.REACT_APP_API_URL}/flocks/${params.coopName}/step`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${auth.token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(body),
				}
			);
			if (resp.status < 300 && resp.status >= 200) {
				const jsn = await resp.json();
				setFlock(jsn);
			} else {
				toast.error("Can't go to next step - are you the mother hen?");
			}
		} catch (e) {
			toast.error("Error while attempting to step through pages");
		}
	}

	useEffect(() => {
		loadFlockState();
	}, []);

	useEffect(() => {
		if (!localStorage.getItem("chickName")) {
			navigate(`/flock/${params.coopName}/join`);
		}
	}, []);

	useEffect(() => {
		if (coop.lastMessage && coop.lastMessage.type === "flock-updated") {
			setFlock(coop.lastMessage.newState);
		}
	}, [coop.lastMessage]);

	return (
		<>
			{loading ? (
				<LoadingPage />
			) : (
				(() => {
					if (flock.step === 1) {
						return <GroupListPage nextStep={nextStep} flock={flock} />;
					} else if (flock.step === 2) {
						return <NominationPage nextStep={nextStep} flock={flock} />;
					} else if (flock.step === 3) {
						return <VotingPage loadFlockState={loadFlockState} flock={flock} />;
					} else if (flock.step === 4) {
						return <WinnerPage nextStep={nextStep} flock={flock} />;
					} else {
						return <div>Something went horribly wrong...</div>;
					}
				})()
			)}
		</>
	);
}
