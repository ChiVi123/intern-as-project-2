import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const addQueueRouter: RouteObject = {
    path: 'add',
    Component: lazy(() => import('./page')),
};

export default addQueueRouter;
