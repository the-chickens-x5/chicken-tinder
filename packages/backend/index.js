import express from "express";
import cors from "cors";
import getWinningRestaurant from "./decision.js";
import {
	findFlockByCode,
	createFlock,
	addChickToFlock,
	createEgg,
	createHen,
	findHenByEmail,
} from "./flock-services.js";
import http from "http";
import { Server } from "socket.io";
import { getTenorGIF } from "./services/tenor.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { getUserId } from "./auth.js";
import jwt from "jsonwebtoken";

dotenv.config();

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

app.post("/auth/login", async (req, res) => {
	const email = req.body.email;
	const pass = req.body.pass;

	try {
		const hen = await findHenByEmail(email);
		if (!hen) {
			res.status(401).send("Hen not found.");
		} else {
			const currentUnixTimeInSeconds = Math.floor(Date.now() / 1000);
			if (bcrypt.compareSync(pass, hen.hash)) {
				const token = jwt.sign(
					{ henID: hen._id, expiration: currentUnixTimeInSeconds + 3600 },
					process.env.JWT_SECRET_KEY
				);
				res.send({ token: token });
			} else {
				res.status(403).send({ error: "wrong credentials" });
			}
		}
	} catch (e) {
		console.error(e);
		res.status(401).send(e);
	}
});

app.post("/auth/register", async (req, res) => {
	try {
		console.log(req.body);
		const hen = await createHen(req.body.name, req.body.email, req.body.pass);
		res.status(201).send(hen);
	} catch (e) {
		console.error(e);
		res.status(500).send("Failed to create hen");
	}
});

app.get("/auth/check", async (req, res) => {
	const token = req.headers.authorization.split(" ")[1];
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		if (decoded.expiration < Math.floor(Date.now() / 1000)) {
			res.status(401).send({ error: "token expired" });
		} else {
			res.status(200).send({ message: "token valid" });
		}
	} catch (e) {
		res.status(401).send({ error: "invalid token" });
	}
});

app.post("/flocks", async (req, res) => {
	try {
		const userId = await getUserId(req, res);
		if (!userId) {
			return;
		}
		const flock = await createFlock(userId);
		res.status(201).send(flock);
	} catch (e) {
		res.status(500).send("Failed to create flock");
	}
});

app.get("/flocks/:code", async (req, res) => {
	const flock = await findFlockByCode(req.params.code);
	if (flock) {
		res.send(flock);
	} else {
		res.status(404).send({ message: "Flock not found" });
	}
});

app.post("/flocks/:code/step", async (req, res) => {
	const flock = await findFlockByCode(req.params.code);
	const userId = await getUserId(req, res);
    if (userId !== flock.owner.toString()) {
		return;
	}
	const newStep = req.body.step || flock.step + 1;
	flock.step = newStep;
	flock.save();
	io.to(req.params.code).emit("message", { type: "flock-updated", newState: flock });
	res.send(flock);
});

app.post("/flocks/:coopName/chicks", async (req, res) => {
	const chickAndFlock = await addChickToFlock(req.params.coopName, req.body.name);

	if (!chickAndFlock) {
		res.status(400).send({ message: "Chick already exists" });
		return;
	}

	io.to(req.params.coopName).emit("message", {
		type: "flock-updated",
		newState: chickAndFlock["newFlock"],
	});
	res.send(chickAndFlock["chick"]);
});

app.delete("/flocks/:code", (req, res) => {
	res.send(`Flock ${req.params.code} deleted`);
});

app.get("/flocks/:code/chicks", async (req, res) => {
	try {
		const flock = await findFlockByCode(req.params.code);
		const chickNames = flock.chicks.map((chick) => chick.name);
		res.json(chickNames);
	} catch (error) {
		res.status(500).json({ error: "An error occurred fetching chicks" });
	}
});

app.get("/flocks/:code/chicks/:id", async (req, res) => {
	try {
		const flock = await findFlockByCode(req.params.code);
		const chick = flock.chicks.find((chick) => chick._id === req.params.id);
		if (!chick) {
			res.status(404).send({ message: "Chick not found" });
		}
		res.json(chick);
	} catch (error) {
		res.status(500).json({ error: "An error occurred fetching chick" });
	}
});

app.post("/flocks/:coopName/basket/:title", async (req, res) => {
	try {
		const egg = await createEgg(req.params.coopName, req.params.title);
		if (!egg) {
			res.status(409).send({ message: "egg already exists" });
		} else {
			io.to(req.params.coopName).emit("message", {
				type: "flock-updated",
				newState: egg.newFlock,
			});
			res.status(201).send(egg.egg);
		}
	} catch (e) {
		res.status(500).send("Failed to create egg");
	}
});

app.get("/flocks/:code/basket", async (req, res) => {
	try {
		const flock = await findFlockByCode(req.params.code);
		const eggNames = flock.basket.map((egg) => egg.title);
		res.json(eggNames);
	} catch (error) {
		res.status(500).json({ error: "An error occurred fetching eggs" });
	}
});

app.delete("/flocks/:coopName/basket", async (req, res) => {
	const flock = await findFlockByCode(req.params.coopName);
	flock.basket = [];
	flock.chicks.forEach((chick) => {
		chick.preferences = [];
	});
	await flock.save();
	res.status(200).send();
});

app.get("/flocks/:coopName/decision", async (req, res) => {
	const restaurantName = await getWinningRestaurant(req.params.coopName);
	if (!restaurantName) {
		res.status(404).send({ message: "Decision not available" });
		return;
	}
	res.send({ winner: restaurantName });
});

app.post("/flocks/:coopName/:chick/vote", async (req, res) => {
	const coopName = req.params.coopName;
	const chickName = req.params.chick;
	const egg = req.body.egg;

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

	// handle the incoming vote
	let voteStatus;
	if (!egg) {
		voteStatus = "no vote";
	} else {
		if (chick.preferences.some((pref) => pref.egg === egg._id)) {
			voteStatus = "duplicate";
		} else {
			// add vote to chick's preferences
			chick.preferences.push({ egg: egg._id, vote: egg.vote });

			// add vote to running total
			if (egg.vote === 1) {
				flock.basket.id(egg._id).yesVotes++;
			} else if (egg.vote === -1) {
				flock.basket.id(egg._id).noVotes++;
			}

			voteStatus = "received";
		}
	}

	// get a restaurant that hasn't been voted on yet
	const existingVotes = chick.preferences.map((preference) => preference.egg.toString());
	const remainingOptions = flock.basket.filter(
		(egg) => !existingVotes.includes(egg._id.toString())
	);

	if (remainingOptions.length === 0) {
		const userId = await getUserId(req, res, false);
		if (userId === flock.owner.toString()) {
			flock.step += 1;
			io.to(req.params.coopName).emit("message", { type: "flock-updated", newState: flock });
			flock.save();
		}
		res.status(204).send();
		return;
	}

	// return a random restaurant
	const randomIndex = Math.floor(Math.random() * remainingOptions.length);
	const newEgg = {
		_id: remainingOptions[randomIndex]._id,
		title: remainingOptions[randomIndex].title,
	};

	const gifUrl = await getTenorGIF(newEgg.title);
	flock.save();
	res.send({ voteStatus: voteStatus, egg: newEgg, gifUrl: gifUrl });
});

server.listen(process.env.PORT || port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
