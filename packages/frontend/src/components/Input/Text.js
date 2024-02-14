import React from "react";

/** 
 * Full width text box with background color secondary and text color gray_text 
*/

export function FullWidthText(props) {
    return (
        <div className="flex items-center justify-center w-full bg-secondary text-gray_text p-4 rounded-normal text-normal">
            {props.children}
        </div>
    );
}


/** 
 * Centered text with text color black and font size big
*/

export function BigText(props) {
    return (
        <div className="flex items-center justify-center text-black text-big font-bold">
            {props.children}
        </div>
    );
}