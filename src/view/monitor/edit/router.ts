import { doc, DocumentReference } from 'firebase/firestore';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { firebaseStore } from '~config';
import { ResponseErrorRepo } from '~core';
import { getDeviceById, IDeviceEntity } from '~modules/device';
import { getAllServiceByDeviceRef } from '~modules/service-device';

type DeviceField = {
    id: string;
    type: string;
    name: string;
    usernameDevice: string;
    passwordDevice: string;
    ipAddress: string;
    serviceIds: string[];
};
const defaultDevice: DeviceField = {
    id: '',
    name: '',
    ipAddress: '',
    passwordDevice: '',
    usernameDevice: '',
    type: '',
    serviceIds: [],
};

const editMonitorRouter: RouteObject = {
    path: 'edit/:id',
    Component: lazy(() => import('./page')),
    loader: async ({ params: { id } }): Promise<DeviceField> => {
        const deviceRes = await getDeviceById(id || '');

        if (deviceRes instanceof ResponseErrorRepo) {
            return defaultDevice;
        }
        const deviceRef = doc(firebaseStore, 'device', deviceRes.data!.id) as DocumentReference<IDeviceEntity>;
        const serviceRes = await getAllServiceByDeviceRef(deviceRef);

        if (serviceRes instanceof ResponseErrorRepo) {
            return defaultDevice;
        }

        return { ...deviceRes.data!, serviceIds: serviceRes.data!.map((item) => item.service.id) };
    },
    handle: {
        title: 'Cập nhật thiết bị',
    },
};

export default editMonitorRouter;
