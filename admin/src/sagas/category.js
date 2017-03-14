import {call, put} from "redux-saga/effects";
import {categoryApi} from "../api/category";

// fetch the category data
export function* fetchCategory(action) {
    // call the api to get the category data
    const category = yield call(categoryApi.fetchCategory, action.payload.categoryId);
    // save the category in state
    yield put({
        type: 'SUCCESS_FETCH_CATEGORY',
        response: category,
    });
}