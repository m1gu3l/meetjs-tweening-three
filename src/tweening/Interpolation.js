/**
 * simple interpolator for numbers
 * @param {number} from
 * @param {number} to
 * @returns {function(number): number}
 */
export function numeric(from, to) {
	return (position) => (1 - position) * from + position * to;
}