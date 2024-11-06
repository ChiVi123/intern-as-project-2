import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { ResponseErrorRepo } from '~core';
import { getDeviceById } from '~modules/device';

type DeviceField = {
    id: string;
    type: { label: string; value: string };
    name: string;
    usernameDevice: string;
    passwordDevice: string;
    ipAddress: string;
    services: string[];
};
const defaultDevice: DeviceField = {
    id: '',
    name: '',
    ipAddress: '',
    passwordDevice: '',
    usernameDevice: '',
    type: { label: '', value: '' },
    services: [],
};

const editMonitorRouter: RouteObject = {
    path: 'edit/:id',
    Component: lazy(() => import('./page')),
    loader: async ({ params: { id } }): Promise<DeviceField> => {
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
        const { serviceRefs, ...data } = res.data.data();
        return { ...data, id: res.data.id, services: serviceRefs.map((ref) => ref.id) };
    },
};

export default editMonitorRouter;
