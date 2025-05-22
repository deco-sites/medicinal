import { type Section } from "@deco/deco/blocks";
interface Props {
    sections: Section[];
}
export default function ProductContainer({ sections }: Props) {
    return (<div class='rounded-[35px] overflow-hidden' style={{ boxShadow: '0 0px 35px rgba(0,0,0,.2)' }}>
			{sections?.map((section) => {
            const { Component, props } = section;
            return <Component {...props}/>;
        })}
		</div>);
}
