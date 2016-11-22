import Tween from "./Tween";
import Interpolation from "./Interpolation";
import * as Easing from "./Easing";

export default class Tweener {

	constructor(interpolation = Interpolation.default) {
		this._animations = new Set();
		this._interpolation = interpolation;
	}

	get interpolation() {
		return this._interpolation;
	}

	allFrom(targets, fromProps, duration = 1000, delay = 0, stagger = 0, easing, immediate = true) {
		targets.forEach((target, index) => this.from(target, fromProps, duration, delay + stagger * index, easing, immediate));
	}

	allTo(targets, toProps, duration = 1000, delay = 0, stagger = 0, easing, immediate = false) {
		targets.forEach((target, index) => this.to(target, toProps, duration, delay + stagger * index, easing, immediate));
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
		const easingFn = "function" === typeof easing ? easing : easing in Easing ? Easing[easing] : undefined;
		const tween = new Tween(target, fromProps, toProps, easingFn, this._interpolation);
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
				animation.tween.progress(1); // make sure tween is finished properly
				this._animations.delete(animation);
			} else if (animation.startTime <= now) { // skip animations that should start in the future
				if (!animation.active) {
					if (!animation.immediate) {
						animation.tween.init();
					}
					animation.tween.progress(0); // make sure tween is started properly
					animation.active = true;
				}
				const elapsed = (now - animation.startTime);
				const position = elapsed / animation.duration;
				animation.tween.progress(position);
			}
		}
	}

}