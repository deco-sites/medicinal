import { useSignal, useSignalEffect } from '@preact/signals'

type Cep = {
	cep: string
	logradouro: string
	complemento: string
	bairro: string
	localidade: string
	uf: string
	ibge: string
}

type Errors = 'NOT_FOUND' | 'EXPLODED'

export default function () {
	const cep = useSignal<number | null>(null)
	const loading = useSignal(false)
	const data = useSignal<Cep | null>(null)
	const error = useSignal<Errors | null>(null)

	useSignalEffect(() => {
		if (!cep.value) return

		loading.value = true

		fetch(`https://opencep.com/v1/${cep}`)
			.then((r) => {
				if (r.status === 404) throw new Error('NOT_FOUND')

				return r.json()
			})
			.then((r: Cep) => {
				data.value = r
				error.value = null
			})
			.catch((e) => {
				if (e.message === 'NOT_FOUND') {
					error.value = 'NOT_FOUND'
				} else {
					console.error(e)
					error.value = 'EXPLODED'
				}
			})
			.finally(() => {
				loading.value = false
			})
	})

	return {
		cep,
		loading,
		data,
		error,
	}
}
