import mongoose from "mongoose";

const preferenceSchema = new mongoose.Schema({
	egg: {
		type: mongoose.ObjectId, // reference to an egg
		required: true,
	},
	vote: {
		type: Number, // 1 for up, -1 for down
		required: true,
		default: 0,
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
	yesVotes: {
		type: Number,
		required: true,
		default: 0,
	},
	noVotes: {
		type: Number,
		required: true,
		default: 0,
	},
});

const flockSchema = new mongoose.Schema(
	{
		coopName: {
			// unique identifier for the flock (e.g. "flyingtaco")
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		chicks: [chickSchema],
		basket: [eggSchema],
	},
	{ collection: "flocks", timestamps: true }
);

const henSchema = new mongoose.Schema(
	{
		henName: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		hash: {
			type: String,
			required: true,
		},
		flocks: [mongoose.Schema.ObjectId],
	},
);

const Flock = mongoose.model("Flock", flockSchema);
const Hen = mongoose.model("Hen", henSchema);

export {Flock, Hen};
