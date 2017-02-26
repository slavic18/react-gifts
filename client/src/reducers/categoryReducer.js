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
                activeCategory: action.categoryId
            });
            break;
        case 'AUTHENTICATED':
            return Object.assign({}, state, {
                userStatus: action.data.status
            });
        case 'UPDATE_USER_STATUS':
            return Object.assign({}, state, {
                userStatus: action.status
            });
        case 'GET_ROOMS':
            return Object.assign({}, state, {
                rooms: action.data
            });
        case 'UPDATE_CURRENT_ROOM_ID':
            return Object.assign({}, state, {
                currentRoom: action.room_id
            });
        case 'GET_OPEN_ROOM_STATE':
            return Object.assign({}, state, {
                currentRoomMessages: action.data.messages.reverse()
            });
        case 'RECEIVED_MESSAGE':
            var messages = Object.assign([], state.currentRoomMessages);
            messages.push(action.message);
            console.log(messages);

            return Object.assign({}, state, {currentRoomMessages: messages});
        case 'CLOSE_ROOM':
            let rooms = Object.assign([], state.rooms),
                messages = Object.assign([], state.currentRoomMessages);
            state.rooms.map((room, index) => {
                if (room['_id'] === action.room_id) {
                    rooms.splice(index, 1);
                }
            });

            if (action.current) {
                messages = [];
            }
            return Object.assign({}, state, {rooms, currentRoomMessages: messages});
            break;
        // initial state
        default:
            return state;
    }
}
