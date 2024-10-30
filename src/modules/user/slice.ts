import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSignIn } from './async';
import { IUserEntity } from './entity';

const initialState: IReduxState<IUserEntity | undefined> = {
    data: undefined,
    loading: 'idle',
    error: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: (creators) => ({
        startPending: creators.reducer((state) => {
            state.error = '';
            state.loading = 'pending';
        }),
        addUser: creators.reducer((state, { payload }: PayloadAction<IUserEntity>) => {
            state.data = payload;
            state.loading = 'fulfilled';
            state.error = '';
        }),
        logout: creators.reducer((state) => {
            state.data = undefined;
            state.loading = 'idle';
            state.error = '';
        }),
    }),
    extraReducers: (builder) => {
        builder.addCase(fetchSignIn.pending, (state) => {
            state.data = undefined;
            state.loading = 'pending';
        });

        builder.addCase(fetchSignIn.fulfilled, (state, { payload }) => {
            state.data = payload;
            state.loading = 'fulfilled';
            state.error = '';
        });

        builder.addCase(fetchSignIn.rejected, (state, { payload }) => {
            state.data = undefined;
            state.loading = 'rejected';
            state.error = payload!;
        });
    },
    selectors: {
        state: (state) => state,
        data: (state) => state.data,
    },
});

export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;

export default userSlice.reducer;
