import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const monitorRouter: RouteObject = {
    path: 'monitor',
    Component: lazy(() => import('./page')),
};

export default monitorRouter;
