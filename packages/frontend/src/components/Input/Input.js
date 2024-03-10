import React from "react";

export function Input(props){
    return (
        <div>
            <label className="text-sm font-medium text-gray-900 block mb-2">{props.children}</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={props.placeholder}></input>
        </div>
       
    );
}

