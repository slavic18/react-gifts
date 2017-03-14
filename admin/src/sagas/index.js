import {takeLatest} from "redux-saga";
import {fork} from "redux-saga/effects";
import {fetchCategory} from "./category";

// main saga generators
export function* sagas() {
    yield [
        fork(takeLatest, 'FETCH_CATEGORY', fetchCategory),
    ]
}
