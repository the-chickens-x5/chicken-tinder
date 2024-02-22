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
		const result = await fetch(
			`${process.env.REACT_APP_API_URL}/flocks/${params.coop_name}/basket/${name}`,
			{ method: "POST" }
		);
		if (result.ok) {
			setRestaurants((prevRestaurants) => [...prevRestaurants, name]);
		}
		return result;
	}

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/flocks/${params.coop_name}/basket/`)
            .then(response => response.json())
            .then(data => setRestaurants(data))
            .catch(error => console.error('Error:', error));
    }, []);

	function TableBody(props) {
		const rows = props.eggData.map((restaurant, index) => {
			return (
				<tr key={index}>
					<td style={{ textAlign: "center", fontSize: "24px" }}>{restaurant}</td>
				</tr>
			);
		});
		return <tbody>{rows}</tbody>;
	}

    function Table(props) {
        console.log("Props in table", props);
        return (
            <table>
                <TableBody
                    eggData={props.egg}
                />
            </table>
        );
    }

	return (
		<div className="flex flex-col space-y-normal justify-center w-5/6">
			<FullWidthText>Put your eggs in the basket</FullWidthText>
			<TextButtonInput
				placeholder="Restaurant Name"
				buttonText="submit"
				onClick={(input) => {
					console.log("Restaurant name submitted", input, "\nCurrent restaurants:", restaurants);
					postEggs(input);
				}}
			/>
			<BigText>The Basket</BigText>
			<Table egg={restaurants} />
			<SmallButton buttonText="let's go -->" />
		</div>
	);
}
