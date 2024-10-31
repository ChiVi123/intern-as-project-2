import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const serviceRouter: RouteObject = {
    path: '',
    Component: lazy(() => import('./page')),
};

export default serviceRouter;