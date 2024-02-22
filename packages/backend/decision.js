import { findFlockByCode } from "./flock-services.js";

async function getWinningRestaurant(coop_name) {
	let flock = await findFlockByCode(coop_name);

	let bestRestaurant = null;
	let highestYesVotes = -Infinity;
	let highestYesToNoRatio = -Infinity;

	// Loop through each restaurant
	for (let restaurant of flock.basket) {
		// If the restaurant has more "yes" votes than any other restaurant so far,
		// it's the new best restaurant
		if (restaurant.yesVotes > highestYesVotes) {
			bestRestaurant = restaurant;
			highestYesVotes = restaurant.yesVotes;
			highestYesToNoRatio =
				restaurant.noVotes === 0
					? restaurant.yesVotes
					: restaurant.yesVotes / restaurant.noVotes;
		}
		// If there's a tie in "yes" votes,
		// calculate the ratio of "yes" to "no" votes to break the tie
		else if (restaurant.yesVotes === highestYesVotes) {
			let currentRatio =
				restaurant.noVotes === 0
					? restaurant.yesVotes
					: restaurant.yesVotes / restaurant.noVotes;
			if (currentRatio > highestYesToNoRatio) {
				bestRestaurant = restaurant;
				highestYesToNoRatio = currentRatio;
			}
		}
	}

	// Return the name of the best restaurant (highest "yes" to "no" ratio),
	// or null if there are no restaurants
	return bestRestaurant ? bestRestaurant.name : null;
}

export default getWinningRestaurant;
