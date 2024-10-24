import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const signInRouter: RouteObject = {
    path: '/sign-in',
    Component: lazy(() => import('./page')),
};

export default signInRouter;
