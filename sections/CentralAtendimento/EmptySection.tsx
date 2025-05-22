import { renderSection } from 'apps/website/pages/Page.tsx';
import { type Section } from "@deco/deco/blocks";
interface Props {
    /**
     * @title Seções
     */
    sections: Section[];
}
export default function EmptySection({ sections }: Props) {
    return (<div class='font-inter flex flex-col gap-6 rounded-xl border border-[#D2D2D2] p-8 md:p-16 text-sm md:text-base'>
			{sections.map((section, index) => (<div key={index}>
					{renderSection(section)}
				</div>))}
		</div>);
}