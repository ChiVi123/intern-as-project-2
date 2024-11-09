import { doc, DocumentReference } from 'firebase/firestore';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { firebaseStore } from '~config';
import { ResponseErrorRepo } from '~core';
import { getAllDevice, IDeviceEntity } from '~modules/device';
import { IServiceEntity } from '~modules/service';
import { getAllServiceByDeviceRef } from '~modules/service-device';

const monitorRouter: RouteObject = {
    path: '',
    Component: lazy(() => import('./page')),
    loader: async () => {
        const allDeviceRes = await getAllDevice();
        if (allDeviceRes instanceof ResponseErrorRepo) {
            return [];
        }
        const promise = [];
        for (const { id } of allDeviceRes.data!) {
            const ref = doc(firebaseStore, 'device', id) as DocumentReference<IDeviceEntity>;
            promise.push(getAllServiceByDeviceRef(ref));
        }

        const childData = await Promise.all(promise);
        for (const data of allDeviceRes.data!) {
            const servicesRes = childData.shift()!;

            if (servicesRes instanceof ResponseErrorRepo) {
                continue;
            }

            data.services = servicesRes.data!.map((item) => item.service as IServiceEntity);
        }
        return allDeviceRes.data!;
    },
};

export default monitorRouter;
