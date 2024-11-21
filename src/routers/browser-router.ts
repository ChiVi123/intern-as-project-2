import { createBrowserRouter } from 'react-router-dom';

import { BodyOnlyLayout, DashboardLayout, DefaultLayout } from '~layout';
import dashboardRouter from '~view/dashboard/router';
import addMonitorRouter from '~view/monitor/add/router';
import monitorDetailRouter from '~view/monitor/detail/router';
import editMonitorRouter from '~view/monitor/edit/router';
import monitorRouter from '~view/monitor/router';
import profileRouter from '~view/profile/router';
import addQueueRouter from '~view/queueing/add/router';
import queueingRouter from '~view/queueing/router';
import reportRouter from '~view/report/router';
import addServiceRouter from '~view/service/add/router';
import serviceDetailRouter from '~view/service/detail/router';
import editServiceRouter from '~view/service/edit/router';
import serviceRouter from '~view/service/router';
import addRoleUserRouter from '~view/setting/role-management/add/router';
import editRoleUserRouter from '~view/setting/role-management/edit/router';
import roleManagementRouter from '~view/setting/role-management/router';
import userLoggingRouter from '~view/setting/user-logging/router';
import addUserRouter from '~view/setting/user-management/add/router';
import editUserRouter from '~view/setting/user-management/edit/router';
import userManagementRouter from '~view/setting/user-management/router';
import signInRouter from '~view/sign-in/router';

import { NavigateDefault, PrivateRoute } from './components';

export const browserRouter = createBrowserRouter([
    {
        Component: DashboardLayout,
        children: [
            {
                Component: PrivateRoute,
                children: [dashboardRouter],
            },
        ],
    },
    {
        Component: DefaultLayout,
        children: [
            {
                Component: PrivateRoute,
                children: [
                    profileRouter,
                    {
                        path: '/monitor',
                        children: [
                            {
                                children: [monitorRouter, addMonitorRouter, monitorDetailRouter, editMonitorRouter],
                                handle: {
                                    title: 'Danh sách thiết bị',
                                    href: '/monitor',
                                },
                            },
                        ],
                        handle: {
                            title: 'Thiết bị',
                        },
                    },
                    {
                        path: '/service',
                        children: [
                            {
                                children: [serviceRouter, addServiceRouter, serviceDetailRouter, editServiceRouter],
                                handle: {
                                    title: 'Danh sách dịch vụ',
                                    href: '/service',
                                },
                            },
                        ],
                        handle: {
                            title: 'Dịch vụ',
                        },
                    },
                    {
                        path: '/queueing',
                        children: [
                            {
                                children: [queueingRouter, addQueueRouter],
                                handle: {
                                    title: 'Danh sách cấp số',
                                    href: '/service',
                                },
                            },
                        ],
                        handle: {
                            title: 'Cấp số',
                        },
                    },
                    {
                        path: '/report',
                        children: [reportRouter],
                        handle: {
                            title: 'Báo cáo',
                        },
                    },
                    {
                        path: 'setting',
                        children: [
                            {
                                path: 'role-management',
                                children: [roleManagementRouter, addRoleUserRouter, editRoleUserRouter],
                                handle: {
                                    title: 'Quản lý vai trò',
                                    href: '/setting/role-management',
                                },
                            },
                            {
                                path: 'user-management',
                                children: [userManagementRouter, addUserRouter, editUserRouter],
                                handle: {
                                    title: 'Quản lý tài khoản',
                                    href: '/setting/user-management',
                                },
                            },
                            userLoggingRouter,
                        ],
                        handle: {
                            title: 'Cài đặt hệ thống',
                        },
                    },
                ],
            },
        ],
    },
    {
        Component: BodyOnlyLayout,
        children: [signInRouter],
    },
    {
        path: '*',
        Component: NavigateDefault,
    },
]);
