/**
 * simple interpolator for numbers
 * @param {number} from
 * @param {number} to
 * @returns {function(number): number}
 */
function numeric(from, to) {
	return (position) => (1 - position) * from + position * to;
}

export default class Interpolation {

	constructor() {
		this._interpolators = [];

		this.addInterpolator(
			(key, from, to) => "number" === typeof from && "number" === typeof to,
			(from, to) => numeric(from, to),
			1000
		);

		this.addInterpolator(
			(key, from, to) => "string" === typeof from && "number" === typeof to,
			(from, to) => numeric(parseFloat(from) + to, to),
			1000
		);

		this.addInterpolator(
			(key, from, to) => "number" === typeof from && "string" === typeof to,
			(from, to) => numeric(from, parseFloat(to) + from),
			1000
		);
	}

	addInterpolator(condition, builder, priority = 1) {
		this._interpolators.push({
			condition,
			builder,
			priority
		});
		this._sortInterpolators();

	}

	findInterpolator(key, from, to) {
		for (let entry of this._interpolators) {
			if (entry.condition(key, from, to)) {
				return entry.builder(from, to);
			}
		}
		return null;
	}

	_sortInterpolators() {
		this._interpolators.sort((a, b) => a.priority - b.priority);
	}

	static get default() {
		return defaultInstance;
	}

}

const defaultInstance = new Interpolation();