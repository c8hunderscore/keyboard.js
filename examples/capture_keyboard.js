const Keyboard = require("..");
const kb = new Keyboard();

kb.on("C-l", e => console.clear());

kb.once("C-c", e => {
	process.stdout.write("^C");
	process.exit();
});

kb.on("", e => {
	if (!e.hasModifiers) process.stdout.write(e._event.sequence);
});

