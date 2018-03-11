import React from 'react'

export const Question = ({ question, Useranswers, step, onAnswerSelected, onSubmit, back, error }) => {

  return (
    <div>
      <h2 className="question">{question.question}</h2>
      <ol>
        {question.answers.map((answer, i) =>
          <li key={`${step}-${i}`} className="answerOption" >
            <input type="radio" name={`question_${step}`} id={`question_${step}_answer_${i}`}
              className='radioCustomButton'
              defaultChecked={i == Useranswers ?
                true : false} value={i} onChange={onAnswerSelected} />
            {' '}
            <label className="radioCustomLabel" htmlFor={`question_${step}_answer_${i}`}>{answer.label}</label>
          </li>
        )}
      </ol>
      <div style={{ textAlign: 'center' }}>
        {step > 0 && <button className='back' onClick={back}>Back</button>}
        <button className='submit' onClick={onSubmit}>Submit</button>
        <p className='error'>{error}</p>
      </div>

    </div>
  )
}

export default Question