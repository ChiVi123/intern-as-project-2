import { createBrowserRouter } from 'react-router-dom';

import { BodyOnlyLayout, DefaultLayout } from '~layout';
import profileRouter from '~view/dashboard/profile/router';
import dashboardRouter from '~view/dashboard/router';
import homeRouter from '~view/home/router';
import addMonitorRouter from '~view/monitor/add/router';
import monitorDetailRouter from '~view/monitor/detail/router';
import editMonitorRouter from '~view/monitor/edit/router';
import monitorRouter from '~view/monitor/router';
import addQueueRouter from '~view/queueing/add/router';
import queueingRouter from '~view/queueing/router';
import reportRouter from '~view/report/router';
import serviceDetailRouter from '~view/service/detail/router';
import editServiceRouter from '~view/service/edit/router';
import serviceRouter from '~view/service/router';
import roleManagementRouter from '~view/setting/role-management/router';
import userLoggingRouter from '~view/setting/user-logging/router';
import userManagementRouter from '~view/setting/user-management/router';
import signInRouter from '~view/sign-in/router';

import { PrivateRoute } from './components';

export const browserRouter = createBrowserRouter([
    {
        path: '',
        Component: DefaultLayout,
        children: [
            {
                path: '',
                Component: PrivateRoute,
                children: [
                    homeRouter,
                    {
                        path: '/dashboard',
                        children: [dashboardRouter, profileRouter],
                    },
                    {
                        path: '/monitor',
                        children: [monitorRouter, addMonitorRouter, monitorDetailRouter, editMonitorRouter],
                    },
                    {
                        path: '/service',
                        children: [serviceRouter, serviceDetailRouter, editServiceRouter],
                    },
                    {
                        path: '/queueing',
                        children: [queueingRouter, addQueueRouter],
                    },
                    reportRouter,
                    roleManagementRouter,
                    userManagementRouter,
                    userLoggingRouter,
                ],
            },
        ],
    },
    {
        path: '',
        Component: BodyOnlyLayout,
        children: [signInRouter],
    },
]);
