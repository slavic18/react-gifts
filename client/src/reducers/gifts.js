//
export default function gifts(state = {}, action) {
    switch (action.type) {
        case 'SUCCESS_FETCH_GIFT':
            return Object.assign({}, state, {
                currentGift: action.response.gift
            });
            break;
        case 'SUCCESS_FETCH_GIFTS_BY_CATEGORY':
            return Object.assign({}, state, {
                categoryGifts: action.gifts
            });
            break;
        case 'GET_GIFTS':
            return Object.assign({}, state, {
                gifts: action.gifts
            });
            break;
        case 'REMOVED_GIFTS':
            let updatedGifts = [];
            updatedGifts = state.gifts.filter((gift, index) => {
                for (var i = 0, len = action.gifts.length; i < len; i++) {
                    if (String(gift._id) === String(action.gifts[i])) {
                        return false;
                    }
                }
                return true;
            });
            return Object.assign({}, state, {
                gifts: updatedGifts
            });
            break;
        // initial state
        default:
            return state;
    }
}
