import { Avatar, Button, Layout, Skeleton } from 'antd';
import { BreadcrumbItemType, BreadcrumbProps } from 'antd/es/breadcrumb/Breadcrumb';
import { Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet, useMatches } from 'react-router-dom';

import { FirebaseAuth, ScrollToTop } from '~components';
import { designToken } from '~core';
import { AngleRightIcon, BellSolidIcon } from '~icons';
import { userSelectors } from '~modules/user';

import { Breadcrumb, ModalNotify, NotifyItem, Sidebar } from './components';

type ItemRender = BreadcrumbProps['itemRender'];

const ItemRender: ItemRender = (currentRoute, _params, items, paths) => {
    const isLink = currentRoute?.path === items[items.length - 1]?.path || currentRoute?.path === items[0]?.path;
    return isLink ? <span>{currentRoute.title}</span> : <Link to={`/${paths.join('/')}`}>{currentRoute.title}</Link>;
};

function DashboardLayout() {
    const currentUser = useSelector(userSelectors.data);
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
                    <div css={{ display: 'flex', alignItems: 'center', gap: 24, width: 212 }}>
                        <ModalNotify
                            content={
                                <>
                                    <NotifyItem />
                                    <NotifyItem />
                                    <NotifyItem />
                                    <NotifyItem />
                                    <NotifyItem />
                                    <NotifyItem />
                                    <NotifyItem />
                                </>
                            }
                            title='Thông báo'
                            trigger='click'
                        >
                            <Button
                                htmlType='button'
                                variant='filled'
                                color='primary'
                                shape='circle'
                                aria-label='notify'
                            >
                                <BellSolidIcon />
                            </Button>
                        </ModalNotify>

                        <Link to='/profile' style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Avatar src={<img src={currentUser?.photoURL} alt='avatar' />} />
                            <div style={{ flex: 1, lineHeight: 1 }}>
                                <div
                                    style={{
                                        fontSize: 12,
                                        lineHeight: 1.5,
                                    }}
                                >
                                    Xin chào
                                </div>
                                <div
                                    style={{
                                        fontWeight: 700,
                                        lineHeight: 1.5,
                                        color: designToken['gray-400'],
                                    }}
                                >
                                    {currentUser?.displayName}
                                </div>
                            </div>
                        </Link>
                    </div>
                </Layout.Header>

                <Layout.Content css={{ minHeight: '100vh', padding: '0 0 26px 16px' }}>
                    <Suspense fallback={<Skeleton />}>
                        <Outlet />
                    </Suspense>
                </Layout.Content>
            </Layout>
        </Layout>
    );
}

export default DashboardLayout;
