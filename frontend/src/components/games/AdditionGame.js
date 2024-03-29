import React, { useState} from 'react';
import {Button, Card} from "react-bootstrap";
import UserService from "../../service/user_service";
import GameService from "../../service/game_service";
import apple_icon from "../../assets/apple.png";
import banana_icon from "../../assets/banana.png";
import Score from "../elements/Score";
import Timer from "../elements/Timer";


const User=UserService.getCurrentUser();

let TIME_LIMIT=60000;



const Apples=({num})=> <div>{new Array(num).fill().map((_,id)=> <img src={apple_icon} alt={"icon"} style={{width:"50px", margin:"10px"}}/>)}</div>

const Bananas=({num})=>  <div>{new Array(num).fill().map((_,id)=> <img src={banana_icon} alt={"icon"} style={{width:"50px", margin:"10px"}}/>)}</div>


const Addition=()=>{

    const [playing, setPlaying]=useState(false);
    const [score, setScore]=useState(0);
    const [maxScore, setMaxScore]=useState(0);
    const [finished,setFinished]=useState(false);

    const endGame=()=>{
        setPlaying(false)
        setFinished(true)
        GameService.saveScore(User.id,1,score,maxScore).then(()=>"Success!")
    }

    const startGame=()=>{
        setScore(0)
        setMaxScore(0)
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
        if(num1+num2===Number(input)){

            setScore(score+1);
        }
        setMaxScore(maxScore+1);
        setNum1(generateNumber);
        setNum2(generateNumber);
        setInput('');
    }

    const splitUpNums=(num)=>{
        let numstr=num.toString()
        switch (num.toString().length) {
            case 1: return numstr;
            case 2: return numstr[0]+'0+'+numstr[1];
            case 3: return numstr[0]+'00+'+numstr[1]+'0+'+numstr[2];
            case 4: return numstr[0]+'000+'+numstr[1]+'00+'+numstr[2]+'0+'+numstr[3];
            default: return  numstr;
        }
    }
    return(
        <Card className={"maincard"}  style={{padding:'15px', margin:"10px", backgroundColor:'rgba(0, 11, 171, 0.65)' , fontSize:'20px',  textAlign:'center'}}>
            {!playing &&!finished && <Card.Text>
                <h1>Összeadás gyakorlása</h1>
                <h3>Gyakorold az összeadást, és oldj meg minnél több feladványt {TIME_LIMIT/60000} perc alatt</h3>
                <h3>Tipp: az ábra segít a számolásban</h3>
                <Button size={"lg"} variant="primary" onClick={startGame}>Játék indítása</Button>
            </Card.Text>}

            {playing&&(<Card.Text style={{padding:'45px', margin:"10px", backgroundColor:'rgba(229,184,5,0.65)' , fontSize:'20px'}}>
                <h1>{num1}+{num2}=</h1>
                <input type={"number"} value={input} onChange={e=>setInput(e.target.value)} style={{width:"25%!important", margin:"auto!important"}} />

                { (Number(User.class)===1)?(
                <><Apples num={num1}/>
                <Bananas num={num2}/>
                </>) : (<>
                    <h2 style={{color:"darkred"}}>{splitUpNums(num1)}</h2>
                    <h2>+</h2>
                    <h2 style={{color:"blue"}}> {splitUpNums(num2)}</h2>
                </>)}

                <Score value={score} maxScore={maxScore}/>
                <Timer time={TIME_LIMIT} onEnd={endGame}/><br/>
                <Button size={"lg"} variant="primary" onClick={checkResult}>Ellenőrzés</Button>
                <Button variant="primary" size={"lg"} onClick={endGame}>Befejezés</Button>
            </Card.Text>)}

            {finished &&
            <Card.Text>
                <Score value={score} maxScore={maxScore}/>
                <Button variant="primary" size={"lg"} onClick={startGame}>Újra</Button>
                <Button href="/pages/games" variant="primary" size={"lg"}>Vissza a menübe</Button>

            </Card.Text>}

        </Card>)
}

export default Addition;
