import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import counterSaga from "../features/counter/counterSaga";
import articleSaga from "../features/article/articleSaga";
import { counterSlice } from "../features/counter/counterSlice";
import { articleSlice } from "../features/article/articleSlice";

const combinedReducer = combineReducers({
  [counterSlice.name]: counterSlice.reducer,
  [articleSlice.name]: articleSlice.reducer,
});

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([counterSaga(), articleSaga()]);
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
