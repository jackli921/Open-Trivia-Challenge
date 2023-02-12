import React from 'react'

export default function AdditionalInfoBtns(props){
    const{isGameOn, handleOpenModal} = props
    return (
            <div className={isGameOn ? "hidden" : 'additional-info-btn-container slide-right'}>
              <button className="primary-btn" data-name="rules" onClick={(e)=>handleOpenModal(e)}>Rules</button>
              <button className="primary-btn" data-name="about" onClick={(e)=>handleOpenModal(e)}>About</button>
              <button className="primary-btn" data-name="scores" onClick={(e)=>handleOpenModal(e)}>Scores</button>
          </div>
    )
}