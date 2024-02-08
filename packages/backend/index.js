import express from "express";

const app = express();

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/flocks", (req, res) => {
	const code = "flyingtaco";
	res.send(`Flock created with code: ${code}`);
});

app.get("/flocks/:code", (req, res) => {
	res.send(`Flock ${req.params.code}`);
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

app.post("/flocks/:code/options", (req, res) => {
	res.send(`Options added to flock ${req.params.code}`);
});

app.get("/flocks/:code/options", (req, res) => {
	res.send(`Options of flock ${req.params.code}`);
});

app.get("/flocks/:code/decision", (req, res) => {
	res.send(`Decision of flock ${req.params.code}`);
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
