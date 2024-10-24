import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import userReducer from '~modules/user/slice';

export const store = configureStore({ reducer: { user: userReducer } });
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
