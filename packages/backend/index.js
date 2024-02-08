import express from "express";
import cors from "cors";
import { findFlockByCode } from "./flock-services.js";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/flocks", (req, res) => {
	const code = "flyingtaco";
	res.send(`Flock created with code: ${code}`);
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

app.post("/flocks/:code/basket", (req, res) => {
	res.send(`Options added to flock ${req.params.code}`);
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
