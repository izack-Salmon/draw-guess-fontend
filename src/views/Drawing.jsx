import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socketService } from '../services/socketService'
import { useDispatch, useSelector } from 'react-redux';


export const Drawing = () => {


    const colors = [
        'black',
        'red',
        'yellow',
        'white',
        'blue',
        'green',
        'pink',
    ]


    // const [isDrawing, setIsDrawing] = useState(false)
    const { currGame } = useSelector((state) => state.gameModule);
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [selectedColor, setSelectedColor] = useState(colors[0])
    const [msg, setMsg] = useState('');
    const [word, setWord] = useState('');
    const touchEvsRef = useRef(['touchstart', 'touchend', 'touchmove']);
    const navigate = useNavigate();
    let interval


    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.height = window.innerHeight;
        canvas.width = 700;
        canvas.style.width = `${350}px`;
        canvas.style.height = `${window.innerHeight / 2}px`;

        canvasRef.current.addEventListener('touchstart', startDrawing, true)
        canvasRef.current.addEventListener('touchmove', onDraw, true)
        canvasRef.current.addEventListener('touchend', endDrawing, true)


        const context = canvas.getContext("2d")
        context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = selectedColor;
        context.lineWidth = 5;
        contextRef.current = context;

        interval = setInterval(() => {
            var canvas = document.getElementById('canvas');
            let sendImg = canvas.toDataURL('image/png')
            socketService.emit('send drawing', sendImg);
        }, 100);
        return () => {
            clearInterval(interval);
            canvas.removeEventListener('touchstart', startDrawing)
            canvas.removeEventListener('touchmove', onDraw)
            canvas.removeEventListener('touchend', endDrawing)

        }
    }, [])

    useEffect(() => {
        setWord(currGame.word)
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d")
        context.strokeStyle = selectedColor;
    }, [selectedColor])

    socketService.on('game ended', img => {
        setMsg('The other player guess right')
        setTimeout(() => {
            setMsg('')
            navigate('/')
        }, 5000);
    });

    const startDrawing = (ev) => {
        const mouseEv = getEvPos(ev);
        contextRef.current.beginPath();
        contextRef.current.moveTo(mouseEv.x, mouseEv.y)
        // setIsDrawing(true)
    }

    const onDraw = (ev) => {
        // if (!isDrawing) return
        const mouseEv = getEvPos(ev);;
        contextRef.current.lineTo(mouseEv.x, mouseEv.y)
        contextRef.current.stroke()
    }

    const endDrawing = () => {
        contextRef.current.closePath()
        // setIsDrawing(false)
    }

    const clear = () => {
        contextRef.current.clearRect(0, 0, window.innerWidth, window.innerHeight)
    }

    // const stopDrawing = () => {
    // }

    const getEvPos = (ev) => {
        var pos;
        // for Mobile:
        if (touchEvsRef.current.includes(ev.type)) {
            ev.preventDefault();
            ev = ev.changedTouches[0];
            pos = {
                x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
                y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
            };
            //
        } else {
            pos = {
                x: ev.nativeEvent.offsetX,
                y: ev.nativeEvent.offsetY,
            };
        }
        return pos;
    };
    
    return (
        <section className='drawing-conintiner'>
            <div className='word'>draw: {word}</div>   
            <div className='drawing-buttons'>
                <select
                    value={selectedColor}
                    onChange={(ev) => setSelectedColor(ev.target.value)}>
                        {
                        colors.map(
                            color => <option key={color} value={color}>{color}</option>
                        )
                    }
                </select>
                    <button onClick={clear}> Clear</button>
            </div>
            <div className='canvas-cointiner'>
                <canvas id='canvas' onMouseDown={startDrawing}
                    onMouseUp={endDrawing}
                    onMouseMove={onDraw}
                    ref={canvasRef}
                >
                </canvas>
            </div>
            {/* <button onClick={stopDrawing}> End Drawing</button> */}
            <div className='msg'>{msg}</div>
        </section>
    )
}

