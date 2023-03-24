import React, { PureComponent } from 'react'

export default function About(){
    return (
      <div className="about">
        <h3>About</h3>
        <p>
          This app was created by{" "}
          {<a href="https://www.linkedin.com/in/jackli921/">Jack</a>} as a solo
          project of
          {<strong> Module 11 - React Basics </strong>}of the{" "}
          <a href="https://scrimba.com/learn/frontend">
            Scrimba Frontend Developer Course
          </a>
        </p>

        <p>
          The features of this app was inspired by Daniel Beck Rose, who is also
          a Scrimba student; You can check{" "}
          <a href="https://daniels-quiz-o-matic.netlify.app/">his version</a>{" "}
        </p>

        <p>
          All questions are from the{" "}
          {<a href="https://opentdb.com/api_config.php">Open Trivia API</a>}
        </p>

        <p>
          If you want to get in touch with Jack or see his other works, check
          out his {<a href="https://jack-codes.netlify.app/">portfolio</a>}
        </p>
      </div>
    );
}