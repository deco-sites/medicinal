import { AppContext } from 'site/apps/site.ts';
import { URLPattern } from 'site/matchers/canonical.ts';
import { type Matcher } from "@deco/deco/blocks";
export interface Matchable {
    /** @title Regra de aplicação do conteúdo */
    rule?: Matcher;
}
type Params<T extends Matchable> = {
    items: T[];
    request: Request;
    context: AppContext;
};
export async function filterByMatcher<T extends Matchable>({ items = [], request, context }: Params<T>) {
    const matchPromises = items.map(({ rule }) => {
        return new Promise<boolean>((resolve) => {
            if (rule) {
                context.get(rule).then((matcher) => {
                    const matches = matcher({
                        device: context.device,
                        siteId: 0,
                        request,
                    });
                    resolve(matches);
                });
            }
            else {
                // Keeps the item if no rule was defined
                resolve(true);
            }
        });
    });
    const matches = await Promise.all(matchPromises);
    return items.filter((_, index) => matches[index]);
}
export function testCanonical({ value, stopPropagation = false }: URLPattern, url: string) {
    const { pathname: canonicalPath } = new URL(url);
    const canonicalWithBar = canonicalPath.replace(/\/*$/, '/');
    const valueWithBar = value.replace(/\/*$/, '/');
    if (stopPropagation)
        return canonicalWithBar === valueWithBar;
    return canonicalWithBar.includes(valueWithBar);
}
