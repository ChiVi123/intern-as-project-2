import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const editRoleUserRouter: RouteObject = {
    path: 'edit/:id',
    Component: lazy(() => import('./page')),
};

export default editRoleUserRouter;
