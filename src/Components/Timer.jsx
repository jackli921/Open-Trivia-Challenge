import React from 'react'

export default function Timer(props){

    const {timer, showQuestions} = props


    return (
        <div className={ showQuestions ? "in-game-countdown-container" : "hidden"}>
            <div className="timer">{timer.bonusTimeRemaining}
                <p className="timer-label">Bonus</p>
            </div>
            <div className="timer" >{timer.overtimeCount}
                <p className="timer-label">Overtime</p>
            </div>
            <div className="timer">{timer.penaltyTimeRemaining}
                <p className="timer-label">Penalty</p>
            </div>
        </div>
    )

}