
import { gameService } from "../../services/gameService";


export function loadGameSessions() {
    return async (dispatch) => {
        try {
            const gameSessions = await gameService.query();
            console.log(gameSessions, 'games');
            dispatch({ type: 'SET_GAME_SESSIONS', gameSessions });

            const currGame = gameSessions[gameSessions.length - 1];
            console.log(currGame);
            dispatch({ type: 'SET_CURR_GAME', currGame });
        } catch (err) {
            console.log('Error in loadGameSessions Action:', err);
        }
    }
}

// export function setCurrGame() {
//     return async (dispatch) => {
//         try {
//             const game = await gameService.query();
//         } catch (err) {
//             console.log(err);
//         }
//     }
// }
export function updateGame(game) {
    return async (dispatch) => {
        try {
            console.log(game, 'line 33');
            const savedGame = await gameService.saveGame(game);
            console.log(savedGame);
            dispatch({ type: 'SET_CURR_GAME', savedGame })
        } catch (err) {
            console.log(err);
        }
    }
}
