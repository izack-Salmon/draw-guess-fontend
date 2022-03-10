import { storageService } from "./storageService";

import Axios from "axios";
var axios = Axios.create({ withCredentials: true, });


const BASE_URL =
    process.env.NODE_ENV !== "development"
        ? "/api/player"
        : "//localhost:3030/api/player";

export const playerService = {
    getPlayer,
    setPlayer,
    addPlayer,
    getPendingPlayers,
}

const STORAGE_KEY = 'db-player';

//localStoge
function getPlayer() {
    const player = storageService.localLoad(STORAGE_KEY);
    return Promise.resolve({ ...player });
}

async function setPlayer(player) {
    storageService.localStore(STORAGE_KEY, player);
    return Promise.resolve(player);
}

async function getPendingPlayers() {
    const res = await axios.get(`${BASE_URL}/pending`)
    return res.data
}

async function addPlayer(player) {
    const res = await axios.post(BASE_URL, player)
    console.log(res);
    return res.data
}