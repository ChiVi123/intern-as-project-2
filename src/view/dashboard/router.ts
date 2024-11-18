import { collection, orderBy, query, where } from 'firebase/firestore';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { firebaseStore } from '~config';
import { getDocsData } from '~core';

const dashboardRouter: RouteObject = {
    path: '/dashboard',
    Component: lazy(() => import('./page')),
    loader: async () => {
        const areaCollection = collection(firebaseStore, 'statistics-area');
        const areaQuery = query(areaCollection, orderBy('date', 'asc'));
        const area = await getDocsData(areaQuery);

        const promiseRadials = [];
        const radialCollection = collection(firebaseStore, 'statistics-radial');

        for (const group of ['device', 'service', 'queueing']) {
            const radialQuery = query(radialCollection, where('group', '==', group), orderBy('priority', 'asc'));
            promiseRadials.push(getDocsData(radialQuery));
        }

        const radials = await Promise.all(promiseRadials);

        return { area, radials };
    },
    handle: {
        title: 'Dashboard',
        href: undefined,
    },
};

export default dashboardRouter;
