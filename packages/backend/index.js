import express from "express";
import cors from "cors";
import { findFlockByCode, createFlock, createEgg } from "./flock-services.js";

const app = express();
const port = 8000;

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
	findFlockByCode(req.params.code).then((flock) => {
		res.send(flock);
	});
});

app.delete("/flocks/:code", (req, res) => {
	res.send(`Flock ${req.params.code} deleted`);
});

app.get("/flocks/:code/chicks", (req, res) => {
	res.send(`Chicks of flock ${req.params.code}`);
});

app.post("/flocks/:code/chicks", (req, res) => {
	res.send(`Chick added to flock ${req.params.code}`);
});

app.post("/flocks/:code/votes", (req, res) => {
	// body should contain the relevant info
	// (member, egg, vote direction)
	res.send(`Vote added to flock ${req.params.code}`);
});

app.post("/flocks/:code/basket/:name", async (req, res) => {
	try{
		const egg = await createEgg(req.params.code, req.params.name);
		res.status(201).send(egg);
	} 
	catch (e) {
		console.error(e);
		res.status(500).send("Failed to create egg");
	}
});

app.get("/flocks/:code/basket", (req, res) => {
	res.send(`Options of flock ${req.params.code}`);
});

app.get("/flocks/:code/decision", (req, res) => {
	res.send(`Decision of flock ${req.params.code}`);
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
