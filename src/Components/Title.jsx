import React, { useState } from 'react'
import reactLogo from '../assets/react.svg'

export default function Title(props){
    
    return (
 
        <div className={props.isGameOn ? "hidden" : "title-container"} >
            <img src="/vite.svg" className="logo" alt="Vite logo" />
            <h1>Open Trivia Challenge</h1>
            <img src={reactLogo} className="logo react" alt="React logo" />
        </div>

    )
}