export function matchCanonical(matcher: string, canonical: string) {
	const canonicalWithoutHost = canonical.replace(/^https?:\/\/[^/]+/, '')

	return new RegExp('^' + matcher).test(canonicalWithoutHost)
}
