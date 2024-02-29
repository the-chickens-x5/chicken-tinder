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

app.post("/flocks/:coop_name/chicks", async (req, res) => {
	const chick = await addChickToFlock(req.params.coop_name, req.body.name);

	if (!chick) {
		res.status(400).send({ message: "Chick already exists" });
		return;
	}

	io.to(req.params.coop_name).emit("message", { type: "chick-added", chick: chick });
	res.send({ name: chick });
});

app.delete("/flocks/:code", (req, res) => {
	res.send(`Flock ${req.params.code} deleted`);
});

app.get("/flocks/:code/chicks", async (req, res) => {
    console.log(`GET /flocks/${req.params.code}`);
    findFlockByCode(req.params.code).then((flock) => {
        const chickNames = flock.chicks.map(chick => chick.name);
        res.json(chickNames);
    });
});

app.post("/flocks/:code/votes", (req, res) => {
	// body should contain the relevant info
	// (member, egg, vote direction)
	res.send(`Vote added to flock ${req.params.code}`);
});

app.post("/flocks/:coop_name/basket/:title", async (req, res) => {
	try {
		const egg = await createEgg(req.params.coop_name, req.params.title);
		res.status(201).send(egg);
	} catch (e) {
		console.error(e);
		res.status(500).send("Failed to create egg");
	}
});

app.get("/flocks/:code/basket", (req, res) => {
    console.log(`GET /flocks/${req.params.code}`);
    findFlockByCode(req.params.code).then((flock) => {
        const eggNames = flock.basket.map(egg => egg.title);
        res.json(eggNames);
    });
});

app.get("/flocks/:code/decision", (req, res) => {
	res.send(`Decision of flock ${req.params.code}`);
});

server.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
