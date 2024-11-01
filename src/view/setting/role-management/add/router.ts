import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const addRoleUserRouter: RouteObject = {
    path: 'add',
    Component: lazy(() => import('./page')),
};

export default addRoleUserRouter;
