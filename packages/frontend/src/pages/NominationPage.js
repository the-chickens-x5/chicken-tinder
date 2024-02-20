import React, { useEffect, useState } from "react";
import { FullWidthText } from "../components/Input/Text";
import TextButtonInput from "../components/Input/TextButtonInput";
import { BigText } from "../components/Input/Text";
import { SmallButton } from "../components/Input/Buttons";


export default function NominationPage() {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/flocks/flyingtaco/basket/`)
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
				onClick={(input) => console.log("Restaurant name submitted", input)}
			/>
			<BigText>The Basket</BigText>
            {restaurants.map((restaurant, index) => (
                <p key={index}>{restaurant.name}</p>
            ))}
			<SmallButton buttonText="let's go -->" />
		</div>
	);
}
