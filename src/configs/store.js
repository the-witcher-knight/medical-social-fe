import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import rootReducers from 'src/shared/reducers/index';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import loggerMiddleware from './middlewares/logger-middleware';
import notificationMiddleware from './middlewares/notification-middleware';
import errorMiddleware from './middlewares/error-middleware';

const store = configureStore({
  reducer: rootReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.config', 'payload.request', 'error', 'meta.arg'],
      },
    }).concat(notificationMiddleware, errorMiddleware, loggerMiddleware, loadingBarMiddleware()), // TODO: Add some middleware here (logger, notification, etc.)
});

const getStore = () => store;

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type IRootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, IRootState, unknown, AnyAction>;

export default getStore;
