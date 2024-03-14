const FRONTEND_URL = "http://localhost:3000";

/**
 * Run
 * db.flocks.deleteMany({'chicks.name': 'Cypress Test Chick'})
 * in the database to clean up after this test
 */

describe("Happy Path -- Group Leader", () => {
	const chickNameInput = "Cypress Test Chick";
	const restaurantsInput = ["Test Restaurant 1", "Test Restaurant 2", "Test Restaurant 3"];

	// const chickUsername = "cypressTestChick";
	const chickEmail = "test@chick.com";
	const chickPassword = "testPassword";

	let coopName;
	let jwt_token;

	it("open the app", () => {
		cy.visit(FRONTEND_URL);
		cy.get("button").click();
	});

	it("Log in", () => {
		cy.visit(`${FRONTEND_URL}/welcome/`);
		cy.get("button").contains("Rally my flock").click();

		// log in
		cy.get("input[placeholder='user@chickentinder.com']").type(chickEmail);
		cy.get("span").contains("Password").next().type(chickPassword);
		cy.get("button").contains("Login").click();

		// verify login
		cy.get("button").contains("Rally my flock").should("exist");
		cy.getCookie("token").should("exist");
		cy.getCookie("token").then((cookie) => {
			jwt_token = cookie.value;
		});
	});

	it("create a flock and input name", () => {
		cy.setCookie("token", jwt_token);
		cy.visit(`${FRONTEND_URL}/welcome/`);

		cy.get("button").contains("Rally my flock").click();

		cy.get("input[placeholder='Chickie McDee']").type(chickNameInput);
		cy.get("button").contains("let's go -->").click();

		cy.get("div")
			.contains("Coop Name:")
			.then((data) => {
				coopName = data.text().split(":")[1].trim();
			});

		cy.getAllLocalStorage().then((data) => {
			const { chickName } = data[FRONTEND_URL];
			expect(chickName).to.eq(chickNameInput);
		});

		cy.get("tbody").find("tr").should("have.length", 1);
		cy.get("td").should("contain", chickNameInput);
	});

	it("join flock and input restaurants", () => {
		// TODO: this is temporary until we fix local storage
		localStorage.setItem("chickName", chickNameInput);
		cy.getAllLocalStorage().then((data) => {
			const { chickName } = data[FRONTEND_URL];
			expect(chickName).to.eq(chickNameInput);
		});
		cy.setCookie("token", jwt_token);

		cy.visit(`${FRONTEND_URL}/flock/${coopName}/lobby/`);

		cy.get("tbody").should("have.length", 1);
		cy.get("td").should("contain", chickNameInput);

		cy.get("button").contains("let's go -->").click();

		let l = 0;
		for (const restaurant of restaurantsInput) {
			cy.get("input[placeholder='Restaurant Name']").type(restaurant);
			cy.get("button").contains("submit").click();
			l++;

			cy.get("tbody").find("tr").should("have.length", l);
			cy.get("td:last").should("contain", restaurant);

			cy.get("input[placeholder='Restaurant Name']").clear();
		}
	});

	it("vote for restaurants and view winner", () => {
		// TODO: this is temporary until we fix local storage
		localStorage.setItem("chickName", chickNameInput);
		cy.getAllLocalStorage().then((data) => {
			const { chickName } = data[FRONTEND_URL];
			expect(chickName).to.eq(chickNameInput);
		});
		cy.setCookie("token", jwt_token);

		cy.visit(`${FRONTEND_URL}/flock/${coopName}/voting/`);

		const votedEggs = [];

		for (let i = 0; i < 3; i++) {
			cy.get("div[name='egg']").should((egg) => {
				expect(restaurantsInput.includes(egg.text())).to.be.true;
				expect(votedEggs.includes(egg.text())).to.be.false;
				votedEggs.push(egg.text());
			});

			cy.get("button").contains("Yes -->").click();
		}

		cy.get("div").should("contain", "Winner Winner Chicken Dinner!");
		cy.get("div").should("contain", restaurantsInput[0]);
	});
});
