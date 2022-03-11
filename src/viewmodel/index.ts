import { ThunkAction } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore, Action } from '@reduxjs/toolkit';

import todo from './vm-todo';

const reducer = combineReducers({
  todo
});

const store = configureStore({
  reducer,
  devTools: true,
});

export type RootStateType = ReturnType<typeof reducer>;
export type AppDispatchType = typeof store.dispatch;
export type AppThunkType = ThunkAction<void, RootStateType, null, Action<string>>;

export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

export default store;
