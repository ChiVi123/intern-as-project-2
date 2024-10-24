import { createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '~config';
import { IUserEntity } from './entity';

type SignInRequestType = { email: string; password: string };

const photoURLDefault: string =
    'https://firebasestorage.googleapis.com/v0/b/intern-as-project-2.appspot.com/o/avatar-placeholder-min.png?alt=media&token=8c99983b-8137-4e42-b20e-980156eb2018';

export const fetchSignIn = createAsyncThunk<IUserEntity, SignInRequestType, { rejectValue: string }>(
    'user/fetchSignIn',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password);
            return {
                username: user.displayName || user.email!.split('@')[0].toLowerCase(),
                email: user.email!,
                photoURL: user.photoURL || photoURLDefault,
            };
        } catch (error) {
            console.log(error);
            return rejectWithValue('Sai mật khẩu hoặc tên đăng nhập');
        }
    },
);
