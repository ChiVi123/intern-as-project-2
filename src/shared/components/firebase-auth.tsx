import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { firebaseAuth } from '~config';
import { useAppDispatch } from '~core';
import { mapUserToUserEntity } from '~helper';
import { userActions } from '~modules/user';

function FirebaseAuth() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            dispatch(userActions.startPending());
            if (user) {
                console.log('authenticated');
                dispatch(userActions.addUser(mapUserToUserEntity(user)));
            } else {
                console.log('unauthenticated');
                dispatch(userActions.logout());
            }
        });

        return unsubscribe;
    }, [dispatch]);

    return null;
}

export default FirebaseAuth;
