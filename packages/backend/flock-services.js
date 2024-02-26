import mongoose from "mongoose";
import flockModel from "./flock.js";
import process from "process";
import codeGenerator from "./code-generation/code-generator.js";

const db_password = process.env.DB_PASSWORD;
const url = `mongodb+srv://shareduser:${db_password}@ctcluster0.6s3myd5.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url, { dbName: "chicken-tinder" }).catch((error) => console.error(error));

async function findFlockByCode(code) {
	return flockModel.findOne({ coop_name: code });
}

async function createFlock() {
	const code = codeGenerator.generateCode();
	let curNum = 0;
	// Check to see if the code already exists by finding
	// a flock with that code
	let finalCode = code;
	while (await findFlockByCode(finalCode)) {
		curNum++;
		finalCode = `${code}${curNum}`;
	}
	const flock = new flockModel({ coop_name: finalCode, chicks: [], basket: [] });
	return flock.save();
}

async function createEgg(code, title) {
	let flock = await findFlockByCode(code);
	const egg = { title: title, votes: 0 };
	await flock.basket.push(egg);
	// update
	flockModel
		.findByIdAndUpdate(flock._id, { basket: flock.basket })
		.then((updatedFlock) => {
			console.log("Changes saved successfully: ", updatedFlock);
		})
		.catch((err) => {
			console.error("Error saving changes: ", err);
		});

	return egg;
}

/**
 * Adds a chick to the flock document unless the chick name already exists
 * @param {String} coop_name
 * @param {String} chickName
 * @returns the chick name if added, null if chick already exists
 */
async function addChickToFlock(coop_name, chickName) {
	const flock = await findFlockByCode(coop_name);

	// if name already exists, ignore
	if (flock.chicks.some((chick) => chick.name === chickName)) {
		return null;
	}

	flock.chicks.push({ name: chickName, votes: [] });
	await flockModel.findOneAndReplace({ coop_name: coop_name }, flock);
	return chickName;
}

export { findFlockByCode, createFlock, addChickToFlock, createEgg };
