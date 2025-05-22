import { renderSection } from 'apps/website/pages/Page.tsx';
import { type Section } from "@deco/deco/blocks";
interface Props {
    sections: Section[];
}
export default function ({ sections }: Props) {
    return (<div>
			{sections.map(renderSection)}
		</div>);
}
