import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { useMemo } from 'react';
import { useMatches } from 'react-router-dom';

export const useBreadcrumb = (): BreadcrumbItemType[] => {
    const matchers = useMatches();
    return useMemo<BreadcrumbItemType[]>(() => {
        return matchers
            .filter((matcher) => Boolean(matcher.handle))
            .map(
                ({ handle }) =>
                    ({
                        title: handle && typeof handle === 'object' && 'title' in handle ? handle?.title : '',
                        path: handle && typeof handle === 'object' && 'href' in handle ? handle?.href : undefined,
                    } as BreadcrumbItemType),
            );
    }, [matchers]);
};
