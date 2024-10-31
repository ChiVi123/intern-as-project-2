import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const reportRouter: RouteObject = {
    path: 'report',
    Component: lazy(() => import('./page')),
};

export default reportRouter;
