class Event {
	constructor (event, toEmit, cfg, anon) {
		this._event = event;
		this._toEmit = toEmit;
		this._anon = anon;
	}

	get sequence() {
		return this._toEmit;
	}

	get ctrl() {
		return !!this._event.ctrl;
	}

	get meta() {
		return !!this._event.meta;
	}

	get shift() {
		return !!this._event.shift;
	}

	get key() {
		return this._event.name ?? this._event.sequence;
	}

	get isAscii() {
		return this._event.sequence.charCodeAt() < 127;
	}

	get hasModifiers() {
		return (this.ctrl || this.meta);
	}
}

module.exports = Event;

