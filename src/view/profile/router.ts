import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const profileRouter: RouteObject = {
    path: 'profile',
    Component: lazy(() => import('./page')),
    handle: {
        title: 'Thông tin cá nhân',
    },
};

export default profileRouter;
