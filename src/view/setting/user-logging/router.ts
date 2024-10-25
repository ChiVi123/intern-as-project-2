import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const userLoggingRouter: RouteObject = {
    path: '/setting/user-logging',
    Component: lazy(() => import('./page')),
};

export default userLoggingRouter;
