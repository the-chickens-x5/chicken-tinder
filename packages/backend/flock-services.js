import mongoose from "mongoose";
import flockModel from "./flock.js";
import process from "process";

const db_password = process.env.DB_PASSWORD;
const url = `mongodb+srv://shareduser:${db_password}@ctcluster0.6s3myd5.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url, { dbName: "chicken-tinder" }).catch((error) => console.error(error));

function findFlockByCode(code) {
	return flockModel.findOne({ coop_name: code });
}

export { findFlockByCode };
