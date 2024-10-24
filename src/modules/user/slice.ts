import { createSlice } from '@reduxjs/toolkit';
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
    reducers: () => ({}),
    extraReducers: (builder) => {
        builder.addCase(fetchSignIn.pending, (state) => {
            state.data = undefined;
            state.loading = 'pending';
        });

        builder.addCase(fetchSignIn.fulfilled, (state, { payload }) => {
            state.data = payload;
            state.loading = 'fulfilled';
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
