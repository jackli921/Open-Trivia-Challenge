import React, { PureComponent, useEffect } from 'react'
import Choices from '../Components/Choices'
import {nanoid} from "nanoid"
import {decode} from 'html-entities'


export default function Questions(props){

    const { questionsArr, userInfo, timer, allQuestionsAnswered, handleCheckAnswers, showQuestions, chooseAnswer } = props


    const questionElement = questionsArr.map(item =>
        
        <div className="question-container" key={nanoid()}>
            <p className="question-title">{decode(item.question)}</p>
            {(userInfo.isChecked && timer.isBonusTimerOn === true && item.selection === item.correctAnswer ) && <p className="double-bonus">Bonus Double</p>}
     
            {userInfo.isAllQuestionsAnswered && <span className="difficulty-prompt">
                Difficulty:  
                {item.difficulty === "easy" ? "⭐️" : 
                 item.difficulty === "medium"? "⭐️⭐️":
                 item.difficulty === "hard"? "⭐️⭐️⭐️": ""} 
                 &nbsp;
                 
                 Point(s): {item.selection === item.correctAnswer ? "+":"-"}
                        {item.difficulty === "easy" && item.selection === item.correctAnswer ? "1":
                        item.difficulty === "easy" && item.selection != item.correctAnswer ? "3":
                        //when everything is done after bonus timer expires,
                        item.difficulty === "medium" ? "2": 

                        item.difficulty === "hard" && item.selection === item.correctAnswer ? "3":
                        item.difficulty === "hard" && item.selection != item.correctAnswer ? "1":""
                        //when bonus timer is > 0, all correct answers get double the points 
                        }

                </span>}
            <Choices 
                userInfo={userInfo} 
                correctAnswer={item.correctAnswer} 
                selection={item.selection} 
                answers={item.randomizedAnswers} 
                question={item.question} 
                chooseAnswer={chooseAnswer}/>
            
           
           <hr className='separator'/>
        </div>
    )
    

    return (
        <div className={props.showQuestions ? "questions-container" : "hidden"}>
            {questionElement}
            <div>
                {userInfo.isAllQuestionsAnswered && 
                <div>
                    <p className="score-text">{timer.penaltyTimeRemaining === 0 ? `Regular Penalty: ${userInfo.regularPenalty} pts`: "No regular penalty"}</p>
                    <p className="score-text">{timer.overtimeCount >= 1 ? `Overtime Penalty: ${userInfo.overtimePenalty} pts` :"No overtime penalty"}</p>
                    <p  className="score-text">Total: {userInfo.totalPts} points</p> 
                    <p className="score-text">Score: {userInfo.numCorrectAnswer}/{userInfo.numTotalQuestions} correct</p>
                </div>}
                

                <p className={userInfo.showIncompletePrompt ? 
                            "answer-all-questions-prompt" : "hidden"}>
                            Please answer all questions</p>
                <button 
                    onClick={handleCheckAnswers}  
                    className={showQuestions ? "check-answer-btn" :"hidden"}>
                    {userInfo.isChecked ? "Play Again" :"Check Answers"}
                </button>
                
            </div>
        </div>
    )

}