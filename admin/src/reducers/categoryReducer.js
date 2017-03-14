//
export default function category(state = {}, action) {
    switch (action.type) {
        case 'SUCCESS_FETCH_CATEGORY':
            return Object.assign({}, state, {
                currentCategory: action.response.category
            });
            break;
        case 'GET_CATEGORIES':
            return Object.assign({}, state, {
                categories: action.data
            });
            break;
        case 'GET_GIFTS':
            return Object.assign({}, state, {
                gifts: action.gifts
            });
            break;
        // initial state
        default:
            return state;
    }
}
