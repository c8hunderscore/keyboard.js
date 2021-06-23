# keyboard.js
A Keyboard library for NodeJS

## Usage
keyboard.js has a default export, being the `Keyboard` class.
To create a new `Keyboard`, add this to your code:
```js
const Keyboard = require("keyboard.js");
const kb = new Keyboard();
```
`Keyboard` inherits `EventEmitter`. It emits events through `.on()`, `.once()`, `.addListener()`.
By default, the `Keyboard` will emit in the following format:
```
C-M-{key}
e.g.
C-c == control + c
M-k == windows + k
B   == shift   + b
```
To listen for these, you can add event listeners. Here's how:
```js
kb.on("C-c", () => process.exit()); // Exit when ctrl+c is pressed
```

## Config
When creating your `Keyboard`, you can specify custom options:
```js
// All of these are their default options
const kb = new Keyboard(process.stdin, {
    encoding: "utf8",
    rawMode: true,
    longKeyNames: false,
    seperator: "-",
});
```
Let's run through what each one of these do.

### Stream
Deafult: `process.stdin`
The stream to read.

### Encoding
Default: `"utf8"`
The encoding to read the stream in.

### Raw Mode
Default: `true`
Whether to enable raw mode for the stream, recommended if using keyboard shortcuts.

### Long Key Names
Default: `false`
If enabled, replace `C-` with `ctrl-` and `M-` with `meta-` in the events

### Seperator
Default: `"-"`
A seperator which goes after each modifier key in the listeners.

## `Event`
`Event` is a class which is returned on every event.
