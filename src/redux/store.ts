import { configureStore } from '@reduxjs/toolkit';
import user from './userSlice';

import { blogApi } from './api';

const store = configureStore({
  reducer: {
    user,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
