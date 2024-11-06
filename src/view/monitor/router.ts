import { getDoc } from 'firebase/firestore';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { ResponseErrorRepo } from '~core';
import { getAllDevice } from '~modules/device';

const monitorRouter: RouteObject = {
    path: '',
    Component: lazy(() => import('./page')),
    loader: async () => {
        const res = await getAllDevice();
        if (res instanceof ResponseErrorRepo) {
            return [];
        }

        if (!res.data) {
            return [];
        }

        return Promise.all(
            res.data.docs.map(async (doc) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { type, usernameDevice, passwordDevice, serviceRefs, ...data } = doc.data();
                const servicePromise = await Promise.all(
                    serviceRefs.map(async (ref) => {
                        const service = await getDoc(ref);
                        return service.data()?.name;
                    }),
                );
                return { ...data, id: doc.id, services: servicePromise.join(', ') };
            }),
        );
    },
};

export default monitorRouter;
