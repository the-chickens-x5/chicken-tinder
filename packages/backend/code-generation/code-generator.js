import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CodeGenerator {
	constructor() {
		this._adjectives = this._readFile("./adjectives.txt");
		this._foods = this._readFile("./foods.txt");
	}

	// Reads a file and returns a list of lines
	_readFile(fileName) {
		const text = fs.readFileSync(path.join(__dirname, fileName));
		return text.toString().replace(/\r\n/g, "\n").split("\n");
	}

	generateCode() {
		const adjective = this._adjectives[Math.floor(Math.random() * this._adjectives.length)];
		const food = this._foods[Math.floor(Math.random() * this._foods.length)];
		return `${adjective}-${food}`;
	}
}

const codeGenerator = new CodeGenerator();
export default codeGenerator;
