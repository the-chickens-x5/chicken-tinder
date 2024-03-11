import React, { useContext, useState } from "react";
import { FullWidthButton, SmallButton } from "../components/Input/Buttons";
import TextButtonInput from "../components/Input/TextButtonInput";
import { Input } from "../components/Input/Input";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";
import toast from "react-hot-toast";

export default function LoginPage(){
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [emailValue, setEmail] = useState("");
    const [passValue, setPassword] = useState("");
    const [UserName, setUserName] = useState("");
    const redirectPath = new URLSearchParams(window.location.search).get("redirect") || "/welcome";

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangePass = (event) => {
        setPassword(event.target.value);
    }

    const handleChangeUserName = (event) => {
        setUserName(event.target.value);
    }

    async function handleRegister(event) {
        event.preventDefault();
        try{
            const result = await fetch(
                `${process.env.REACT_APP_API_URL}/auth/register`,
                { 
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({name: UserName, email: emailValue, pass: passValue})
                }
            );
            if (result.status === 201){
                toast.success("Registration successful!");
                navigate(`/login`);
            }
            else{
                toast.error("Registration failed. Please try again.");
            }
        } catch(e){
            console.error(e);
        }
    }


    return (
        <div className="flex flex-col space-y-normal justify-center w-5/6">
            <form className="flex flex-col space-y-10 justify-center items-center">
                <Input placeholder="chickenFeet123" onChange={handleChangeUserName}>Username</Input>
                <Input placeholder="user@chickentinder.com" onChange={handleChangeEmail}>Email</Input>
                <Input onChange={handleChangePass}>Password</Input> 
                <FullWidthButton onClick={handleRegister}>Register</FullWidthButton>
            </form>
           
        </div>
    )
}