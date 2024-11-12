import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { ResponseErrorRepo } from '~core';
import { getAllRole } from '~modules/role';
import { getUserById, IUserFireBase } from '~modules/user';

const rawUserFirebase: IUserFireBase = {
    id: '',
    email: '',
    phoneNumber: '',
    role: null,
    status: '',
    username: '',
    displayName: '',
};

const editUserRouter: RouteObject = {
    path: 'edit/:id',
    Component: lazy(() => import('./page')),
    loader: async ({ params: { id } }) => {
        const userFirebaseRes = await getUserById(id ?? '');
        const allRoleRes = await getAllRole();

        const user = userFirebaseRes instanceof ResponseErrorRepo ? rawUserFirebase : userFirebaseRes.data!;
        const options =
            allRoleRes instanceof ResponseErrorRepo
                ? []
                : allRoleRes.data!.map((item) => ({ label: item.name, value: item.id }));

        return { user, options };
    },
    handle: { title: 'Cập nhật tài khoản' },
};

export default editUserRouter;
