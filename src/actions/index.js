import * as actionType from './type';

//Action creators are exactly that—functions that create actions.
export const setUser = user => {
    return {
        type: actionType.SET_USER,
        payload: {
            currentUser: user
        }
    }
}

export const clearUser = () => {
    return {
        type: actionType.CLEAR_USER
    }
}