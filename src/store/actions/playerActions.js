import { utilService } from '../../services/utilService'
import { playerService } from '../../services/playerService';

export function setPlayer(name, type) {
    const perPlayer = {
        id: utilService.makeId(),
        type,
        name,
        points: 0,
    }
    console.log(perPlayer);
    return async (dispatch) => {
        try {
            const player = await playerService.addPlayer(perPlayer);
            dispatch({ type: 'SET_PLAYER', player });
        } catch (err) {
            console.log(err);
        }
    }
}