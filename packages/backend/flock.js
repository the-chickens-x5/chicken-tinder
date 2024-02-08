import mongoose from "mongoose";

const preferenceSchema = new mongoose.Schema({
	egg: {
		type: mongoose.ObjectId, // reference to an egg
		required: true,
	},
	vote: {
		type: Number, // 1 for up, -1 for down
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

const eggSchema = new mongoose.Schema({
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
		// unique identifier for the flock (e.g. "flyingtaco")
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	chicks: {
		type: [chickSchema],
		required: true,
	},
	basket: {
		type: [eggSchema],
		required: true,
	},
});

const Flock = mongoose.model("Flock", flockSchema);

export default Flock;
