import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { ResponseErrorRepo } from '~core';
import { getRoleById, IRoleEntity } from '~modules/role';

const rawRole: IRoleEntity = {
    id: '',
    name: '',
    description: '',
    featureGroups: {},
};

const editRoleUserRouter: RouteObject = {
    path: 'edit/:id',
    Component: lazy(() => import('./page')),
    loader: async ({ params: { id } }) => {
        const res = await getRoleById(id ?? '');
        if (res instanceof ResponseErrorRepo) {
            console.log(res.error);
            return rawRole;
        }

        return res.data!;
    },
    handle: { title: 'Cập nhật vai trò' },
};

export default editRoleUserRouter;
