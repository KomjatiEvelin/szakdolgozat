import React, { useEffect, useRef, useState} from 'react';
import {Button, Card} from "react-bootstrap";
import UserService from "../../service/user_service";
import GameService from "../../service/game_service";
import apple_icon from "../../assets/apple.png";
import banana_icon from "../../assets/banana.png";


const User=UserService.getCurrentUser();

const Score=({value})=><div>{`Score: ${value}`}</div>

let TIME_LIMIT=60000;

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

const Apples=({num})=> <div>{new Array(num).fill().map((_,id)=> <img src={apple_icon} alt={"icon"} style={{width:"50px", margin:"10px"}}/>)}</div>

const RedMedals=({num})=> <div>{new Array(num).fill().map((_,id)=> <img src={banana_icon} alt={"icon"} style={{width:"50px", margin:"10px"}}/>)}</div>



const Addition=()=>{

    const [playing, setPlaying]=useState(false);
    const [score, setScore]=useState(0);
    const [finished,setFinished]=useState(false);

    const endGame=()=>{
        setPlaying(false)
        setFinished(true)
        GameService.saveScore(User.id,1,score).then(()=>"Success!")
    }

    const startGame=()=>{
        setScore(0)
        setPlaying(true)
        setFinished(false)
    }

    const generateNumber=()=>
    {
        switch (User.class){
            case 1:
                return Math.floor((Math.random() * 10) + 1);
            case 2:
                TIME_LIMIT=120000;
                return Math.floor(Math.random() *101);
            default:
                TIME_LIMIT=180000;
                return Math.floor(Math.random() *1001);
        }
    }

    const [input, setInput] = useState('');
    const [num1, setNum1] = useState(generateNumber);
    const [num2, setNum2] = useState(generateNumber);

    const checkResult=()=>{
        if(num1+num2==input){

            setScore(score+1);
        }
        setNum1(generateNumber);
        setNum2(generateNumber);
        setInput('');
    }
    return(
        <Card style={{padding:'5px', margin:"10px", backgroundColor:'rgba(0, 11, 171, 0.65)' , fontSize:'20px',  textAlign:'center'}}>
            {!playing &&!finished && <Card.Text>
                <h1>Műveletek gyakorlása</h1>
                <h3>Gyakorold az alap műveleteket, és oldj meg minnél több feladványt {TIME_LIMIT/60000} perc alatt</h3>
                <h3>Tipp: az ábra segít a számolásban</h3>
                <Button size={"lg"} variant="primary" onClick={startGame}>Játék indítása</Button>
            </Card.Text>}

            {playing&&(<Card.Text style={{padding:'5px', margin:"10px", backgroundColor:'rgba(229,184,5,0.65)' , fontSize:'20px'}}>
                <h1>{num1}+{num2}=<input type={"number"} value={input} onChange={e=>setInput(e.target.value)} /></h1>

                { (User.class==1)&&(
                <><Apples num={num1}/>
                <RedMedals num={num2}/></>)
                }

                //TODO get apart to place value

                <Score value={score}/>
                <Timer time={TIME_LIMIT} onEnd={endGame}/><br/>
                <Button size={"lg"} variant="primary" onClick={checkResult}>Ellenőrzés</Button>
            </Card.Text>)}

            {finished &&
            <Card.Text>
                <Score value={score}/>
                <Button variant="primary" size={"lg"} onClick={startGame}>Újra</Button>
                <Button href="/pages/games" variant="primary" size={"lg"}>Vissza a menübe</Button>

            </Card.Text>}

        </Card>)
}

export default Addition;
