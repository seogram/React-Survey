import React from 'react'

const Question = ({
  question,
  Useranswers,
  step,
  onAnswerSelected,
  onSubmit,
  back,
  error
}) => {

  return (
   
    <div>
      <h3>{question.question}</h3>
      <ol>
      {question.answers.map((answer, i) =>
        <li key={`${step}-${i}`}>
          <input type="radio" name={`question_${step}`} id={`question_${step}_answer_${i}`}
           defaultChecked={i == Useranswers ? true : false} value={i} onChange={onAnswerSelected} />
          {' '}
          <label htmlFor={`question_${step}_answer_${i}`}>{answer.label}</label>
        </li>
      )}
      </ol>
      
      {step > 0 && <button onClick={back}>Back</button>}
      <button onClick={onSubmit}>Submit</button>
      <p className='error'>{error}</p>
    </div>
  )
}


export default Question