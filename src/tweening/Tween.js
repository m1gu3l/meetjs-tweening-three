import {linear} from "./Easing";
import {numeric} from "./Interpolation";

export default class Tween {

	constructor(target, fromProps, toProps, easing = linear) {
		this._target = target;
		this._fromProps = fromProps;
		this._toProps = toProps;
		this._easing = easing;

		this.init();
	}

	progress(position) {
		// first normalize input
		position = position > 1 ? 1 : position < 0 ? 0 : position;

		// then apply easing
		position = this._easing(position);

		// then run all updaters
		this._updaters.forEach(update => update(position));
	}

	init() {
		// first we get all unique keys in _fromProps and _toProps
		const propKeys = [... new Set(Object.keys(this._fromProps).concat(Object.keys(this._toProps)))];

		this._updaters = propKeys.reduce((updaters, key) => {
			// we read values
			const from = this._fromProps[key];
			const to = this._toProps[key];

			if (from !== to) { // we don't want to create updater if values are equal
				let interpolator;

				if ("number" === typeof from && "number" === typeof to) { // we have interpolator builder for number type
					interpolator = numeric(from, to);
				}

				if ("function" === typeof interpolator) { // if there is no interpolator don't add updater
					updaters.push((position) => this._target[key] = interpolator(position));
				}
			}

			return updaters;
		}, []);
	}

}