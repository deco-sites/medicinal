import { headerHeight } from 'site/components/header/constants.ts'
import Searchbar, { type Props as SearchbarProps } from 'site/components/search/Searchbar.tsx'
import Modal from 'site/components/ui/Modal.tsx'
import { useUI } from 'site/sdk/useUI.ts'

export interface Props {
	searchbar?: SearchbarProps
}

function SearchbarModal({ searchbar }: Props) {
	const { displaySearchPopup } = useUI()

	if (!searchbar) {
		return null
	}

	return <Searchbar {...searchbar} />
}

export default SearchbarModal
