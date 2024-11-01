import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const roleManagementRouter: RouteObject = {
    path: '',
    Component: lazy(() => import('./page')),
};

export default roleManagementRouter;
