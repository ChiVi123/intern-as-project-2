import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { getServiceById } from '~modules/service';

const editServiceRouter: RouteObject = {
    path: 'edit/:id',
    Component: lazy(() => import('./page')),
    loader: async ({ params: { id } }) => getServiceById(id || ''),
};

export default editServiceRouter;
