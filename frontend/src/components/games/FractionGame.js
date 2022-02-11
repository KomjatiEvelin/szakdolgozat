import React, { useState} from 'react';
import {Button, Card} from "react-bootstrap";
import UserService from "../../service/user_service";
import GameService from "../../service/game_service";
import Score from "../elements/Score";


const User=UserService.getCurrentUser();

const Fractions=()=>{

    const [playing, setPlaying]=useState(false);
    const [score, setScore]=useState(0);
    const [maxScore, setMaxScore]=useState(0);
    const [finished,setFinished]=useState(false);

    const endGame=()=>{
        setPlaying(false)
        setFinished(true)
        GameService.saveScore(User.id,3,score,maxScore).then(()=>"Success!")
    }

    const startGame=()=>{
        setScore(0)
        setMaxScore(0)
        setPlaying(true)
        setFinished(false)
    }

    return(
        <Card style={{padding:'5px', margin:"10px", backgroundColor:'rgba(0, 11, 171, 0.65)' , fontSize:'20px',  textAlign:'center'}}>
            {!playing &&!finished && <Card.Text>
                <h1>Tört számok</h1>
                <h3>Gyakorold a törteket</h3>
                <h3>Tipp: az ábra segít a számolásban</h3>
                <Button size={"lg"} variant="primary" onClick={startGame}>Játék indítása</Button>
            </Card.Text>}

            {playing&&(<Card.Text style={{padding:'5px', margin:"10px", backgroundColor:'rgba(229,184,5,0.65)' , fontSize:'20px'}}>

                <Score value={score} maxScore={maxScore}/>

                <Button size={"lg"} variant="danger" onClick={endGame}>Játék befejezése</Button>

            </Card.Text>)}

            {finished &&
            <Card.Text>
                <Score value={score} maxScore={maxScore}/>
                <Button variant="primary" size={"lg"} onClick={startGame}>Újra</Button>
                <Button href="/pages/games" variant="primary" size={"lg"}>Vissza a menübe</Button>

            </Card.Text>}

        </Card>)
}

export default Fractions;
