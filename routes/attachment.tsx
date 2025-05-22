import { FreshContext, Handlers } from '$fresh/server.ts'

export const handler: Handlers = {
	async POST(_req: Request, _ctx: FreshContext) {
		const params = new URLSearchParams(_req.url.split('?')[1])

		const acronym = params.get('acronym')
		const field = params.get('field')
		const id = params.get('id')

		const r = await fetch(
			`https://tfcucl.vtexcommercestable.com.br/api/dataentities/${acronym}/documents/${id}/${field}/attachments`,
			{
				method: 'POST',
				body: await _req.formData(),
			},
		)

		if (!r.ok) {
			return new Response(
				JSON.stringify({
					error: `${r.status} ${await r.text()}`,
				}),
				{ status: 400 },
			)
		}

		return new Response(null, { status: 204 })
	},
}
