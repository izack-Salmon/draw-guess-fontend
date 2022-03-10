import PropTypes from 'prop-types'
import React, { Component, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPlayer } from '../store/actions/playerActions'
import { useForm } from '../hooks/useForm'
import { setCurrGame } from '../store/actions/gameActions';
import { storageService } from '../services/storageService'
import { playerService } from '../services/playerService';
import { socketService } from '../services/socketService';

export const Home = () => {

    const inputRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [playerName, handleChange, setPlayerName] = useForm('')
    const [playerType, setPlayerType] = useState('guess');
    const [activeButton, setActiveButton] = useState(false)
    const [msg, setMsg] = useState('')


    const onSelectPlayerType = (type, active) => {
        setPlayerType(type);
        setActiveButton(active);
    }


    const onStart = () => {
        if (!playerName) return;
        dispatch(setPlayer(playerName, playerType))
        socketService.emit(`${playerType} arrived`);
        navigate('/wait')
    }

    socketService.on('draw arrived', () => {
        setMsg('Drawer is waiting play guesser for start')

    });
    socketService.on('guess arrived', () => {
        setMsg('Guesser is waiting play draw for start')
    });

    useEffect(async () => {
        const pendingPLayers = await playerService.getPendingPlayers()
        console.log(pendingPLayers, 'pendingPLayers');
        // dispatch(setCurrGame());

        return () => {
            socketService.off('guess arrived')
            socketService.off('draw arrived')
        }
    }, []);

    useEffect(() => {
        inputRef.current.focus();
        setPlayerName(playerName);
    }, [playerName]);

    return (
        <section className='home-cointiner'>
            <input ref={inputRef} value={playerName} onChange={handleChange} type="text" placeholder='Name' id="playerName" />
            <div className='player-type-buttons'>
                <button className={activeButton ? 'active' : null} onClick={() => onSelectPlayerType('draw', true)}>Draw</button>
                <button className={activeButton ? null : 'active'} onClick={() => onSelectPlayerType('guess', false)}>Guess</button>
            </div>
            <p>{msg}</p>
            <button onClick={onStart} >Start</button>
        </section>
    )
}

