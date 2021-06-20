import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { fetchPocketArticles } from "./articleAPI";
import {
  fetchPocketArticlesError,
  fetchPocketArticlesRequest,
  fetchPocketArticlesSuccess,
} from "./articleSlice";

function* fetchPocketArticlesAsyncSaga(action) {
  try {
    const { offset } = action.payload;
    const articles = yield call(fetchPocketArticles, offset);
    yield put(fetchPocketArticlesSuccess({ data: articles }));
  } catch (err) {
    yield put(fetchPocketArticlesError(err.messages));
  }
}

export default function* articleSaga() {
  yield takeLatest(fetchPocketArticlesRequest, fetchPocketArticlesAsyncSaga);
}
