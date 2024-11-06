import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { getAllService } from '~modules/service';

const serviceRouter: RouteObject = {
    path: '',
    Component: lazy(() => import('./page')),
    loader: async () => getAllService(),
};

export default serviceRouter;
