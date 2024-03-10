import React from "react";
import { SmallButton } from "../components/Input/Buttons";
import TextButtonInput from "../components/Input/TextButtonInput";
import { Input } from "../components/Input/Input";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    const navigate = useNavigate();

    createHen(){
        
    }
    return (
        <div className="flex flex-col space-y-normal justify-center w-5/6">
            <form>
            <Input placeholder="user@chickentinder.com">Email</Input>
            <Input>Password</Input> 
            <SmallButton buttonText="Submit" onClick={createHen}>

            </SmallButton>
            
            </form>
           
        </div>
    )
}