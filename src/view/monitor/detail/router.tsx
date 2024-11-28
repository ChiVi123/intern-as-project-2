import { doc, DocumentReference, Timestamp } from 'firebase/firestore';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { firebaseStore } from '~config';
import { ResponseErrorRepo } from '~core';
import { getDeviceById, IDeviceEntity } from '~modules/device';
import { IServiceEntity } from '~modules/service';
import { getAllServiceByDeviceRef } from '~modules/service-device';

const defaultDevice: IDeviceEntity = {
    id: '',
    name: '',
    ipAddress: '',
    passwordDevice: '',
    usernameDevice: '',
    type: '',
    actionStatus: { label: '', value: '' },
    connectStatus: { label: '', value: '' },
    services: [],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
};

const monitorDetailRouter: RouteObject = {
    path: ':id',
    Component: lazy(() => import('./page')),
    loader: async ({ params: { id } }): Promise<IDeviceEntity> => {
        const deviceRes = await getDeviceById(id || '');

        if (deviceRes instanceof ResponseErrorRepo) {
            return defaultDevice;
        }
        const deviceRef = doc(firebaseStore, 'device', deviceRes.data!.id) as DocumentReference<IDeviceEntity>;
        const serviceRes = await getAllServiceByDeviceRef(deviceRef);

        if (serviceRes instanceof ResponseErrorRepo) {
            return defaultDevice;
        }

        return { ...deviceRes.data!, services: serviceRes.data!.map((item) => item.service as IServiceEntity) };
    },
    handle: {
        title: 'Chi tiết thiết bị',
    },
};

export default monitorDetailRouter;
