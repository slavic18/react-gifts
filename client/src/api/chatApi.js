import store from 'store';
import {storeConstants} from '../storeConstants';

export const chatApi = {
    getCurrentState: function(socket){
        let currentState = store.get(storeConstants.CURRENT_STATE),
            selectedProject = store.get(storeConstants.SELECTED_PROJECT) || 'all';
        // update input dates
        if (!currentState) {
            currentState = 'new';
            store.set(storeConstants.CURRENT_STATE, currentState);
        }
        socket.emit('getCurrentState', {
            state: currentState,
            stateFrom: null,
            stateTo: null,
            selectedProject: selectedProject
        });
    }
};