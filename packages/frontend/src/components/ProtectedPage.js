import React, { useContext, useEffect } from "react";
import AuthContext from "../context/auth-context";
import { useNavigate } from "react-router-dom";

export default function ProtectedPage(props) {
	const { isLoggedIn, token } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoggedIn) {
			navigate("/login?redirect=" + window.location.pathname);
		}
	}, [isLoggedIn, token]);

	return props.children;
}
