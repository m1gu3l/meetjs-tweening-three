/**
 * linear easing = no easing
 * @param {number} p
 * @return {number}
 */
export const linear = (p) => p;

// take a look at http://easings.net/

export const quadIn = (p) => p * p;

export const quadOut = (p) => p * (2 - p);

export const quadInOut = (p) => {
	if (( p *= 2 ) < 1) {
		return 0.5 * p * p;
	}
	return -0.5 * ( --p * ( p - 2 ) - 1 );
};

export const cubeIn = (p) => p * p * p;

export const cubeOut = (p) => --p * p * p + 1;

export const cubeInOut = (p) => {
	if (( p *= 2 ) < 1) {
		return 0.5 * p * p * p;
	}
	return 0.5 * ( ( p -= 2 ) * p * p + 2 );
};

export const sineIn = (p) => 1 - Math.cos(p * Math.PI / 2);

export const sineOut = (p) => Math.sin(p * Math.PI / 2);

export const sineInOut = (p) => 0.5 * (1 - Math.cos(Math.PI * p));

export const elasticIn = (p) => {
	if (p === 0) {
		return 0;
	}

	if (p === 1) {
		return 1;
	}

	return -Math.pow(2, 10 * (p - 1)) * Math.sin((p - 1.1) * 5 * Math.PI);
};

export const elasticOut = (p) => {
	if (p === 0) {
		return 0;
	}

	if (p === 1) {
		return 1;
	}

	return Math.pow(2, -10 * p) * Math.sin((p - 0.1) * 5 * Math.PI) + 1;
};

export const elasticInOut = (p) => {
	if (p === 0) {
		return 0;
	}

	if (p === 1) {
		return 1;
	}

	p *= 2;

	if (p < 1) {
		return -0.5 * Math.pow(2, 10 * (p - 1)) * Math.sin((p - 1.1) * 5 * Math.PI);
	}

	return 0.5 * Math.pow(2, -10 * (p - 1)) * Math.sin((p - 1.1) * 5 * Math.PI) + 1;
};

// this will set 1 almost immediately
export const justAfterStart = (p) => p === 0 ? 0 : 1;

// this will set 1 at the very end
export const justBeforeEnd = (p) => p === 1 ? 1 : 0;