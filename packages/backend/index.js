import express from "express";
import cors from "cors";
import { findFlockByCode, createFlock, addChickToFlock, createEgg } from "./flock-services.js";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const port = 8000;

const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	socket.on("join-flock", (code) => {
		socket.join(code);
	});
	socket.on("leave-flock", (code) => {
		socket.leave(code);
	});
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/flocks", async (req, res) => {
	try {
		const flock = await createFlock();
		res.status(201).send(flock);
	} catch (e) {
		console.error(e);
		res.status(500).send("Failed to create flock");
	}
});

app.get("/flocks/:code", (req, res) => {
	console.log(`GET /flocks/${req.params.code}`);
	findFlockByCode(req.params.code).then((flock) => {
		res.send(flock);
	});
});

app.post("/flocks/:coopName/chicks", async (req, res) => {
	const chick = await addChickToFlock(req.params.coopName, req.body.name);

	if (!chick) {
		res.status(400).send({ message: "Chick already exists" });
		return;
	}

	io.to(req.params.coopName).emit("message", { type: "chick-added", chick: chick });
	res.send({ name: chick });
});

app.delete("/flocks/:code", (req, res) => {
	res.send(`Flock ${req.params.code} deleted`);
});

app.get("/flocks/:code/chicks", (req, res) => {
	res.send(`Chicks of flock ${req.params.code}`);
});

app.post("/flocks/:code/votes", (req, res) => {
	// body should contain the relevant info
	// (member, egg, vote direction)
	res.send(`Vote added to flock ${req.params.code}`);
});

app.post("/flocks/:coopName/basket/:title", async (req, res) => {
	try {
		const egg = await createEgg(req.params.coopName, req.params.title);
		res.status(201).send(egg);
	} catch (e) {
		console.error(e);
		res.status(500).send("Failed to create egg");
	}
});

app.get("/flocks/:code/basket", (req, res) => {
	res.send(`Options of flock ${req.params.code}`);
});

app.get("/flocks/:coop_name/:chick/vote", async (req, res) => {
	console.log(`GET /flocks/${req.params.coop_name}/${req.params.chick}/vote`);
	const coopName = req.params.coop_name;
	const chickName = req.params.chick;

	// check if flock and chick exists
	const flock = await findFlockByCode(coopName);
	if (!flock) {
		res.status(404).send({ message: "Flock not found" });
		return;
	}
	const chick = flock.chicks.find((chick) => chick.name === chickName);
	if (!chick) {
		res.status(404).send({ message: "Chick not found" });
		return;
	}

	// get a restaurant that hasn't been voted on yet
	const existingVotes = chick.preferences.map((preference) => preference.egg.toString());
	const remainingOptions = flock.basket.filter(
		(egg) => !existingVotes.includes(egg._id.toString())
	);
	// console.log("remainingOptions", remainingOptions);

	if (remainingOptions.length === 0) {
		res.status(204).send();
		return;
	}

	// return a random restaurant
	const egg = {
		_id: remainingOptions[0]._id,
		title: remainingOptions[0].title,
	};

	res.send({ egg: egg });
});

app.post("/flocks/:coop_name/:chick/vote", async (req, res) => {
	// console.log(`POST /flocks/${req.params.coop_name}/${req.params.chick}/vote`);
	const coopName = req.params.coop_name;
	const chickName = req.params.chick;
	const egg = req.body.egg;

	// console.log(egg);

	const flock = await findFlockByCode(coopName);
	if (!flock) {
		res.status(404).send({ message: "Flock not found" });
		return;
	}
	const chick = flock.chicks.find((chick) => chick.name === chickName);
	if (!chick) {
		res.status(404).send({ message: "Chick not found" });
		return;
	}

	const oldPreference = chick.preferences.find((preference) => preference.egg === egg._id);
	if (oldPreference) {
		res.status(400).send({ message: "Already voted" });
	}

	const preference = {
		egg: egg._id,
		vote: egg.vote,
	};

	if (preference.vote === 1) {
		flock.basket.id(egg._id).yesVotes++;
	} else if (preference.vote === -1) {
		flock.basket.id(egg._id).noVotes++;
	}
	chick.preferences.push(preference);

	// push to db
	await flock.save();

	res.status(201).send({ message: "Vote received" });
});

app.get("/flocks/:code/decision", (req, res) => {
	res.send(`Decision of flock ${req.params.code}`);
});

server.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
