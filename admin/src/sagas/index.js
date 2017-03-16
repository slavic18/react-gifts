import {takeLatest} from "redux-saga";
import {fork} from "redux-saga/effects";
import {fetchCategory, fetchCategories, removeCategories} from "./category";
import {fetchGift, fetchGifts, removeGifts} from "./gifts";

// main saga generators
export function* sagas() {
    yield [
        fork(takeLatest, 'FETCH_CATEGORY', fetchCategory),
        fork(takeLatest, 'FETCH_CATEGORIES', fetchCategories),
        fork(takeLatest, 'REMOVE_CATEGORIES', removeCategories),
        fork(takeLatest, 'FETCH_GIFT', fetchGift),
        fork(takeLatest, 'FETCH_GIFTS', fetchGifts),
        fork(takeLatest, 'REMOVE_GIFTS', removeGifts),
    ]
}
