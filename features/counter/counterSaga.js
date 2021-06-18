import { call, put, takeEvery } from "redux-saga/effects";
import { fetchCount } from "./counterAPI";
import { fetchCountRequest, fetchCountSuccess } from "./counterSlice";

function* fetchCountAsyncSaga(action) {
  const amount = action.payload;
  const response = yield call(fetchCount, amount);
  yield put(fetchCountSuccess(response));
}

export default function* counterSaga() {
  yield takeEvery(fetchCountRequest, fetchCountAsyncSaga);
}
