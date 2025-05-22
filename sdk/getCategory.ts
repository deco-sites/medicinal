type CategoryItem = {
	id: number
	name: string
	hasChildren: boolean
	url: string
	children: CategoryItem[]
	Title: string
	MetaTagDescription: string
}

export async function getDepartmentCategories(url: string) {
	function getDepartment(url: string) {
		const { pathname } = new URL(url)
		const match = pathname.match(/^\/([^/]+)/)
		return match && match[1]
	}

	// function getCategory(url: string) {
	// 	const { pathname } = new URL(url)
	// 	const match = pathname.match(/^\/[^/]+\/([^/]+)/)
	// 	return match && match[1]
	// }

	const departmentName = getDepartment(url)
	if (!departmentName) return []

	const rawCategoryTree = await fetch(
		'https://tfcucl.vtexcommercestable.com.br/api/catalog_system/pub/category/tree/3',
		{
			method: 'GET',
			headers: {
				'content-type': 'application/json',
			},
		},
	)

	const categoryTree = await rawCategoryTree.json() as CategoryItem[]

	return categoryTree

	// const department = categoryTree.find((dept) => {
	// 	const deptName = getDepartment(dept.url)
	// 	return departmentName === deptName
	// })

	// const allDepartaments = categoryTree.reduce((acc, dept) => {
	// 	const deptName = getDepartment(dept.url)

	// 	if (deptName) acc.push(deptName)

	// 	return acc
	// }, [] as string[])

	// if (!department) return allDepartaments

	// const children = department.children.map((category) => getCategory(category.url)!)

	// return children.length > 0 ? children : allDepartaments
}

export async function categoryExists(path?: string) {
	if (!path) return false

	const baseUrl = 'https://tfcucl.vtexcommercestable.com.br/api/catalog_system/pub/portal/pagetype'

	const normalizedPath = path.replace(/\/$/, '')

	const rawResult = await fetch(`${baseUrl}${normalizedPath}`)

	const result = await rawResult.json()

	return result.pageType !== 'NotFound'
}
