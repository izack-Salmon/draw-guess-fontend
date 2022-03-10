import React, { Component, useEffect, useState } from 'react'

export const PickDiffcult = ({ randomWordService, setWords, words, setIsDiffcultSelected, setPoints }) => {

    useEffect(() => {
        setWords(randomWordService.getword())
    }, [])


    const diffcultPicked = (difficult) => {
        setWords(words[difficult])
        setIsDiffcultSelected(true)

        if (difficult === 'hard') setPoints(5);
        if (difficult === 'medium') setPoints(3);
        if (difficult === 'esay') setPoints(1);



    }

    return (
        <section className='pick-diffculty'>
            <h2>Pick Difficulty</h2>
            <button onClick={() => diffcultPicked('hard')}> <span> hard </span> <br /> (5 points)</button>
            <button onClick={() => diffcultPicked('medium')}> <span> medium </span> <br /> (3 points)</button>
            <button onClick={() => diffcultPicked('esay')}><span> esay </span> <br /> (1 points)</button>
        </section>
    )

}
