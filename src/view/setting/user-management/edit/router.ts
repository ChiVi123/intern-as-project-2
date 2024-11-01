import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const editUserRouter: RouteObject = {
    path: 'edit/:id',
    Component: lazy(() => import('./page')),
};

export default editUserRouter;
