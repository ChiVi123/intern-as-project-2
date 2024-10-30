import { Layout, Skeleton } from 'antd';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { FirebaseAuth } from '~components';
import { Sidebar } from './components';

function DefaultLayout() {
    return (
        <Layout>
            <FirebaseAuth />
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

            <Layout.Content css={{ minHeight: '100vh', padding: '88px 104px 0 24px' }}>
                <Suspense fallback={<Skeleton />}>
                    <Outlet />
                </Suspense>
            </Layout.Content>
        </Layout>
    );
}

export default DefaultLayout;
