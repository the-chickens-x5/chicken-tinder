import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext({
	token: null,
	isLoggedIn: false,
	login: async (email, password) => {},
	logout: () => {},
});

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(Cookies.get("token") || null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const checkToken = async () => {
		try {
			const checkResp = await fetch(`${process.env.REACT_APP_API_URL}/auth/check`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (checkResp.status === 200) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		} catch (e) {
			setIsLoggedIn(false);
		}
	};

	const login = async (email, pass) => {
		try {
			const loginResp = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, pass }),
			});
			if (loginResp.status === 200) {
				const { token } = await loginResp.json();
				Cookies.set("token", token);
				setToken(token);
				setIsLoggedIn(true);
				return true;
			}
			return false;
		} catch (e) {
			return false;
		}
	};

	const logout = () => {
		Cookies.remove("token");
		setToken(null);
	};

	useEffect(() => {
		if (token) {
			checkToken();
		}
	});

	return (
		<AuthContext.Provider value={{ token, isLoggedIn, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
