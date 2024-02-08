import React from "react";
import { FullWidthButton } from "../components/Input/Buttons";
import TextButtonInput from "../components/Input/TextButtonInput";

export default function GroupCreation() {
    return (
        <div className="flex flex-col space-y-normal justify-center w-5/6">
            <FullWidthButton onClick={() => console.log("Creating group")}>
                Rally my flock
            </FullWidthButton>
            <TextButtonInput
                placeholder="Or enter coop name to join a flock"
                buttonText="let's go -->"
                onClick={(input) => console.log("Joining group with name", input)}
            />
        </div>
    )
}