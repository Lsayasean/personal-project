const initialState = {
    user: {}
}

const USER_DATA = "USER_DATA";

export default function reducer(state = initialState, action){
    switch(action.type){
        default:
            return state;
    }
}

export function userUpdate(data){
    return{
        type: USER_DATA,
        payload: data
    }
}