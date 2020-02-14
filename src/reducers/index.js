import * as actionsType from '../actions/type';
import { combineReducers } from 'redux';

const initialStateUser = {
    currentUser: null,
    isLoading: true
}

const user_reducer = (state = initialStateUser, action) => {
    switch (action.type) {
        case actionsType.SET_USER:
            return {
                currentUser: action.payload.currentUser,
                isLoading: false
            };
        case actionsType.CLEAR_USER:
            return {
                currentUser: null,
                isLoading: false
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user: user_reducer // == user_reducer(state.user,action)
});

export default rootReducer;