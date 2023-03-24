import { useState } from 'react'
import { useEffect } from 'react'
import {nanoid} from "nanoid"


import './App.css'
import Title from './Components/Title'
import Form from './Components/Form'
import Timer from './Components/Timer'
import Questions from "./Components/Questions"
import AdditionalInfoBtns from './Components/AdditionalInfo'
import Rules from './Components/Rules'
import About from './Components/About'
import Score from './Components/Score'

function App() {

  const [questionsArr, setQuestionsArr] = useState([])

  const [isGameOn, setIsGameOn] = useState(false)
  const [timer, setTimer] = useState({
    isInitialTimerOn : false, 
    timeRemaining: 3,

    isBonusTimerOn:false,
    bonusTimeRemaining:null,

    isPenaltyTimerOn:false,
    penaltyTimeRemaining:null,

    isOvertimeOn:false,
    overtimeCount:0
  })

  const [showQuestions, setShowQuestions ] = useState(false)
  const [userInfo, setUserInfo] = useState({
    numCorrectAnswer:0,
    numTotalQuestions:0,
    showIncompletePrompt:false,
    isAllQuestionsAnswered:false,
    isChecked:false,
    totalPts:0,
    regularPenalty:0,
    overtimePenalty:0,
    username:""
  })

  const [showModal, setShowModal] = useState({
    showRules:false,
    showAbout:false,
    showScore:false
  })

  const [scoreboard, setScoreboard] = useState([])

  function getQuestionsFromAPI(input){
    try{
      fetch(`https://opentdb.com/api.php?amount=${input.numOfQuestions}&category=${input.category}&difficulty=${input.difficulty}&type=${input.type}`)
        .then(res=> {
          if(res.ok){
            return res.json()
          }
        })
        .then(data => {
          setQuestionsArr(data.results)
          updateTimers(data.results.length)
          updatePenalty(data.results.length)
          modifyAPIData()
        })
      }
    catch(err){
      alert(`There was an error! "${err}" Try a different set!`)
      console.log(err)
    }

  }

  function startGame(){
    setIsGameOn(true)
    setTimer(prev=> ({...prev, isInitialTimerOn:true}))
  }

  useEffect(()=>{ 
      if(timer.isInitialTimerOn){
        const myInterval = setInterval(decrementCountdown, 1000)
        return ()=> clearInterval(myInterval)
      }
  },[timer])


  function decrementCountdown(){
    setTimer(prev => ({...prev, timeRemaining: prev.timeRemaining - 1}))
    
    if(timer.timeRemaining === 1){
      setTimer(prev => ({...prev, timeRemaining:"Go!"}))
    }
    if(timer.timeRemaining === "Go!"){
      setTimer(prev => ({
          ...prev, 
          timeRemaining: 3, 
          isInitialTimerOn:false,
          isBonusTimerOn:true,
          isPenaltyTimerOn:true}))
      setShowQuestions(true)
    }
  }

  useEffect(()=>{
    if(timer.isBonusTimerOn === true || timer.isPenaltyTimerOn === true){
      const myInterval = setInterval(decrementTimers, 1000)
      return ()=> clearInterval(myInterval)
    }
  },[timer])

  function decrementTimers(){
    if(timer.isBonusTimerOn === true){
      setTimer(prev => ({...prev, 
        bonusTimeRemaining: prev.bonusTimeRemaining - 1}))
    }

    if(timer.isPenaltyTimerOn === true){
    setTimer(prev => ({...prev, 
      penaltyTimeRemaining:prev.penaltyTimeRemaining -1}))
    }

    if(timer.bonusTimeRemaining === 1){
      setTimer(prev =>({...prev, isBonusTimerOn: false}))
    }

    if(timer.penaltyTimeRemaining === 1){
      setTimer(prev =>({...prev, isPenaltyTimerOn: false, isOvertimeOn:true}))
    }
  }

useEffect(()=>{
  if(timer.isOvertimeOn === true){
    const overtimeInterval = setInterval(incrementOvertime, 1000)
    return ()=> clearInterval(overtimeInterval) 
  }
},[timer])

  function incrementOvertime(){
    setTimer(prev => ({...prev, overtimeCount: prev.overtimeCount + 1}))
  }

  function updateTimers(numberOfQuestions){
        setTimer(prev => ({
          ...prev, 
          bonusTimeRemaining:numberOfQuestions * 5,
          penaltyTimeRemaining:numberOfQuestions * 7}))
  }

  function updatePenalty(numberOfQuestions){
        setUserInfo(prev =>({
          ...prev, 
          regularPenalty: numberOfQuestions * (-1)
        }))
  }

  function modifyAPIData(){
      setQuestionsArr(prev => prev.map( item => ({
            incorrectAnswers:item.incorrect_answers,
            correctAnswer: item.correct_answer, 
            randomizedAnswers: ([item.correct_answer, ...item.incorrect_answers].sort(()=> Math.random()-0.5)), 
            selection: null,
            category: item.category,
            difficulty: item.difficulty,
            question: item.question,
            id: nanoid()
        })))
  }
   
  function chooseAnswer(question, answer, e){
        setQuestionsArr(prev => prev.map(item => {
            if(item.question === question){
                return {
                    ...item, selection: answer
                }
            }
            else{
                return {...item}
            }
        }))
    }

    function handleCheckAnswers(){
      if(userInfo.isChecked){
        setIsGameOn(false)
        setShowQuestions(false)
        setUserInfo(prev => ({
            ...prev, 
            isChecked: false, 
            isAllQuestionsAnswered:false,
            numCorrectAnswer:0,
            showIncompletePrompt: false,
            overtimePenalty:0,
            totalPts:0}))
        setTimer(prev => ({...prev, overtimeCount: 0}))
      }

      else{
        const unfinished = questionsArr.some(item => item.selection === null)
        if(unfinished){
            console.log("answer all questions!")
            setUserInfo(prev =>({...prev, showIncompletePrompt:true}))
        }
        else{
            setUserInfo(prev => ({...prev, isAllQuestionsAnswered:true, showIncompletePrompt:false, isChecked: true}))
            setTimer(prev => ({...prev, isBonusTimerOn:false, isPenaltyTimerOn:false, isOvertimeOn: false}))
            checkAnswers() 
        }
      }
    }   


  useEffect(()=>{

    if(userInfo.isChecked && timer.isOvertimeOn === false & timer.isPenaltyTimerOn === false)
      setScoreboard(prev => ([...prev,{
          player:userInfo.username,
          score:userInfo.totalPts,
          totalQuestions: userInfo.numTotalQuestions,
          correctQuestions: userInfo.numCorrectAnswer
        }]))

      localStorage.setItem('scoreboard', JSON.stringify(scoreboard))


    },[userInfo, timer])



    function checkAnswers(){
    
        let bonus = 1;

        if(timer.bonusTimeRemaining > 0){
          bonus = 2
        }

        if(timer.overtimeCount > 0){
          // apply the regular penalty right away
          // apply 2 penalty points for 10 seconds of overtime elapsed
          let overtimePenaltyPts = (timer.overtimeCount/10).toFixed() * (-2)  

          setUserInfo((prev => ({...prev, 
                totalPts: prev.regularPenalty + prev.overtimePenalty + overtimePenaltyPts,
                overtimePenalty:overtimePenaltyPts})))
        }

          // multiply each correct answer by bonus
          // detect points for each incorrect answer 
          questionsArr.forEach(item => {
                if(item.correctAnswer === item.selection && item.difficulty === "easy"){
                  setUserInfo(prev => ({...prev, numCorrectAnswer: prev.numCorrectAnswer + 1, totalPts: prev.totalPts + (1*bonus)}))
                }
                if(item.correctAnswer === item.selection && item.difficulty === "medium"){
                  setUserInfo(prev => ({...prev, numCorrectAnswer: prev.numCorrectAnswer + 1, totalPts: prev.totalPts + (2*bonus)}))
                }
                if(item.correctAnswer === item.selection && item.difficulty === "hard"){
                  setUserInfo(prev => ({...prev, numCorrectAnswer: prev.numCorrectAnswer + 1, totalPts: prev.totalPts + (3*bonus)}))
                }
                if(item.correctAnswer != item.selection && item.difficulty === "easy"){
                  setUserInfo(prev => ({...prev, totalPts: prev.totalPts - 3}))
                }
                if(item.correctAnswer != item.selection && item.difficulty === "medium"){
                  setUserInfo(prev => ({...prev, totalPts: prev.totalPts - 2}))
                }
                if(item.correctAnswer != item.selection && item.difficulty === "hard"){
                  setUserInfo(prev => ({...prev, totalPts: prev.totalPts - 1}))
                }
            })
    }

        // find how the difficult of each question
        // find out if the question was answered correctly or not
        // assign or deduct points based on results 
        // as we loop through each answer, we add or decrease points based on the correctness and appropriate timers
        // we also need a state to store the total points


    function updateUserInfo(username, numOfQuestions){
        setUserInfo(prev => ({...prev, username:username, numTotalQuestions:Number(numOfQuestions)}))
    }

    
    function handleOpenModal(e){
    
      let modalName = e.target.dataset.name

      if(modalName === "rules"){
          setShowModal(prev => ({...prev, showRules:true}))
      }
      
      if(modalName === "about"){
          setShowModal(prev => ({...prev, showAbout:true}))
      }
      
      if(modalName === "scores"){
        setShowModal(prev => ({...prev, showScore:true}))
      }
    
    }

    function backToMain(){
        setShowModal(prev => ({
          showRules:false,
          showAbout:false,
          showScore:false}))
    }
   

  return (
    <div className="container">
      <div className="top-container slide-right">
        <Title isGameOn={isGameOn} />
        <Timer timer={timer} showQuestions={showQuestions} />
      </div>

      <div
        className={
          timer.isInitialTimerOn
            ? "pre-game-countdown-container"
            : "pre-game-countdown-container"
        }
      >
        <p className="countdown-text">
          Get Ready!{" "}
          <span className="countdown-username gradient-text">
            {userInfo.username}
          </span>
        </p>
        
        <h1>{timer.timeRemaining}</h1>
      </div>

      <div
        className={
          showModal.showRules || showModal.showAbout || showModal.showScore
            ? "additional-info-modal-container"
            : "hidden"
        }
      >
        {showModal.showRules && <Rules />}
        {showModal.showAbout && <About />}
        {showModal.showScore && <Score />}

        <button className="primary-btn" onClick={backToMain}>
          Back
        </button>
      </div>

      <div
        className={
          showModal.showRules || showModal.showAbout || showModal.showScore
            ? "hidden"
            : "main-container"
        }
      >
        <Form
          callAPI={getQuestionsFromAPI}
          startGame={startGame}
          gameState={isGameOn}
          updateUserInfo={updateUserInfo}
        />

        <AdditionalInfoBtns
          isGameOn={isGameOn}
          handleOpenModal={handleOpenModal}
        />

        <Questions
          questionsArr={questionsArr}
          userInfo={userInfo}
          handleCheckAnswers={handleCheckAnswers}
          showQuestions={showQuestions}
          chooseAnswer={chooseAnswer}
          timer={timer}
        />
      </div>
    </div>
  );
}

export default App
