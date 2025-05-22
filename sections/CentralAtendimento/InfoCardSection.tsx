import { renderSection } from 'apps/website/pages/Page.tsx';
import { type Section } from "@deco/deco/blocks";
interface Props {
    /**
     * @title Título
     */
    title: string;
    /**
     * @title Seções
     */
    sections: Section[];
}
export default function InfoCardSection({ title, sections }: Props) {
    return (<div class='flex flex-col gap-6 bg-ice p-6 rounded-xl w-full h-auto'>
			<h2 class='flex justify-start w-full font-bold font-lemon-milk text-[14px] text-dark text-nowrap sm:text-[16px] leading-[21.61px]'>
				{title}
			</h2>
			<div class='flex sm:flex-row flex-col justify-center items-center gap-6'>
				{sections.map((section, index) => (<div key={index} class='w-full'>
						{renderSection(section)}
					</div>))}
			</div>
		</div>);
}
