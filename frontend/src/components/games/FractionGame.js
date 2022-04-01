import React, { useState} from 'react';
import {Button, Card} from "react-bootstrap";
import UserService from "../../service/user_service";
import GameService from "../../service/game_service";
import Score from "../elements/Score";
import { PieChart } from 'react-minimal-pie-chart';
import Timer from "../elements/Timer";

const random=(min,max)=>{
    return Math.round(Math.random() * (max-min) + min);
}

let TIME_LIMIT=60000;

const User=UserService.getCurrentUser();

const Fractions=()=>{

    const [playing, setPlaying]=useState(false);
    const [finished,setFinished]=useState(false);
    const [score,setScore]=useState(0);
    const [maxScore, setMaxScore]=useState(0);
    const [divider,setDivider]=useState(random(1,10));

    const [counter,setCounter]=useState(random(1,divider));
    const [inputCount, setInputCount] = useState('');
    const [inputDiv, setInputDiv] = useState('');

    const endGame=()=>{
        setPlaying(false)
        setFinished(true)
        GameService.saveScore(User.id,3,score,maxScore).then(()=>"Success!")
    }

    const startGame=()=>{
        setScore(0);
        setMaxScore(0)
        setPlaying(true)
        setFinished(false)
    }


    const checkResult=()=>{
        if(Number(inputCount)===counter&&Number(inputDiv)===divider){

            setScore(score+1);
        }
        setMaxScore(maxScore+1);
        let div=random(1,10);
        setDivider(div);
        setCounter(random(0,div));
        setInputCount('');
        setInputDiv('');
    }


    let arr =[];
    for (let i=0; i<(divider-counter);i++){
        arr.push({ title: 'Section'+i, value: 1, color: '#229827', key:i });
    }
    for (let i=0;i<counter;i++){
        arr.push({ title: 'Section'+i, value: 1, color: '#0b32a7', key:divider+i });
    }

    return(
        <Card className={"maincard"}  style={{padding:'5px', margin:"10px", backgroundColor:'rgba(0, 11, 171, 0.65)' , fontSize:'20px',  textAlign:'center'}}>
            {!playing &&!finished &&
            <Card.Text>
                <h1>Törtek gyakorlása</h1>
                <h3>Gyakorold a tört számok felírását</h3>
                <h3>Add meg a torta ábráról leolvasható törtet, a kék szeletek jelzik a számlálót (felső szám), a zöldek a nevezőt (alsó szám)!</h3>
                <Button size={"lg"} variant="primary" onClick={startGame}>Játék indítása</Button>
            </Card.Text>}

            {playing&&(<Card.Text style={{padding:'5px', margin:"10px", backgroundColor:'rgba(229,184,5,0.65)' , fontSize:'20px'}}>
                <PieChart style={{height:"200px"}}
                          data={arr}
                          paddingAngle={"0.8"}
                />

                <input type={"number"} style={{width:"15%!important"}} id={"count"} min={0} value={inputCount} onChange={e=>setInputCount(e.target.value)}/>
                <hr style={{border: "5px solid black", width:"200px", margin:"auto",marginTop:"5px", marginBottom:"5px"}}/>
                <input type={"number"} style={{width:"15%!important"}} id={"fract"} min={1} value={inputDiv} onChange={e=>setInputDiv(e.target.value)}/>
                <br/>
                <Button size={"lg"} variant="primary" onClick={checkResult}>Ellenőrzés</Button>

                <Score value={score} maxScore={maxScore}/>
                <Timer time={TIME_LIMIT} onEnd={endGame}/><br/>
                <Button variant="primary" size={"lg"} onClick={endGame}>Befejezés</Button>
            </Card.Text>)}

            {finished &&
            <Card.Text>
                <Score value={score} maxScore={maxScore}/>-
                <Button variant="primary" size={"lg"} onClick={startGame}>Újra</Button>
                <Button href="/pages/games" variant="primary" size={"lg"}>Vissza a menübe</Button>

            </Card.Text>}

        </Card>)
}

export default Fractions
