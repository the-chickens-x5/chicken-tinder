import React from "react";
import {ReactComponent as Logo} from "../images/chicken_logo.svg";

export default function Header() {
    return (
        <div className="flex flex-row bg-primary justify-center p-4">
            <div className="flex rounded-full bg-white items-center justify-center w-[162px] h-[162px]">
                <Logo />
            </div>
        </div>
    )
}