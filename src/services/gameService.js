import Axios from "axios";
var axios = Axios.create({ withCredentials: true, });

export const gameService = {
    query,
    saveGame,
    getEmptyGame,
}

const BASE_URL =
    process.env.NODE_ENV !== "development"
        ? "/api/game"
        : "//localhost:3030/api/game";


function query() {
    return axios.get(BASE_URL).then((res) => res.data)
}

function saveGame(game) {
    return (game._id) ? axios.put(BASE_URL + `/${game._id}`, game).then((res) => res.data) : axios.post(BASE_URL + '/', game).then((res) => res.data)
}

function getEmptyGame() {
    let newGame = {
        guesser: '',
        drawer: '',
        word: '',
        points: '',
        imgUrl: '',
    }
    return newGame;


}
