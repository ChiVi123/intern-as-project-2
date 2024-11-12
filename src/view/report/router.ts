import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const reportRouter: RouteObject = {
    path: '',
    Component: lazy(() => import('./page')),
    handle: {
        title: 'Lập báo cáo',
    },
};

export default reportRouter;
