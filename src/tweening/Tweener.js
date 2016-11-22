import Tween from "./Tween";

export default class Tweener {

	constructor() {
		this._animations = new Set();
	}

	fromTo(target, fromProps, toProps, duration = 1000, delay = 0, easing) {
		const now = Date.now();
		const startTime = now + delay;
		const endTime = startTime + duration;
		const tween = new Tween(target, fromProps, toProps, easing);
		const active = false;

		this._animations.add({
			startTime,
			endTime,
			active,
			duration,
			tween
		});
		return this;
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