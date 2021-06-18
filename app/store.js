import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { counterSlice } from "../features/counter/counterSlice";

const combinedReducer = combineReducers({
  [counterSlice.name]: counterSlice.reducer,
});

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
  return configureStore({
    reducer,
  });
}

export const wrapper = createWrapper(makeStore);
