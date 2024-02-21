/**
 * Determine the winning restaurant based on the number of "yes" votes and the ratio of "yes" to "no" votes.
 *
 * @param {Array} restaurants - An array of restaurant objects. Each object should have the following properties:
 * @param {string} restaurants[].name - The name of the restaurant.
 * @param {number} restaurants[].yesVotes - The number of "yes" votes the restaurant has received.
 * @param {number} restaurants[].noVotes - The number of "no" votes the restaurant has received.
 *
 * @returns {string|null} The name of the winning restaurant, or null if there are no restaurants.
 * 

Sample Input:
let restaurants = [
  { name: 'Restaurant A', yesVotes: 10, noVotes: 2 },
  { name: 'Restaurant B', yesVotes: 15, noVotes: 5 },
  { name: 'Restaurant C', yesVotes: 12, noVotes: 1 }
];

*/
function getWinningRestaurant(restaurants) {
    let bestRestaurant = null;
    let highestYesVotes = -Infinity;
    let highestYesToNoRatio = -Infinity;
  
    // Loop through each restaurant
    for (let restaurant of restaurants) {
      // If the restaurant has more "yes" votes than any other restaurant so far, 
      // it's the new best restaurant
      if (restaurant.yesVotes > highestYesVotes) {
        bestRestaurant = restaurant;
        highestYesVotes = restaurant.yesVotes;
        highestYesToNoRatio = restaurant.noVotes === 0 ? restaurant.yesVotes : restaurant.yesVotes / restaurant.noVotes;
      }
      // If there's a tie in "yes" votes, 
      // calculate the ratio of yes to no votes to break the tie
      else if (restaurant.yesVotes === highestYesVotes) {
        let currentRatio = restaurant.noVotes === 0 ? restaurant.yesVotes : restaurant.yesVotes / restaurant.noVotes;
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