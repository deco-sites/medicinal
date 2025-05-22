import { asset, Head } from '$fresh/runtime.ts'
import { defineApp } from '$fresh/server.ts'
import Theme from 'site/sections/Theme/Theme.tsx'
import { Context } from '@deco/deco'
const sw = () => addEventListener('load', () => navigator?.serviceWorker?.register('/sw.js'))
export default defineApp(async (_req, ctx) => {
	const revision = await Context.active().release?.revision()
	return (
		<>
			{/* Include default fonts and css vars */}
			<Theme />

			{/* Include Icons and manifest */}
			<Head>
				{/* Enable View Transitions API */}
				<meta name='view-transition' content='same-origin' />

				{/* Tailwind v3 CSS file */}
				<link
					href={asset(`/styles.css?revision=${revision}`)}
					rel='stylesheet'
				/>

				{/* Web Manifest */}
				<link rel='manifest' href={asset('/site.webmanifest')} />

				<meta name='color-scheme' content='light only'></meta>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, maximum-scale=1'
				>
				</meta>

				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossorigin=''
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Roboto:wght@400,600&display=swap'
					rel='stylesheet'
				/>
			</Head>

			{/* Rest of Preact tree */}
			<ctx.Component />

			{/* Include service worker */}
			<script
				type='module'
				dangerouslySetInnerHTML={{ __html: `(${sw})();` }}
			/>
		</>
	)
})
