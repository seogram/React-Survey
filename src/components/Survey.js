import React from 'react'
import axios from 'axios'
import Question from './Question'


export default class Survey extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            survey: {},
        }
    }

    async componentDidMount() {
        const data = await axios.get('/data/quiz.json');
        this.setState({ survey: data });
    }

    render() {
        const {
      survey
    } = this.state

        let numberOfQuestions = survey.data ? survey.data.questions.length : 0
        return (
            <div>
                <h1>{survey.title}</h1>
                <div>
                    {/* Progress bar */}
                    <h2>Question {1} of {numberOfQuestions}</h2>
                    {survey.data ? <Question question={survey.data.questions[0]} />: ''}
                </div>
            </div>
        )
    }
}