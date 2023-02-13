import React, { PureComponent } from 'react'

export default function Rules(){
    return (
        <div className="rules">
            <ul >
                <li>+1, +2, or +3 pts for every easy, medium, or hard questions answered <span className="green">correctly</span>! </li>
                <li>-3, -2, or -1 pts for every easy, medium, or hard questions answered <span className="red">incorrectly</span>!</li>
                <li> <span className='yellow'>Double your points</span> for each correct answer before the bonus timer runs out </li>
                <li>You get <strong>5 seconds</strong> of bonus time and <strong>7 seconds</strong> of penalty time per question</li>
                <li>You lose points if you fail to answer all questions before the penalty timer runs out. E.g., 5 questions = -5 pts</li>
                <li>You lose 2 pts for every 10s of overtime</li>
                <li>You must answer <strong>all questions</strong> to submit</li>            
            </ul>
        </div>
    )
}