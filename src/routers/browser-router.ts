import { createBrowserRouter } from 'react-router-dom';

import { BodyOnlyLayout, DefaultLayout } from '~layout';
import profileRouter from '~view/dashboard/profile/router';
import dashboardRouter from '~view/dashboard/router';
import homeRouter from '~view/home/router';
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
        ],
    },
    {
        path: '',
        Component: BodyOnlyLayout,
        children: [signInRouter],
    },
]);
