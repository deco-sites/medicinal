import type { ProductDetailsPage } from 'apps/commerce/types.ts'
import { AppContext } from 'site/apps/site.ts'
// import Trustvox from 'site/islands/Product/Trustvox.tsx'
// import Description from './Description/Description.tsx'
import ProductInfo from './ProductInfo.tsx'
import { type Section } from '@deco/deco/blocks'
/**
 * @titleBy matcher
 */
interface TypeDescription {
    matcher: string
    sections: Section[]
}
export interface Props {
    /** @title Integration */
    page: ProductDetailsPage | null
}

export default function ProductMain(props: ReturnType<typeof loader>) {
    if (props.page === null) {
        return null
    }
    const { page } = props
    const { product } = page
    // const {
    //     isVariantOf: {
    //         // @ts-expect-error - name exists
    //         name: productName,
    //     },
    // } = product
    if (product === null) {
        return null
    }
    if (!product.isVariantOf) {
        return null
    }
    return (
        <div>
            <div class='container'>
                <ProductInfo page={props.page} isMobile={props.isMobile} />
            </div>
           
        </div>
    )
}
export function loader(props: Props, req: Request, ctx: AppContext) {

    return {
        ...props,
        isMobile: ctx.device !== 'desktop',
    }
}
