import { createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '~config';
import { mapUserToUserEntity } from '~helper';
import { IUserEntity } from './entity';

type SignInRequestType = { email: string; password: string };

export const fetchSignIn = createAsyncThunk<IUserEntity, SignInRequestType, { rejectValue: string }>(
    'user/fetchSignIn',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password);
            return mapUserToUserEntity(user);
        } catch (error) {
            console.log(error);
            return rejectWithValue('Sai mật khẩu hoặc tên đăng nhập');
        }
    },
);
