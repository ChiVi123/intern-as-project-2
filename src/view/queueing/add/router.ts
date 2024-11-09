import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { getAllService } from '~modules/service';

const addQueueRouter: RouteObject = {
    path: 'add',
    Component: lazy(() => import('./page')),
    loader: async () => getAllService(),
};

export default addQueueRouter;
