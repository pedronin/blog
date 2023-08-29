import { configureStore } from '@reduxjs/toolkit';
import slice from './slice';

import { blogApi } from './api';

const store = configureStore({
  reducer: {
    slice,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
