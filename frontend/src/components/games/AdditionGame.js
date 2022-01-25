import React, {Fragment, useEffect, useRef, useState} from 'react';

const Operation=({number1,operator,number2})=><div>{number1}{operator}{number2}=</div>

const SolutionBox=()=><input type={"number"} id={"solution"}/>

const Score=({value})=><div>{`Score: ${value}`}</div>

const TIME_LIMIT=5000;

const Timer=({time, interval=1000, onEnd})=>{
    const [internalTime, setInternalTime]=useState(time);
    const timerRef=useRef(time);
    const timeRef=useRef(time);
    useEffect(()=>{
        if(internalTime===0&&onEnd)
            onEnd()
    },[internalTime,onEnd]);

    useEffect(()=>{timerRef.current=setInterval(()=>setInternalTime((timeRef.current-=interval)),interval)
        return()=>{
            clearInterval(timerRef.current)
        }},[interval])


    useEffect(()=>{
        if(internalTime===0&&onEnd){
            onEnd()
        }
    },[internalTime,onEnd])

    return <span>{`Time: ${internalTime/1000}s`}</span>
}

const Addition=()=>{

    const [playing, setPlaying]=useState(false);
    const [score, setScore]=useState(0);
    const [finished,setFinished]=useState(false);

    const endGame=()=>{
        setPlaying(false)
        setFinished(true)
    }

    const startGame=()=>{
        setScore(0)
        setPlaying(true)
        setFinished(false)
    }

    return(
        <Fragment>
            {!playing &&!finished && <Fragment>
                <h1>Műveletek gyakorlása</h1>
                <button onClick={startGame}>Start Game</button>
            </Fragment>}

            {playing&&(<Fragment><Operation number1={1} operator={"+"} number2={2}/>
                    <SolutionBox/>
                    <Score value={score}/>
                    <Timer time={TIME_LIMIT} onEnd={endGame}/>
                    <button>Ellenőrzés</button> </Fragment>
            )}

            {finished &&
            <Fragment>
                <Score value={score}/>
                <button onClick={startGame}>Play Again</button>
            </Fragment>}

        </Fragment>)
}

export default Addition;
