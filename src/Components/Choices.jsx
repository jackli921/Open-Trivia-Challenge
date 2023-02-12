import React, { PureComponent } from 'react'
import {nanoid} from "nanoid"
import { decode } from 'html-entities'

export default function Choices(props){
    let btnClass = ""

    const answerButtonElements = props.answers.map(choice => {
        if (!props.userInfo.isChecked){
            if(choice === props.selection){
                btnClass = "selected-answer"
            }
            else{
                btnClass = "answer-btn"
            }
        }
        else{
            if(choice === props.selection && choice === props.correctAnswer){
                 btnClass = "green answer-btn disabled"
            }
            else if(choice === props.selection && choice != props.correctAnswer){
                 btnClass = "red answer-btn disabled opaque"
            }
            else if(choice != props.selection && choice === props.correctAnswer){
                btnClass = "green answer-btn disabled" 
            }
            else{
                btnClass = "answer-btn disabled opaque"
            }
        }

        // if checkanswer is not clicked, 
            // if choice === props.selection 
                // add selected button answers
            // else
                // regular answer btn style
        // else if checkanswer is clicked
            // if choice === selection & choice === correct_answer
                // add green style
            // if choice === selection & choice !=correct_answer
                // add red style
            // else
                // regular styles

        
        return <button
                    key={nanoid()} 
                    className = {btnClass} 
                    onClick={(e)=>props.chooseAnswer(props.question, choice, e)}>{decode(choice)}</button>
    })

    return (
        <p>{answerButtonElements}</p>
    )
}
