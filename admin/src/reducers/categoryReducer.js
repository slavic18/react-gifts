//
export default function category(state = {}, action) {
    switch (action.type) {
        case 'GET_CATEGORIES':
            return Object.assign({}, state, {
                categories: action.data
            });
            break;
        case 'SET_ACTIVE_CATEGORY':
            return Object.assign({}, state, {
                activeCategory: action.category
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
