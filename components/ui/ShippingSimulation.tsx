import { type Signal, useSignal } from '@preact/signals'
import { useCallback } from 'preact/hooks'
import Button from 'site/components/ui/Button.tsx'
import { formatPrice } from 'site/sdk/format.ts'
import { useCart } from 'apps/vtex/hooks/useCart.ts'
import type { SimulationOrderForm, SKU, Sla } from 'apps/vtex/utils/types.ts'

export interface Props {
	items: Array<SKU>
}

const formatShippingEstimate = (estimate: string) => {
	const [, time, type] = estimate.split(/(\d+)/)

	if (type === 'bd') return `${time} dias úteis`
	if (type === 'd') return `${time} dias`
	if (type === 'h') return `${time} horas`
}

function ShippingContent({ simulation }: {
	simulation: Signal<SimulationOrderForm | null>
}) {
	const { cart } = useCart()

	const methods = simulation.value?.logisticsInfo?.reduce(
		(initial, { slas }) => [...initial, ...slas],
		[] as Sla[],
	) ?? []

	const locale = cart.value?.clientPreferencesData.locale || 'pt-BR'
	const currencyCode = cart.value?.storePreferencesData.currencyCode || 'BRL'

	if (simulation.value == null) {
		return null
	}

	if (methods.length === 0) {
		return (
			<div class='p-2'>
				<span>CEP inválido</span>
			</div>
		)
	}

	return (
		<ul class='flex flex-col gap-4 p-6 bg-ice rounded-md'>
			{methods.map((method) => (
				<li class='grid grid-cols-4 gap-4 border-base-200 not-first-child:border-t text-xs sm:text-sm'>
					<span class='col-span-2'>
						Entrega {method.name}
					</span>
					<span>
						até {formatShippingEstimate(method.shippingEstimate)}
					</span>
					<span class='font-semibold text-right'>
						{method.price === 0 ? 'Grátis' : (
							formatPrice(method.price / 100, currencyCode, locale)
						)}
					</span>
				</li>
			))}
			<span class='text-xs sm:text-sm text-gray'>
				Os prazos de entrega começam a contar a partir da confirmação do pagamento e podem variar de acordo com
				a quantidade de produtos na sacola.
			</span>
		</ul>
	)
}

function ShippingSimulation({ items }: Props) {
	const postalCode = useSignal('')
	const loading = useSignal(false)
	const simulateResult = useSignal<SimulationOrderForm | null>(null)
	const { simulate, cart } = useCart()

	const handleSimulation = useCallback(async () => {
		if (postalCode.value.length !== 8) {
			return
		}

		try {
			loading.value = true
			simulateResult.value = await simulate({
				items: items,
				postalCode: postalCode.value,
				country: cart.value?.storePreferencesData.countryCode || 'BRA',
			})
		} finally {
			loading.value = false
		}
	}, [])

	return (
		<div class='flex flex-col gap-4 max-w-[484px]'>
			<div class='flex flex-col gap-3 sm:flex-row sm:gap-6 items-center'>
				<span class='text-[13px] font-medium uppercase w-full sm:w-[69px] font-lemon-milk'>
					Calcule o frete
				</span>
				<form
					class='flex items-center w-full sm:w-auto rounded-md border-2 border-light-gray-200 bg-white pr-2'
					onSubmit={(e) => {
						e.preventDefault()
						handleSimulation()
					}}
				>
					<input
						as='input'
						type='text'
						class='h-[46px] sm:h-12 input bg-white w-full sm:w-auto border-0 placeholder:text-xs sm:placeholder:text-sm text-xs sm:text-sm placeholder:text-dark text-dark'
						style={{ outline: 'none' }}
						placeholder='Informe o CEP'
						value={postalCode.value}
						maxLength={9}
						size={9}
						onChange={(e: { currentTarget: { value: string } }) => {
							postalCode.value = e.currentTarget.value.replace(/\D/g, '')
						}}
					/>
					<button
						type='submit'
						class='text-xs sm:text-sm text-white bg-dark py-2 px-3 rounded-md font-bold'
					>
						Calcular
					</button>
				</form>
				<a
					target='_blank'
					href='https://buscacepinter.correios.com.br/app/endereco/index.php?t'
					class='text-xs sm:text-sm underline font-regular w-full sm:w-[65px] uppercase'
				>
					Descobrir meu cep
				</a>
			</div>
			<div>
				<div>
					<ShippingContent simulation={simulateResult} />
				</div>
			</div>
		</div>
	)
}

export default ShippingSimulation
