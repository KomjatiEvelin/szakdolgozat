import React, {useState} from 'react';
import {Button, Card} from "react-bootstrap";
import UserService from "../../service/user_service";
import GameService from "../../service/game_service";
import Score from "../elements/Score";
import Timer from "../elements/Timer";

const random=(min,max)=>{
    return Math.round(Math.random() * (max-min) + min);
}


const User=UserService.getCurrentUser();

const Divider=({num})=>{
    return <h2>{num}</h2>
}


const TIME_LIMIT=60000;


const Multiplication=()=>{


    const [playing, setPlaying]=useState(false);
    const [finished,setFinished]=useState(false);
    const [score,setScore]=useState(0);
    const [maxScore, setMaxScore]=useState(0);
    const [divider,setDivider]=useState(random(2,10));

    const endGame=()=>{
        setPlaying(false)
        setFinished(true)
        GameService.saveScore(User.id,2,score,maxScore).then(()=>"Success!")
    }

    const startGame=()=>{
        setScore(0);
        setMaxScore(0)
        setPlaying(true)
        setFinished(false)
        setDivider(random(2,10))
    }

    function checkAndDelete(id, content){

        const item=document.getElementById(id);
        if(content%divider===0){

            item.style.backgroundColor="green";
            setTimeout(() => {setScore(score+1); setMaxScore(maxScore+1)}, 400);
        }
        else {
            item.style.backgroundColor="red";
            setTimeout(() => {setScore(score-1);setMaxScore(maxScore+1)}, 400);
        }
        setTimeout(() => {item.style.visibility="hidden" }, 200);


    }
    const falling=()=>{
        let fontSize = '26px';
        let arr =[];
        for (let i=0; i<40;i++){
            if(Math.random()<0.5)
                arr.push(random(1,10)*divider);
            else arr.push(random(1,100));
        }

        return arr.map((el, i)=>{
            let animationDelay = `${random(3,100)}s`;
            let style = {
                animationDelay,
                fontSize
            }
            return ( <Button className='box' key={i} id={i} style={style} onClick={()=>checkAndDelete(i,arr[i])}>
                {arr[i]}</Button>)
        })
    }


    return(
        <Card style={{padding:'5px', margin:"10px", backgroundColor:'rgba(0, 11, 171, 0.65)' , fontSize:'20px',  textAlign:'center'}}>
            {!playing &&!finished && <Card.Text>
                <h1>Osztás gyakorlása</h1>
                <h3>Gyakorold az osztást, szerezz minél több pontot 1 perc alatt</h3>
                <h3>Válaszd ki a lehulló dobozok közül azt, amelyik osztható az alul látható számmal!</h3>
                <Button size={"lg"} variant="primary" onClick={startGame}>Játék indítása</Button>
            </Card.Text>}

            {playing&& (<Card.Text>
                <div className='board'>
                    { falling()}

                </div>
                <Divider num={divider}/>
                <Score value={score} maxScore={maxScore}/>
                <Timer time={TIME_LIMIT} onEnd={endGame}/><br/>
            </Card.Text>)}

            {finished &&
            <Card.Text>
                <Score value={score} maxScore={maxScore}/>
                <Button variant="primary" size={"lg"} onClick={startGame}>Újra</Button>
                <Button href="/pages/games" variant="primary" size={"lg"}>Vissza a menübe</Button>
            </Card.Text>}
        </Card>

    )

}

export default Multiplication;
