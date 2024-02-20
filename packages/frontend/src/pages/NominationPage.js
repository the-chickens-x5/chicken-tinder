import React, { useEffect, useState } from "react";
import { FullWidthText } from "../components/Input/Text";
import TextButtonInput from "../components/Input/TextButtonInput";
import { BigText } from "../components/Input/Text";
import { SmallButton } from "../components/Input/Buttons";
import { useParams } from "react-router";


export default function NominationPage() {
    const params = useParams();
    const [restaurants, setRestaurants] = useState([]);

    async function postEggs(name) {
        const result = await fetch(`${process.env.REACT_APP_API_URL}/flocks/${params.coop_name}/basket/${name}`, { method: "POST" });
        return result;
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/flocks/${params.coop_name}/basket/`)
            .then(response => response.json())
            .then(data => setRestaurants(data))
            .catch(error => console.error('Error:', error));
    }, []);


	return (
		<div className="flex flex-col space-y-normal justify-center w-5/6">
			<FullWidthText>Put your eggs in the basket</FullWidthText>
			<TextButtonInput
				placeholder="Restaurant Name"
				buttonText="submit"
				onClick={(input) => {
					console.log("Restaurant name submitted", input);
					postEggs(input);
				}}
			/>
			<BigText>The Basket</BigText>
            {restaurants.map((restaurant, index) => (
                <p key={index}>{restaurant.name}</p>
            ))}
			<SmallButton buttonText="let's go -->" />
		</div>
	);
}
