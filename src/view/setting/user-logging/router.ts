import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const userLoggingRouter: RouteObject = {
    path: 'user-logging',
    Component: lazy(() => import('./page')),
    handle: {
        title: 'Nhật ký hoạt động',
    },
};

export default userLoggingRouter;
