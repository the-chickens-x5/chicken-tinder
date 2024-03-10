import React, { useState } from "react";
import { SmallButton } from "../components/Input/Buttons";
import TextButtonInput from "../components/Input/TextButtonInput";
import { Input } from "../components/Input/Input";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";

export default async function LoginPage(){
    const navigate = useNavigate();
    const [emailValue, setEmail] = useState();
    const [passValue, setPassword] = useState();

    async function checkAuth(email, pass){
        
    }

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangePass = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div className="flex flex-col space-y-normal justify-center w-5/6">
            <form>
                <Input placeholder="user@chickentinder.com" onChange={handleChangeEmail}>Email</Input>
                <Input onChange={handleChangePass}>Password</Input> 
                <SmallButton buttonText="Submit" onClick={await checkAuth(emailValue, passValue)}></SmallButton>
            </form>
           
        </div>
    )
}