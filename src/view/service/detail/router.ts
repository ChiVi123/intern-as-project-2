import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { ResponseErrorRepo } from '~core';
import { getServiceById, IServiceEntity } from '~modules/service';

const defaultValues: IServiceEntity = {
    id: '',
    name: '',
    description: '',
    rule: {
        autoIncrement: { start: 1, end: 9999 },
        prefix: '0001',
        suffix: '0001',
        reset: false,
    },
    status: { label: 'Hoạt động', value: 'running' },
};

const serviceDetailRouter: RouteObject = {
    path: ':id',
    Component: lazy(() => import('./page')),
    loader: async ({ params: { id } }): Promise<IServiceEntity> => {
        const res = await getServiceById(id || '');
        if (res instanceof ResponseErrorRepo) {
            return defaultValues;
        }
        return res.data!;
    },
    handle: {
        title: 'Chi tiết',
    },
};

export default serviceDetailRouter;
