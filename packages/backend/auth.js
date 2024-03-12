import jwt from "jsonwebtoken";

export function getUserId(req, res){
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).send({ message: "Unauthorized" });
        return null;
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded.expiration < Math.floor(Date.now() / 1000)){
        res.status(401).send({error : "token expired"});
        return null;
    }
    return decoded.henID;
}