import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const dashboardRouter: RouteObject = {
    path: '/dashboard',
    Component: lazy(() => import('./page')),
    handle: {
        title: 'Dashboard',
        href: undefined,
    },
};

export default dashboardRouter;
