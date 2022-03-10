import PropTypes from 'prop-types'

import React, { Component, useEffect, useState } from 'react'
import { PickDiffcult } from '../cmps/PickDiffcult'
import { useNavigate } from 'react-router-dom';

import { randomWordService } from '../services/randomWordGenerateor'
import { socketService } from '../services/socketService';
import { loadGameSessions, updateGame } from '../store/actions/gameActions';
import { useDispatch, useSelector } from 'react-redux';

export const WordChoosing = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const { currGame } = useSelector((state) => state.gameModule);
    const [words, setWords] = useState(null)
    const [points, setPoints] = useState(0)
    const [isDiffcultSelected, setIsDiffcultSelected] = useState(false)
    const [wordsCmp, setWorsdsCmp] = useState(null)


    const onWordSelected = (word) => {
        socketService.emit(`draw selected a work`, word);
        console.log(currGame, 'currGame');
        currGame.word = word;
        currGame.points = points;
        dispatch(updateGame(currGame));
        navigate('/drawing')
    }

    useEffect(() => {
        if (!isDiffcultSelected) return
        let wordsCmps = words.map((word) => (<button className='word-button' onClick={() => onWordSelected(word)} key={word}>{word}</button>));
        setWorsdsCmp(wordsCmps);

    }, [isDiffcultSelected]);

    useEffect(() => {
        dispatch(loadGameSessions())
    }, [])



    if (isDiffcultSelected) return <div className='pick-diffculty'><h1>Pick a word</h1>{wordsCmp}</div>
    return (
        <section>
            <PickDiffcult randomWordService={randomWordService} setWords={setWords} words={words} setIsDiffcultSelected={setIsDiffcultSelected} setPoints={setPoints} />
        </section>
    )

}


