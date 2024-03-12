import React from "react";

export function Input(props){
    return (
        <div className="flex flex-col w-full">
            <span className="text-sm font-medium text-gray-900 mb-2">{props.children}</span>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-5" placeholder={props.placeholder} onChange={props.onChange} type={props.type} required={props.required} value={props.value}/>
        </div>

    );
}

