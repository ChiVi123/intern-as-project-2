import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { getServiceById } from '~modules/service';

const serviceDetailRouter: RouteObject = {
    path: ':id',
    Component: lazy(() => import('./page')),
    loader: async ({ params: { id } }) => getServiceById(id || ''),
};

export default serviceDetailRouter;
