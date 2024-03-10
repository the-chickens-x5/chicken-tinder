import React, { createContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext({
    token: null,
    login: async (email, password) => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(Cookies.get("token") || null);

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
            }
            return loginResp;
        } catch (e) {
            return e;
        }
    };

    const logout = () => {
        Cookies.remove("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;