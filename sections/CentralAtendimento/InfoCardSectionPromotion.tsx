import { renderSection } from 'apps/website/pages/Page.tsx'
import { type Section } from '@deco/deco/blocks'
interface Props {
    /**
     * @title Título
     */
    title: string
    /**
     * @title Seções
     */
    sections: Section[]
}

export default function InfoCardSectionPromotion({ title, sections }: Props) {
    return (
        <div>
            <div class='flex flex-col gap-6 h-full w-full rounded-xl border border-light-gray p-6 md:p-16 '>
                <h2 class='font-lemon-milk flex w-full justify-start text-nowrap tracking-tight text-[16px] font-bold text-dark max-md:max-w-[296px] max-md:whitespace-normal'>
                    {title}
                </h2>
                <div class='flex flex-col gap-6'>
                    {sections.map((section, index) => (
                        <div key={index} class='w-full'>
                            {renderSection(section)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
