import { NavigationLoader } from 'site/loaders/centralNavigation.ts';
import Navigation from 'site/sections/CentralAtendimento/NavigationMenu.tsx';
import { useId } from 'site/sdk/useId.ts';
import { type Section } from "@deco/deco/blocks";
interface Props {
    /**
     * @title Seções
     */
    sections: Section[];
    loader: NavigationLoader;
}
export default function NavigationPage({ sections, loader }: Props) {
    return (<div class='flex lg:flex-row flex-col justify-center gap-16 mx-auto px-6 lg:px-10 py-8 w-full max-w-[1440px] h-auto'>
			<Navigation loader={loader}/>

			<div class='flex flex-col justify-start gap-6 w-full'>
				{sections.map(({ Component, props }) => Component ? <Component key={useId()} {...props}/> : <></>)}
			</div>
		</div>);
}
