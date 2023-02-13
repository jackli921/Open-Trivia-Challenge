import React, { PureComponent } from 'react'

export default function About(){
    return (
        <div className='about'>
            <h3>About</h3>
            <p>This app was created by {<a href="https://www.linkedin.com/in/jackli921/">Jack</a>} as a solo project of 
            {<strong> Module 11 - React Basics </strong>}of the <a href="https://scrimba.com/learn/frontend">Scrimba Frontend Developer Course</a>
            </p>
        
            <p>The features of this app was inspired by Daniel Beck Rose, who is also a Scrimba student; You
                can check <a href="https://daniels-quiz-o-matic.netlify.app/">his version</a> </p>
        
            <p>All questions are from the {<a herf="https://opentdb.com/api_config.php">Open Trivia API</a>}</p>
        
            <p>Jack has also built a dating app for dogs called {<a href="https://tiny-mochi-3e1c9c.netlify.app/">Tindog</a>} If you want to get in touch with Jack, just <a href="mailto: li.jack0707@gmail.com">Email</a></p>
        </div>
    )
}