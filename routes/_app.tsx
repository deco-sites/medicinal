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
				<link href={asset(`/styles.css?revision=${revision}`)} rel='stylesheet' />

				{/* Glide Modules */}
				<link rel='stylesheet' href={asset(`/glide.core.min.css`)} />

				<script type='module' src={asset('/glide.min.js')} />

				{/* Web Manifest */}
				<link rel='manifest' href={asset('/site.webmanifest')} />

				{/* google-site-verification=iCJbdQEMujVQaR4D4m-PwH-WzpdHbHtviMn0ReC6h4Y */}
				<meta name='google-site-verification' content='iCJbdQEMujVQaR4D4m-PwH-WzpdHbHtviMn0ReC6h4Y' />

				<meta name='color-scheme' content='light only'></meta>
				<meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1'>
				</meta>

				<style
					type='text/css'
					dangerouslySetInnerHTML={{
						__html: `
            @font-face {
              font-family: 'Inter';
              src: url('${asset('/fonts/Inter-Light.woff2')}') format('woff2'),
                  url('${asset('/fonts/Inter-Light.woff')}') format('woff');
              font-weight: 300;
              font-style: normal;
              font-display: swap;
          }
          
          @font-face {
              font-family: 'Inter';
              src: url('${asset('/fonts/Inter-Black.woff2')}') format('woff2'),
                  url('${asset('/fonts/Inter-Black.woff')}') format('woff');
              font-weight: 900;
              font-style: normal;
              font-display: swap;
          }
          
          @font-face {
              font-family: 'Inter';
              src: url('${asset('/fonts/Inter-ExtraLight.woff2')}') format('woff2'),
                  url('${asset('/fonts/Inter-ExtraLight.woff')}') format('woff');
              font-weight: 200;
              font-style: normal;
              font-display: swap;
          }
          
          @font-face {
              font-family: 'Inter';
              src: url('${asset('/fonts/Inter-ExtraBold.woff2')}') format('woff2'),
                  url('${asset('/fonts/Inter-ExtraBold.woff')}') format('woff');
              font-weight: bold;
              font-style: normal;
              font-display: swap;
          }
          
          @font-face {
              font-family: 'Inter';
              src: url('${asset('/fonts/Inter-Bold.woff2')}') format('woff2'),
                  url('${asset('/fonts/Inter-Bold.woff')}') format('woff');
              font-weight: bold;
              font-style: normal;
              font-display: swap;
          }
          
          @font-face {
              font-family: 'Inter';
              src: url('${asset('/fonts/Inter-Italic.woff2')}') format('woff2'),
                  url('${asset('/fonts/Inter-Italic.woff')}') format('woff');
              font-weight: normal;
              font-style: italic;
              font-display: swap;
          }
          
          @font-face {
              font-family: 'Inter';
              src: url('${asset('/fonts/Inter-Medium.woff2')}') format('woff2'),
                  url('${asset('/fonts/Inter-Medium.woff')}') format('woff');
              font-weight: 500;
              font-style: normal;
              font-display: swap;
          }
          
          @font-face {
              font-family: 'Inter';
              src: url('${asset('/fonts/Inter-Regular.woff2')}') format('woff2'),
                  url('${asset('/fonts/Inter-Regular.woff')}') format('woff');
              font-weight: normal;
              font-style: normal;
              font-display: swap;
          }
          
          @font-face {
              font-family: 'Inter';
              src: url('${asset('/fonts/Inter-SemiBold.woff2')}') format('woff2'),
                  url('${asset('/fonts/Inter-SemiBold.woff')}') format('woff');
              font-weight: 600;
              font-style: normal;
              font-display: swap;
          }
          
          @font-face {
              font-family: 'Inter';
              src: url('${asset('/fonts/Inter-Thin.woff2')}') format('woff2'),
                  url('${asset('/fonts/Inter-Thin.woff')}') format('woff');
              font-weight: 100;
              font-style: normal;
              font-display: swap;
          }
          
          @font-face {
            font-family: 'LEMON MILK';
            src: url('${asset('/fonts/LEMONMILK-Bold.woff2')}') format('woff2'),
                url('${asset('/fonts/LEMONMILK-Bold.woff')}') format('woff');
            font-weight: bold;
            font-style: normal;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'LEMON MILK';
            src: url('${asset('/fonts/LEMONMILK-Light.woff2')}') format('woff2'),
                url('${asset('/fonts/LEMONMILK-Light.woff')}') format('woff');
            font-weight: 300;
            font-style: normal;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'LEMON MILK';
            src: url('${asset('/fonts/LEMONMILK-Medium.woff2')}') format('woff2'),
                url('${asset('/fonts/LEMONMILK-Medium.woff')}') format('woff');
            font-weight: 500;
            font-style: normal;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'LEMON MILK';
            src: url('${asset('/fonts/LEMONMILK-Regular.woff2')}') format('woff2'),
                url('${asset('/fonts/LEMONMILK-Regular.woff')}') format('woff');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
        }                 
            `,
					}}
				/>

        <script type="text/javascript" src="//cdn-4.convertexperiments.com/js/100412841-100413668.js"></script>
			</Head> 

			{/* Rest of Preact tree */}
			<ctx.Component />

			{/* Include service worker */}
			<script type='module' dangerouslySetInnerHTML={{ __html: `(${sw})();` }} />

			<script
				type='text/javascript'
				defer
				dangerouslySetInnerHTML={{
					__html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://load.servergtm.truesource.com.br/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WX9LGXR');
          `,
				}}
			/>

			<noscript>
				<iframe
					src='https://load.servergtm.truesource.com.br/ns.html?id=GTM-WX9LGXR'
					height='0'
					width='0'
					style='display:none;visibility:hidden'
				/>
			</noscript>
		</>
	)
})
