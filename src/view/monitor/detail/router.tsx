import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const monitorDetailRouter: RouteObject = {
    path: ':id',
    Component: lazy(() => import('./page')),
};

export default monitorDetailRouter;
