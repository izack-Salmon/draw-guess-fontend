import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socketService } from '../services/socketService';
import { gameService } from '../services/gameService';
import { updateGame } from '../store/actions/gameActions';


export const Wait = () => {

    const { player } = useSelector((state) => state.playerModule);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [drawerReady, setDrawerReady] = useState(null)
    const [guesserReady, setGuesserReady] = useState(null)
    const [game, setGame] = useState({})
    const [isReadyClick, setIsReadyClick] = useState(false)
    let currGame;

    socketService.on('draw ready', (isReady) => {
        setDrawerReady(isReady)
    });
    socketService.on('guess ready', (isReady) => {
        setGuesserReady(isReady)
    });

    socketService.on('new game', (game) => {
        console.log('new game', game);
        game.guesser = player;
        currGame = game;
        setGame(game);
        socketService.off('new game');
    });

    useEffect(() => {
        if (!player) return;
        if (drawerReady && guesserReady) {
            if (player.type === 'draw') {
                navigate('/word-choosing')

            }
            if (player.type === 'guess') {
                navigate('/guessing')
            }

            return () => {
                socketService.off('guess ready');
                socketService.off('draw ready');
                socketService.off('new game');

                if (player.type === 'guess') {
                    console.log(currGame);
                    console.log(game, 'game in waiting');
                    dispatch(updateGame(currGame));
                }
            }
        }
    }, [drawerReady, guesserReady])

    const playerReady = (ev) => {
        setIsReadyClick(true)
        ev.preventDefault();
        socketService.emit(`${player.type} ready`, true);
        // console.log(player);
        if (player.type === 'guess') {
            setGuesserReady(true);
        }
        else if (player.type === 'draw') {
            var game = gameService.getEmptyGame();
            game.drawer = player;
            // console.log(g);
            socketService.emit('new game', game);
            setDrawerReady(true);
        }
    }

    // if (!player) return
    return (
        <section className='waiting-cointiner'>
            {!isReadyClick ? <button onClick={(ev) => playerReady(ev)}>Ready? <br></br> press to <span> play! </span>  </button> : <img src={require(`../assets/imgs/monophy.gif`)}></img>}
        </section>
    )
}

