import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { ResponseErrorRepo } from '~core';
import { getAllQueueing, IQueueingEntity } from '~modules/queueing';

const queueingRouter: RouteObject = {
    path: '',
    Component: lazy(() => import('./page')),
    loader: async (): Promise<IQueueingEntity[]> => {
        const res = await getAllQueueing();
        if (res instanceof ResponseErrorRepo) {
            return [];
        }

        return res.data!;
    },
};

export default queueingRouter;
