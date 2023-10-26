import { createStore, applyMiddleware, combineReducers } from 'redux';
import { userReducer, appReducer, UserState, AppState } from './reducers';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers<{
  user: UserState;
  app: AppState;
}>({
  user: userReducer,
  app: appReducer,
});
export const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


