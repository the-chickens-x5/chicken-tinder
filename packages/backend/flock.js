import mongoose from "mongoose";

const preferenceSchema = new mongoose.Schema({
	option: {
		type: mongoose.ObjectId,
		required: true,
	},
	vote: {
		type: Number,
		required: true,
	},
});

const chickSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	preferences: [preferenceSchema],
});

const optionSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	votes: {
		type: Number,
		required: true,
	},
});

const flockSchema = new mongoose.Schema({
	coop_name: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	chicks: {
		type: [chickSchema],
		required: true,
	},
	options: {
		type: [optionSchema],
		required: true,
	},
});

const Flock = mongoose.model("Flock", flockSchema);

export default Flock;
