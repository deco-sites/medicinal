export interface Scheduling {
	/**
	 * @title Início
	 * @format datetime
	 */
	start?: string

	/**
	 * @title Fim
	 * @format datetime
	 */
	end?: string
}

export function isSchedulingActive(scheduling?: Scheduling) {
	if (!scheduling) return true
	const now = new Date()
	const { start, end } = scheduling
	if (start && !end) return now >= new Date(start)
	if (!start && end) return now <= new Date(end)
	if (start && end) return now >= new Date(start) && now <= new Date(end)
	return false
}
