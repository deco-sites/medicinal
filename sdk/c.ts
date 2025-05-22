export default (...args: (string | null | undefined | false)[]) =>
	args
		.filter(Boolean)
		.join(' ')
		.replace(/\s{2,}/g, ' ')
