
const INITIAL_STATE = {
    gameSessions: [],
    currGame: null,
}

export function gameReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_GAME_SESSIONS':
            return {
                ...state,
                gameSessions: [...action.gameSessions]
            };
        case 'SAVE_GAME':
            return {
                ...state,
                gameSessions: state.gameSessions.map(session => {
                    return (session._id === action.savedSession._id) ? action.savedSession : session
                })
            }

        case 'SET_CURR_GAME':
            return {
                ...state,
                currGame: { ...action.currGame }
            }
        default:
            return state;
    }
}