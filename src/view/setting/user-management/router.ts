import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const userManagementRouter: RouteObject = {
    path: '/setting/user-management',
    Component: lazy(() => import('./page')),
};

export default userManagementRouter;
