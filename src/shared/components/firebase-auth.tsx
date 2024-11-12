import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { firebaseAuth } from '~config';
import { useAppDispatch } from '~core';
import { mapToUserEntity } from '~helper';
import { getUserById, userActions, userSelectors } from '~modules/user';

function FirebaseAuth() {
    const dispatch = useAppDispatch();
    const userState = useSelector(userSelectors.data);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, async (userAuth) => {
            dispatch(userActions.startPending());

            if (!userAuth) {
                console.log('unauthenticated');
                dispatch(userActions.logout());
                return;
            }

            if (userAuth && !userState) {
                console.log('authenticated');

                const userFirebaseRes = await getUserById(userAuth.uid).catch((error) => error as Error);
                if (userFirebaseRes instanceof Error) {
                    console.log(userFirebaseRes.message);
                    dispatch(userActions.endReject(userFirebaseRes.message));
                    return;
                }

                const userFirebase = userFirebaseRes.data!;
                dispatch(userActions.addUser(mapToUserEntity(userAuth, userFirebase)));
            }
        });

        return unsubscribe;
    }, [dispatch, userState]);

    return null;
}

export default FirebaseAuth;
