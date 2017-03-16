import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {reducer as formReducer} from "redux-form";
import category from "./categoryReducer";
import gifts from "./gifts";

// main reducers
export const reducers = combineReducers({
    routing: routerReducer,
    form: formReducer.plugin({
        "user_edit": (state, action) => {
            // reset form (wipe state) when navigating away from the User edit page
            switch (action.type) {
                case "@@router/LOCATION_CHANGE":
                    return undefined;
                default:
                    return state;
            }
        }
    }),
    // your reducer here
    category: category,
    gifts: gifts
});
