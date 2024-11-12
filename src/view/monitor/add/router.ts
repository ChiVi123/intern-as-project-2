import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const addMonitorRouter: RouteObject = {
    path: 'add',
    Component: lazy(() => import('./page')),
    handle: {
        title: 'Thêm thiết bị',
    },
};

export default addMonitorRouter;
