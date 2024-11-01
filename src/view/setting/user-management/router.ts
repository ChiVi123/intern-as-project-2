import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const userManagementRouter: RouteObject = {
    path: '',
    Component: lazy(() => import('./page')),
};

export default userManagementRouter;
