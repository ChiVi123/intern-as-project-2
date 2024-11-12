import { createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { query, where } from 'firebase/firestore';

import { firebaseAuth } from '~config';
import { getDocsRefs } from '~core';
import { mapToUserEntity } from '~helper';

import { IUserEntity } from './entity';
import { userCollection } from './repository';

type SignInRequestType = { username: string; password: string };

export const fetchSignIn = createAsyncThunk<IUserEntity, SignInRequestType, { rejectValue: string }>(
    'user/fetchSignIn',
    async ({ username, password }, { rejectWithValue }) => {
        const q = query(userCollection, where('username', '==', username));
        const snapshot = await getDocsRefs(q, { idField: 'id' }).catch((error) => error as Error);
        if (snapshot instanceof Error || !snapshot.length) {
            console.log(snapshot);
            return rejectWithValue('Tài khoản không tồn tại');
        }

        const userFirebase = snapshot[0];

        try {
            const { user: userAuth } = await signInWithEmailAndPassword(firebaseAuth, userFirebase.email, password);
            return mapToUserEntity(userAuth, userFirebase);
        } catch (error) {
            console.log(error);
            return rejectWithValue('Sai mật khẩu hoặc tên đăng nhập');
        }
    },
);
