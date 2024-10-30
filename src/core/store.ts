import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from '~modules/user/slice';

const rootReducer = combineReducers({ user: userReducer });
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whiteList: ['user'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
export const persistor = persistStore(store);
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
