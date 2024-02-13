import mongoose from "mongoose";
import flockModel from "./flock.js";
import process from "process";
import codeGenerator from "./code-generation/code-generator.js";

const db_password = process.env.DB_PASSWORD;
const url = `mongodb+srv://shareduser:${db_password}@ctcluster0.6s3myd5.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url, { dbName: "chicken-tinder" }).catch((error) => console.error(error));

function findFlockByCode(code) {
	return flockModel.findOne({ coop_name: code });
}

async function createFlock() {
	const code = codeGenerator.generateCode();
	let curNum = 0;
	while (await findFlockByCode(`${code}${curNum > 0 ? curNum : ""}`)) {
		curNum++;
	}
	const finalCode = `${code}${curNum > 0 ? curNum : ""}`;
	const flock = new flockModel({ coop_name: finalCode, chicks: [], basket: [] });
	return flock.save();
}

export { findFlockByCode, createFlock };
