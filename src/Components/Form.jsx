import React, { useState } from 'react'

export default function Form(props){
    const [formData, setFormData] = useState({
        name:"",
        numOfQuestions:5,
        category:"",
        difficulty:"",
        type:""
    })

    function handleChange(e){
        const {name, value} = e.target
        setFormData(prev => ( {...prev, [name] : value}))}

    function handleSubmit(e){
        props.updateUserInfo(formData.name, formData.numOfQuestions)
        e.preventDefault()
        props.callAPI(formData)
        props.startGame()
        
    }

    return (
        <div className={ props.gameState ? "hidden" : "form-container slide-left"}>
            <form className="form" onSubmit={handleSubmit}>

                <input 
                    type="text"
                    placeholder='Enter your name'
                    name='name' 
                    onChange={handleChange} 
                    value={formData.name} 
                    required/>
                <div className="select-container">
                <select 
                    name="numOfQuestions" 
                    onChange={handleChange} 
                    value={formData.numOfQuestions} 
                    id="numOfQuestions">
                    
                    <option value="5">5 Questions</option>
                    <option value="6">6 Questions</option>
                    <option value="7">7 Questions</option>
                    <option value="8">8 Questions</option>
                    <option value="9">9 Questions</option>
                    <option value="10">10 Questions</option>
                </select>
                
                <select 
                    name="category" 
                    onChange={handleChange} 
                    value={formData.category} 
                    id="category">
                    
                    <option value="any">Any Category</option>
                    <option value="9">General Knowledge</option>
                    <option value="10">Books</option>
                    <option value="11">Films</option>
                    <option value="12">Music</option>
                    <option value="13">Musicals & Theater</option>
                    <option value="14">Television</option>
                
                </select>

                <select 
                    name="difficulty" 
                    onChange={handleChange} 
                    value={formData.difficulty} 
                    id="difficulty">
                    
                    <option value="any">Any Difficulty</option>
                    <option value="easy" selected='selected'>Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <select 
                    name="type" 
                    onChange={handleChange} 
                    value={formData.type} 
                    id="type">``
                    
                    <option value="any">Any Type</option>
                    <option value="multiple" selected='selected`'>Multiple</option>
                    <option value="boolean">True or False</option>
                </select>

                </div>


                <button className="start-btn" id="start-btn">Start</button>
            </form>



        </div>
    )
}