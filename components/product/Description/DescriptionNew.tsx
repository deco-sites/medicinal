import { AppContext } from 'site/apps/site.ts'
import { type Section } from '@deco/deco/blocks'
import Description from 'site/components/product/Description/Description.tsx'
import { renderSection } from 'apps/website/pages/Page.tsx';


/**
 * @titleBy matcher
 */
interface TypeDescription {
    matcher: string
    sections: Section[]
}

interface Props {
    descriptions:TypeDescription[]
}

 function Descriptions (props: ReturnType<typeof loader>) {
     const sections = props.description?.sections ?? []
        return sections.map(renderSection)
}

export function loader(props: Props, req: Request, ctx: AppContext) {
    const description = (props.descriptions ?? []).find((d) => new URLPattern({ pathname: d.matcher }).test(req.url))
    return {
        ...props,
        description,
    }
}



export default Descriptions