import {linear} from "./Easing";
import Interpolation from "./Interpolation";

export default class Tween {

	constructor(target, fromProps = null, toProps = null, easing = linear, interpolation = Interpolation.default) {
		this._target = target;
		this._fromProps = fromProps;
		this._toProps = toProps;
		this._easing = easing;
		this._interpolation = interpolation;
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
		if (null === this._fromProps && null === this._toProps) { // nothing to tween
			this._updaters = [];
			return;
		} else if (null === this._fromProps) {
			this._fromProps = readProps(this._target, Object.keys(this._toProps));
		} else if (null === this._toProps) {
			this._toProps = readProps(this._target, Object.keys(this._fromProps));
		}

		// first we get all unique keys in _fromProps and _toProps
		const propKeys = [... new Set(Object.keys(this._fromProps).concat(Object.keys(this._toProps)))];

		this._updaters = propKeys.reduce((updaters, key) => {
			// we read values
			const from = this._fromProps[key];
			const to = this._toProps[key];

			if (from !== to) { // we don't want to create updater if values are equal
				const interpolator = this._interpolation.findInterpolator(key, from, to);

				if ("function" === typeof interpolator) { // if there is no interpolator don't add updater
					updaters.push((position) => this._target[key] = interpolator(position));
				}
			}

			return updaters;
		}, []);
	}

}

function readProps(target, keys) {
	return keys.reduce((props, key) => {
		props[key] = target[key];
		return props;
	}, {});
}