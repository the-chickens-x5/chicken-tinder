import jwt from "jsonwebtoken";

export function getUserId(req, res, sendError = true) {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			if (sendError) {
				res.status(401).send({ message: "Unauthorized" });
			}
			return null;
		}
		const token = authHeader.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		if (decoded.expiration < Math.floor(Date.now() / 1000)) {
			if (sendError) {
				res.status(401).send({ error: "token expired" });
			}
			return null;
		}
		return decoded.henID;
	} catch {
		if (sendError) {
			res.status(401).send({ error: "token malformed" });
		}
		return null;
	}
}
