export function endsWithPunctuation(str: string) {
	return /[.!?]$/.test(str);
}
