import { Layout, Skeleton, Typography } from 'antd';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

function DefaultLayout() {
    return (
        <Layout>
            <Layout.Sider>
                <Typography.Title css={{ 'h1&': { color: 'magenta' } }}>Sider</Typography.Title>
            </Layout.Sider>

            <Layout.Content css={{ minHeight: '100vh', padding: '88px 104px 0 24px' }}>
                <Suspense fallback={<Skeleton />}>
                    <Outlet />
                </Suspense>
            </Layout.Content>
        </Layout>
    );
}

export default DefaultLayout;
