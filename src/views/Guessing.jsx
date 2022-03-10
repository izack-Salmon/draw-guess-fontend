
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { socketService } from '../services/socketService';
import { loadGameSessions, updateGame } from '../store/actions/gameActions';

export const Guessing = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currGame } = useSelector((state) => state.gameModule);
    const [guess, handleChange, setGuess] = useForm('')
    const [isWordSelected, setIsWordSelected] = useState(false)
    const [theWord, setTheWord] = useState('')
    const [msg, setMsg] = useState('')
    const [img, setImg] = useState(null)


    socketService.on('draw selected a work', word => {
        setTheWord(word)
        setIsWordSelected(true)
    });

    useEffect(() => {
        dispatch(loadGameSessions())
    }, [])

    useEffect(() => {
        if (!isWordSelected) return
        socketService.on('send drawing', img => {
            document.getElementById('img').src = img
            setImg(img)
        });
    }, [isWordSelected])

    useEffect(() => {
        setGuess(guess)
        return () => {
            socketService.off('send drawing')
            socketService.off('draw selected a work')
        }
    }, [guess])

    const guessWord = () => {
        if (guess.toLowerCase() === theWord.toLowerCase()) {
            currGame.imgUrl = img;
            currGame.word = theWord;
            currGame.guesser = currGame.guesser
            currGame.drawer = currGame.drawer
            currGame.points = currGame.points
            console.log(currGame);
            dispatch(updateGame(currGame));
            socketService.emit('game ended', currGame)
            setMsg('you won')

            setTimeout(() => {
                navigate('/')
            }, 5000);

        } else {
            setMsg('Not Correct')
            setTimeout(() => {
                setMsg('')
            }, 2000);
        }
    }

    if (!isWordSelected) return (
        <section>
            <div className='msg-waiting'>Waiting for drawer to select a word</div>
        </section>
    )
    return (
        <section className='guessing-continer'>
            {!img ? <div>The drawing is in the making</div> : ''}
            <img id='img' src="" alt="" />
            <input onChange={handleChange} value={guess} type="text" placeholder='have a guess?' />
            <button onClick={guessWord}>guess</button>
            <div className='msg'>{msg}</div>
        </section >
    )
}

