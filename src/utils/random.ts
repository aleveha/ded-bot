export function randomNumber(limit: number): number {
	return Math.floor(Math.random() * limit);
}

export function random<T>(array: T[]): T {
	return array[randomNumber(array.length)];
}

export function probability(percent: number): boolean {
	return randomNumber(100) < percent;
}
