const initialState = {
    user: {},
    games: [],
    userGames: [],
    match: []
}

const USER_DATA = "USER_DATA";
const USER_GAMES = "USER_GAMES";
const UPDATE_GAME_LIST = "UPDATE_GAME_LIST";
const MY_GAMES = "MY_GAMES";
const MATCH = "MATCH";

export default function reducer(state = initialState, action){
    switch(action.type){
        case MATCH:
            return {...state, match: action.payload}
        case MY_GAMES:
            return {...state, userGames: action.payload}
        case UPDATE_GAME_LIST:
            return {...state, userGames: action.payload}
        case USER_DATA:
            return {...state, user: action.payload}
        case USER_GAMES:
            return {...state, games: action.payload}
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
export function gameList(games){
    return{
        type: USER_GAMES,
        payload: games
    }
}

export function updateGameList(list){
    return {
        type: UPDATE_GAME_LIST,
        payload: list
    }
}

export function updateOwnList(own){
    return {
        type: MY_GAMES,
        payload: own
    }
}
export function getMatch(match){
    return {
        type: MATCH,
        payload: match
    }
}