import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { ResponseErrorRepo } from '~core';
import { getAllService, IServiceEntity } from '~modules/service';

const addQueueRouter: RouteObject = {
    path: 'add',
    Component: lazy(() => import('./page')),
    loader: async (): Promise<IServiceEntity[]> => {
        const res = await getAllService();
        if (res instanceof ResponseErrorRepo) {
            return [];
        }
        return res.data!;
    },
};

export default addQueueRouter;
