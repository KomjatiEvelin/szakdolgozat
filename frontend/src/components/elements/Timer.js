import React, {useEffect, useRef, useState} from "react";

const Timer=({time, interval=1000, onEnd})=>{
    const [internalTime, setInternalTime]=useState(time);
    const timerRef=useRef(time);
    const timeRef=useRef(time);

    useEffect(()=>{timerRef.current=setInterval(()=>setInternalTime((timeRef.current-=interval)),interval)
        return()=>{
            clearInterval(timerRef.current)
        }},[interval])


    useEffect(()=>{
        if(internalTime===0&&onEnd){
            onEnd()
        }
    },[internalTime,onEnd]);

    return <span>{`Time: ${internalTime/1000}s`}</span>
}

export default Timer
