//
export default function category(state = {}, action) {
    switch (action.type) {
        case 'SET_ACTIVE_CATEGORY':
            return Object.assign({}, state, {
                selectedCategory: action.category
            });
            break;
        case 'SUCCESS_FETCH_CATEGORY':
            return Object.assign({}, state, {
                currentCategory: action.response.category
            });
            break;
        case 'GET_CATEGORIES':
            return Object.assign({}, state, {
                categories: action.categories
            });
            break;
        case 'GET_GIFTS':
            return Object.assign({}, state, {
                gifts: action.gifts
            });
            break;
        case 'REMOVED_CATEGORIES':
            let updatedCategories = [];
            updatedCategories = state.categories.filter((category, index) => {
                for (var i = 0, len = action.categories.length; i < len; i++) {
                    if (String(category._id) === String(action.categories[i])) {
                        return false;
                    }
                }
                return true;
            });
            return Object.assign({}, state, {
                categories: updatedCategories
            });
            break;
        // initial state
        default:
            return state;
    }
}
