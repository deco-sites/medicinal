import { Head } from '$fresh/runtime.ts'

export interface contactPointProps {
	'@type': 'ContactPoint'
	telephone: string
	contactType: string
	areaServed: string
	availableLanguage: string
}

export interface jsonLdOrganizationProps {
	jsonOrganization: {
		name: string
		alternateName: string
		url: string
		logo: string
		contactPoint: contactPointProps[]
		sameAs: string[]
	}
}

export interface jsonLdWebsiteProps {
	jsonWebsite: {
		name: string
		url: string
		potentialAction: {
			target: string
			queryInput: string
		}
	}
}

export interface Props {
	organizationData?: jsonLdOrganizationProps
	websiteData?: jsonLdWebsiteProps
}

export default function SeoCustom({
	organizationData,
	websiteData,
}: Props) {
	const jsonDataOrganization = {
		'@context': 'https://schema.org',
		'@type': 'Corporation',
		...(organizationData?.jsonOrganization?.name &&
			{ name: organizationData.jsonOrganization.name }),
		...(organizationData?.jsonOrganization?.url &&
			{ url: organizationData.jsonOrganization.url }),
		...(organizationData?.jsonOrganization?.logo &&
			{ logo: organizationData.jsonOrganization.logo }),

		...(organizationData?.jsonOrganization?.contactPoint &&
			{ contactPoint: organizationData.jsonOrganization.contactPoint }),

		...(organizationData?.jsonOrganization?.sameAs &&
			{ sameAs: organizationData.jsonOrganization.sameAs }),
	}

	// console.log("orgData:", organizationData);

	// console.log(jsonDataOrganization);

	const jsonDataWebsite = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		...(websiteData?.jsonWebsite?.name &&
			{ name: websiteData.jsonWebsite.name }),
		...(websiteData?.jsonWebsite?.url && { url: websiteData.jsonWebsite.url }),
		potentialAction: {
			'@type': 'SearchAction',
			...(websiteData?.jsonWebsite?.potentialAction?.target &&
				{ target: websiteData.jsonWebsite.potentialAction.target }),
			...(websiteData?.jsonWebsite?.potentialAction?.queryInput &&
				{ 'query-input': websiteData.jsonWebsite.potentialAction.queryInput }),
		},
	}

	// console.log("tesete");
	return (
		<Head>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(jsonDataWebsite),
				}}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(jsonDataOrganization),
				}}
			/>
		</Head>
	)
}
