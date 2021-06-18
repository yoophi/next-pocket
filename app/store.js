import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import counterSaga from "../features/counter/counterSaga";
import { counterSlice } from "../features/counter/counterSlice";

const combinedReducer = combineReducers({
  [counterSlice.name]: counterSlice.reducer,
});

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([counterSaga()]);
}

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};
export function makeStore() {
  const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware({ thunk: true }), sagaMiddleware],
  });
  sagaMiddleware.run(rootSaga);

  return store;
}

export const wrapper = createWrapper(makeStore);
