import React from 'react'
import axios from 'axios'
import Question from './Question'


export default class Survey extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            survey: {},
            index: 0,
            answers: []
        }
    }

    async componentDidMount() {
        const data = await axios.get('/data/quiz.json');
        this.setState({ survey: data });
    }


    handleSubmit() {
        this.state.index < this.state.survey.data.questions.length ?
            this.setState({ 'index': this.state.index + 1 }) : ''
    }

    handleAnswerSelected(event) {
        let list = [...this.state.answers.slice(0, this.state.index),
        parseInt(event.target.value),
        ...this.state.answers.slice(this.state.index + 1)];

        this.setState({ 'answers': list })
    }

    summaryCreator() {

        return this.state.answers.map((answer, i) => {
            return <li key={i}>
                {this.state.survey.data.questions[i].answers[answer].label}
            </li>
        });
    }

    render() {

        const { survey, index, answers } = this.state;
        const numberOfQuestions = survey.data ? survey.data.questions.length : 0;

        let completed = (survey.data && (index === survey.data.questions.length)) ? true : false;
        let summary;

        return (
            <div>
                <h1>{survey.title}</h1>
                {completed ?

                    <div>
                        {/* Summary Page */}
                        <p>Congratulation, you finished the survey</p>
                        Summary {this.summaryCreator()}
                    </div>
                    :
                    <div>
                        {/* Progress bar */}
                        <h2>Question {index + 1} of {numberOfQuestions}</h2>
                        {survey.data && index < numberOfQuestions ?
                            <Question
                                question={survey.data.questions[index]}
                                index={index}
                                onAnswerSelected={(event) => this.handleAnswerSelected(event)}
                                onSubmit={() => this.handleSubmit()}
                            />

                            : 'completed'}
                    </div>
                }
            </div>
        )
    }
}