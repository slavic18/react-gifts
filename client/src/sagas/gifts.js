import {call, put} from "redux-saga/effects";
import {giftApi} from "../api/gift";

// fetch the gift data
export function* fetchGift(action) {
    // call the api to get the gift data
    const gift = yield call(giftApi.fetchGift, action.payload.giftId);
    // save the gift in state
    yield put({
        type: 'SUCCESS_FETCH_GIFT',
        response: gift,
    });
}
// fetch the gifts
export function* fetchGifts(action) {
    // call the api to get the gifts data
    const gifts = yield call(giftApi.fetchGifts);
    // save gifts in state
    yield put({
        type: 'GET_GIFTS',
        gifts,
    });
}
// fetch category gifts
export function* fetchCategoryGifts(action) {
    // call the api to get the gifts data
    const gifts = yield call(giftApi.fetchCategoryGifts, action.category);
    // save gifts in state
    yield put({
        type: 'SUCCESS_FETCH_GIFTS_BY_CATEGORY',
        gifts,
    });
}
// remove gifts
export function* removeGifts(action) {
    // call the api to remove gifts
    const response = yield call(giftApi.removeGifts, action.items);
    // save gifts in state
    yield put({
        type: 'REMOVED_GIFTS',
        gifts: response.gifts,
    });
}