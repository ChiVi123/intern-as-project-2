import { Layout, Skeleton } from 'antd';
import { BreadcrumbItemType, BreadcrumbProps } from 'antd/es/breadcrumb/Breadcrumb';
import { Suspense, useMemo } from 'react';
import { Link, Outlet, useMatches } from 'react-router-dom';

import { FirebaseAuth, ScrollToTop } from '~components';
import { AngleRightIcon } from '~icons';

import { Breadcrumb, Sidebar } from './components';

type ItemRender = BreadcrumbProps['itemRender'];

const ItemRender: ItemRender = (currentRoute, _params, items, paths) => {
    const isLink = currentRoute?.path === items[items.length - 1]?.path || currentRoute?.path === items[0]?.path;
    return isLink ? <span>{currentRoute.title}</span> : <Link to={`/${paths.join('/')}`}>{currentRoute.title}</Link>;
};

function DefaultLayout() {
    const matchers = useMatches();
    const breadcrumb = useMemo<BreadcrumbItemType[]>(() => {
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

    return (
        <Layout>
            <FirebaseAuth />
            <ScrollToTop />

            <Layout.Sider
                css={{
                    '&.ant-layout-sider .ant-layout-sider-children': {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        paddingBlock: 32,
                    },
                }}
            >
                <Sidebar />
            </Layout.Sider>

            <Layout>
                <Layout.Header
                    css={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: 'calc(100% - 200px)',
                        backgroundColor: 'transparent',
                        paddingInline: 24,
                    }}
                >
                    <Breadcrumb items={breadcrumb} separator={<AngleRightIcon />} itemRender={ItemRender} />
                </Layout.Header>

                <Layout.Content css={{ minHeight: '100vh', padding: '0 104px 26px 24px', marginTop: 88 }}>
                    <Suspense fallback={<Skeleton />}>
                        <Outlet />
                    </Suspense>
                </Layout.Content>
            </Layout>
        </Layout>
    );
}

export default DefaultLayout;
