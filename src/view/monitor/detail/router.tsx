import { getDoc } from 'firebase/firestore';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { ResponseErrorRepo } from '~core';
import { getDeviceById, IDeviceEntity } from '~modules/device';
import { IServiceEntity } from '~modules/service';

const defaultDevice: IDeviceEntity = {
    id: '',
    name: '',
    ipAddress: '',
    passwordDevice: '',
    usernameDevice: '',
    type: { label: '', value: '' },
    actionStatus: { label: '', value: '' },
    connectStatus: { label: '', value: '' },
    services: [],
    serviceRefs: [],
};

const monitorDetailRouter: RouteObject = {
    path: ':id',
    Component: lazy(() => import('./page')),
    loader: async ({ params: { id } }): Promise<IDeviceEntity> => {
        const res = await getDeviceById(id || '');

        if (res instanceof ResponseErrorRepo) {
            return defaultDevice;
        }
        if (!res.data) {
            return defaultDevice;
        }
        if (!res.data.exists()) {
            return defaultDevice;
        }
        const data = res.data.data();
        const services = await Promise.all(
            data.serviceRefs.map(async (ref) => {
                const service = await getDoc(ref);
                return { ...service.data(), id: service.id } as IServiceEntity;
            }),
        );
        return { ...data, id: res.data.id, services };
    },
};

export default monitorDetailRouter;
