const from = 'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;'

const to = 'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------'

const removeAccents = (str: string) => {
	let newStr = str.slice(0)

	for (let i = 0; i < from.length; i++) {
		newStr = newStr.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
	}

	return newStr
}

export function searchSlugify(str: string) {
	const replaced = str.replace(/\s/gi, '-').replace(
		/[*+~.()'"!:@&[\]`,/ %$#?{}|><=_^]/g,
		'',
	)

	return removeAccents(replaced).toLowerCase()
}
