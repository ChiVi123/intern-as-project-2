import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { ResponseErrorRepo } from '~core';
import { getAllUser, IUserFireBase } from '~modules/user';

const userManagementRouter: RouteObject = {
    path: '',
    Component: lazy(() => import('./page')),
    loader: async (): Promise<IUserFireBase[]> => {
        const res = await getAllUser();

        if (res instanceof ResponseErrorRepo) {
            console.log(res.error);
            return [];
        }

        return res.data!;
    },
};

export default userManagementRouter;
