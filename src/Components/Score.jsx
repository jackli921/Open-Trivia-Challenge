import React, { PureComponent } from 'react'
import { useEffect } from 'react'
import {nanoid} from "nanoid"


export default function Score(){
    const [scoreboard, setScoreboard] = React.useState(JSON.parse(localStorage.getItem('scoreboard')))
    
    let scoreElement = scoreboard.map(item =>

        <div key={nanoid()}className='score-card'>    
            <span>{item.player}:</span>
            <span>{item.score} points</span>
            <span>{item.correctQuestions}/{item.totalQuestions} correct</span>
        </div>
    )

    return (
        <div className="scoreboard">
            <h3>Scoreboard</h3>
            {scoreElement}
        </div>
    )
}