import React, {useContext, useEffect, useState} from "react";
import GroupListPage from "./GroupListPage";
import NominationPage from "./NominationPage";
import VotingPage from "./VotingPage";
import WinnerPage from "./WinnerPage";
import LoadingPage from "./LoadingPage";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthContext from "../context/auth-context";

export default function MainFlockPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [flock, setFlock] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = useContext(AuthContext);

    async function loadFlockState(){
        try {
            setLoading(true);
            const resp = await fetch(`${process.env.REACT_APP_API_URL}/flocks/${params.coopName}`)
            if (resp.status >= 200 && resp.status < 300){
                const jsn = await resp.json();
                setFlock(jsn);
            } else {
                toast.error("Failed to load the flock info")
            }
            setLoading(false);
        } catch (e) {
            console.error(e)
            toast.error("Failed to load the flock info")
            navigate("/welcome");
            setLoading(false);
        }
    }

    async function nextStep(){
        setLoading(true);
        try {
            const resp = await fetch(`${process.env.REACT_APP_API_URL}/flocks/${params.coopName}/step`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${auth.token}`
                }}
            )
            if (resp.status < 300 && resp.status >= 200){
                const jsn = await resp.json();
                setFlock(jsn);
            } else {
                toast.error("Can't go to next step - are you the owner?")
            }
        } catch (e) {
            toast.error("Can't go to next step - are you the owner?")
        }
        setLoading(false);
    }

    useEffect(() => {
        loadFlockState();
    }, []);

    useEffect(() => {
        if (!localStorage.getItem("chickName")){
            navigate(`/flock/${params.coopName}/join`);
        }
    }, [])

    return (
        <>
        {loading ? <LoadingPage /> :
            (() => {
                if (flock.step === 1) {
                    return <GroupListPage nextStep={nextStep}/>;
                } else if (flock.step === 2) {
                    return <NominationPage nextStep={nextStep}/>;
                } else if (flock.step === 3) {
                    return <VotingPage loadFlockState={loadFlockState}/>;
                } else if (flock.step === 4) {
                    return <WinnerPage />;
                } else {
                    return <div>Something went horribly wrong...</div>;
                }
            })()
        }
        </>
    )
}