import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const addServiceRouter: RouteObject = {
    path: 'add',
    Component: lazy(() => import('./page')),
};

export default addServiceRouter;
