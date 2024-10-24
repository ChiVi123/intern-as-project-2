import { Layout, Skeleton } from 'antd';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

function BodyOnlyLayout() {
    return (
        <Layout>
            <Layout.Content css={{ minHeight: '100vh' }}>
                <Suspense fallback={<Skeleton />}>
                    <Outlet />
                </Suspense>
            </Layout.Content>
        </Layout>
    );
}

export default BodyOnlyLayout;
