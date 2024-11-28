import { Timestamp } from 'firebase/firestore/lite';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { ResponseErrorRepo, ResponseRepo } from '~core';
import { getAllDevice, IDeviceEntity } from '~modules/device';
import { getAllQueueingNotRef, IQueueingEntity } from '~modules/queueing';
import { getAllService, IServiceEntity } from '~modules/service';

const isResponseRepo = <T>(value: ResponseErrorRepo | ResponseRepo<T>): value is ResponseRepo<T> =>
    !(value instanceof ResponseErrorRepo);

const dashboardRouter: RouteObject = {
    path: '/dashboard',
    Component: lazy(() => import('./page')),
    loader: async () => {
        console.time('Execution Time');
        // const defaultOldestRes = await getOldestDocument();
        // const defaultOldest = isResponseRepo(defaultOldestRes) ? defaultOldestRes.data : Timestamp.now();

        // const promiseDevice: CountPromise[] = [];
        // ['running', 'stopping'].forEach((status) => {
        //     promiseDevice.push(countDeviceByActionStatus(status));
        // });
        // const deviceCount = await Promise.all(promiseDevice);

        const deviceRes = await getAllDevice();
        let deviceRunning: IDeviceEntity[] = [];
        let deviceStopping: IDeviceEntity[] = [];
        if (isResponseRepo(deviceRes)) {
            deviceRunning = deviceRes.data!.filter((item) => item.actionStatus.value === 'running');
            deviceStopping = deviceRes.data!.filter((item) => item.actionStatus.value === 'stopping');
        }

        // const promiseService: CountPromise[] = [];
        // ['running', 'stopping'].forEach((status) => {
        //     promiseService.push(countServiceByStatus(status));
        // });
        // const serviceCount = await Promise.all(promiseService);

        const serviceRes = await getAllService();
        let serviceRunning: IServiceEntity[] = [];
        let serviceStopping: IServiceEntity[] = [];
        if (isResponseRepo(serviceRes)) {
            serviceRunning = serviceRes.data!.filter((item) => item.status.value === 'running');
            serviceStopping = serviceRes.data!.filter((item) => item.status.value === 'stopping');
        }

        // const promiseQueueing: CountPromise[] = [];
        // ['used', 'pending', 'passed'].forEach((status) => {
        //     promiseQueueing.push(countQueueingByStatus(status));
        // });
        // const queueingCount = await Promise.all(promiseQueueing);

        const queueRes = await getAllQueueingNotRef();
        let defaultOldest = Timestamp.now();
        let queueUsed: IQueueingEntity[] = [];
        let queuePending: IQueueingEntity[] = [];
        let queuePassed: IQueueingEntity[] = [];
        if (isResponseRepo(queueRes)) {
            defaultOldest = queueRes.data![0].createdAt;
            queueUsed = queueRes.data!.filter((item) => item.status.value === 'used');
            queuePending = queueRes.data!.filter((item) => item.status.value === 'pending');
            queuePassed = queueRes.data!.filter((item) => item.status.value === 'passed');
        }

        const radials = [
            {
                group: 'device',
                groupName: 'Thiết bị',
                textColor: '#ff7506',
                total: deviceRunning.length + deviceStopping.length,
                data: [
                    {
                        name: 'running',
                        label: 'Đang hoạt động',
                        count: deviceRunning.length,
                        dotColor: '#ffd130',
                        priority: 0,
                    },
                    {
                        name: 'stopping',
                        label: 'Ngưng hoạt động',
                        count: deviceStopping.length,
                        dotColor: '#7e7d88',
                        priority: 1,
                    },
                ],
            },
            {
                group: 'service',
                groupName: 'Dịch vụ',
                textColor: '#4277ff',
                total: serviceRunning.length + serviceStopping.length,
                data: [
                    {
                        dotColor: '#4277ff',
                        name: 'running',
                        label: 'Đang hoạt động',
                        count: serviceRunning.length,
                        priority: 0,
                    },
                    {
                        dotColor: '#7e7d88',
                        name: 'stopping',
                        label: 'Ngưng hoạt động',
                        count: serviceStopping.length,
                        priority: 1,
                    },
                ],
            },
            {
                group: 'queueing',
                groupName: 'Cấp số',
                textColor: '#35c75a',
                total: queueUsed.length + queuePending.length + queuePassed.length,
                ago: 0,
                data: [
                    {
                        dotColor: '#35c75a',
                        name: 'used',
                        label: 'Đã sử dụng',
                        count: queueUsed.length,
                        ago: 0,
                        priority: 0,
                    },
                    {
                        dotColor: '#7e7d88',
                        name: 'pending',
                        label: 'Đang chờ',
                        count: queuePending.length,
                        ago: 0,
                        priority: 1,
                    },
                    {
                        dotColor: '#35c75a',
                        name: 'passed',
                        label: 'Bỏ qua',
                        count: queuePassed.length,
                        ago: 0,
                        priority: 2,
                    },
                ],
            },
        ];

        console.timeEnd('Execution Time');

        return { radials, defaultOldest };
    },
    handle: {
        title: 'Dashboard',
        href: undefined,
    },
};

export default dashboardRouter;
