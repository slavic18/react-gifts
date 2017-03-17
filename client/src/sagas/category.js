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
// fetch the categories
export function* fetchCategories(action) {
    // call the api to get the categories data
    const categories = yield call(categoryApi.fetchCategories);
    // save categories in state
    yield put({
        type: 'GET_CATEGORIES',
        categories,
    });
}
// remove categories
export function* removeCategories(action) {
    // call the api to remove categories
    const response = yield call(categoryApi.removeCategories, action.items);
    // save categories in state
    yield put({
        type: 'REMOVED_CATEGORIES',
        categories: response.categories,
    });
}