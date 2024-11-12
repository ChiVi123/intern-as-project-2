import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { ResponseErrorRepo } from '~core';
import { getAllRole } from '~modules/role';

const addUserRouter: RouteObject = {
    path: 'add',
    Component: lazy(() => import('./page')),
    loader: async () => {
        const res = await getAllRole();

        if (res instanceof ResponseErrorRepo) {
            return [];
        }

        return res.data!.map((item) => ({ label: item.name, value: item.id }));
    },
};

export default addUserRouter;
