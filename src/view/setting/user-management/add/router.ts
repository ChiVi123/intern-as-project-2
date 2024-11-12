import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { ResponseErrorRepo } from '~core';
import { getAllRole } from '~modules/role';

const addUserRouter: RouteObject = {
    path: 'add',
    Component: lazy(() => import('./page')),
    loader: async () => {
        const res = await getAllRole();
        return res instanceof ResponseErrorRepo ? [] : res.data!.map((item) => ({ label: item.name, value: item.id }));
    },
    handle: { title: 'Thêm tài khoản' },
};

export default addUserRouter;
