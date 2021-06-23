const readline = require("readline");
const EventEmitter = require("events");

const Event = require("./event");

const defaultConfig = {
	encoding: "utf8",
	rawMode: true,
	longKeyNames: false,
	seperator: "-"
};

class Keyboard extends EventEmitter {
	constructor (stdin = process.stdin, config) {
		super();
		this.stdin = stdin ?? process.stdin;
		this.cfg = Object.assign(defaultConfig, config);

		if (!this.stdin?.isTTY) throw new TypeError("stdin is not a TTY");

		this.stdin.on("pause", () => this.stdin.resume());

		this.stdin.setEncoding(this.cfg.encoding);
		this.stdin.setRawMode(this.cfg.rawMode);
		readline.emitKeypressEvents(this.stdin);

		this.stdin.on("keypress", (_, e) => {
			let toEmit = "";

			if (e.ctrl) toEmit += (this.cfg.longKeyNames ? "ctrl" : "C") + this.cfg.seperator;
			if (e.meta) toEmit += (this.cfg.longKeyNames ? "meta" : "M") + this.cfg.seperator;

			toEmit += (e.name ?? e.sequence)[e.shift ? "toUpperCase" : "toLowerCase"]();

			this.emit("", new Event(e, toEmit, true));
			this.emit(toEmit, new Event(e, toEmit, false));
		});
	}
}

module.exports = Keyboard;

