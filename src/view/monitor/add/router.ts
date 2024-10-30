import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const addMonitorRouter: RouteObject = {
    path: 'add',
    Component: lazy(() => import('./page')),
};

export default addMonitorRouter;
