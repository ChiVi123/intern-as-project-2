import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const serviceDetailRouter: RouteObject = {
    path: ':id',
    Component: lazy(() => import('./page')),
};

export default serviceDetailRouter;
