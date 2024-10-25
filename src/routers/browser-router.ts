import { createBrowserRouter } from 'react-router-dom';

import { BodyOnlyLayout, DefaultLayout } from '~layout';
import profileRouter from '~view/dashboard/profile/router';
import dashboardRouter from '~view/dashboard/router';
import homeRouter from '~view/home/router';
import monitorRouter from '~view/monitor/router';
import roleManagementRouter from '~view/setting/role-management/router';
import userLoggingRouter from '~view/setting/user-logging/router';
import userManagementRouter from '~view/setting/user-management/router';
import signInRouter from '~view/sign-in/router';

export const browserRouter = createBrowserRouter([
    {
        path: '',
        Component: DefaultLayout,
        children: [
            homeRouter,
            {
                path: '/dashboard',
                children: [dashboardRouter, profileRouter],
            },
            monitorRouter,
            roleManagementRouter,
            userManagementRouter,
            userLoggingRouter,
        ],
    },
    {
        path: '',
        Component: BodyOnlyLayout,
        children: [signInRouter],
    },
]);
