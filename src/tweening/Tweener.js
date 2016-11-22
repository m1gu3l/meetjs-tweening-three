import Tween from "./Tween";

export default class Tweener {

	constructor() {
		this._animations = new Set();
	}

	from(target, fromProps, duration = 1000, delay = 0, easing, immediate = true) {
		this.fromTo(target, fromProps, null, duration, delay, easing, immediate);
	}

	to(target, toProps, duration = 1000, delay = 0, easing, immediate = false) {
		this.fromTo(target, null, toProps, duration, delay, easing, immediate);
	}

	fromTo(target, fromProps, toProps, duration = 1000, delay = 0, easing, immediate = false) {
		const now = Date.now();
		const startTime = now + delay;
		const endTime = startTime + duration;
		const tween = new Tween(target, fromProps, toProps, easing);
		if (immediate) {
			tween.init();
			tween.progress(0);
		}
		const active = false;

		this._animations.add({
			startTime,
			endTime,
			active,
			immediate,
			duration,
			tween
		});
	}

	update() {
		const now = Date.now();
		for (let animation of this._animations) {

			if (animation.endTime <= now) { // remove animations that are finished
				console.log(animation, "has finished");
				animation.tween.progress(1); // make sure tween is finished properly
				this._animations.delete(animation);
			} else if (animation.startTime <= now) { // skip animations that should start in the future
				if (!animation.active) {
					if (!animation.immediate) {
						animation.tween.init();
					}
					animation.tween.progress(0); // make sure tween is started properly
					animation.active = true;
					console.log(animation, "has started");
				}
				const elapsed = (now - animation.startTime);
				const position = elapsed / animation.duration;
				animation.tween.progress(position);
			}
		}
	}

}