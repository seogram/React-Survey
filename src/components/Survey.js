import React from 'react'
import axios from 'axios'
import Question from './Question'

export default class Survey extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            survey: {},
            step: 0,
            Useranswers: [],
        }
    }

    async componentDidMount() {
        const data = await axios.get('/data/quiz.json');
        this.setState({ survey: data });
    }


    handleSubmit() {
        if (this.state.Useranswers[this.state.step] != null) {
            this.setState({ error: '' });
            this.state.step < this.state.survey.data.questions.length ?
                this.setState({ 'step': this.state.step + 1 }) : '';
                
        } else {
            this.setState({ error: 'Please select one' })
        }

    }

    handleBack() {
        this.state.step > 0 ?
            this.setState({ 'step': this.state.step - 1 }) : ''
    }


    handleAnswerSelected(event) {
        this.setState({ error: '' });
        let list = [...this.state.Useranswers.slice(0, this.state.step),
        parseInt(event.target.value),
        ...this.state.Useranswers.slice(this.state.step + 1)];
        this.setState({ 'Useranswers': list })
    }

    summaryCreator() {
        return this.state.Useranswers.map((answer, i) => {
            return (
                <div key={i + 'r'} className="container result">
                    <div key={i + 'q'} >
                        {`${this.state.survey.data.questions[i].question} :
                     ${this.state.survey.data.questions[i].answers[answer].label} `}
                    </div>
                    <br />
                </div>

            )
        });
    }

    render() {

        const { survey, step, Useranswers, error } = this.state;
        const numberOfQuestions = survey.data ? survey.data.questions.length : 0;
        let completed = (survey.data && (step === survey.data.questions.length)) ? true : false;

        return (
            <div className="container">

                <h2>{survey.title}</h2>
                {completed ?
                    <div className='container'>
                        {/* Summary Page */}
                        <h1 className='result_title'>Congratulation, you finished the survey</h1>

                        <br />
                        {this.summaryCreator()}
                        <div style={{ textAlign: 'center' }}>
                            <button className='submit' onClick={() => this.setState({ step: 0, Useranswers: [] })}>
                                Reload Survey
                            </button>
                        </div>
                    </div>
                    :
                    <div>
                        {/* Progress bar */}
                        <div className='progress'>
                            <progress value={step} max={survey.data ? survey.data.questions.length : 0}></progress>
                        </div>
                        <div className="questionCount">Question {step + 1} of {numberOfQuestions}</div>

                        <br />
                        {survey.data && step < numberOfQuestions ?
                            <Question
                                question={survey.data.questions[step]}
                                Useranswers={Useranswers[step]}
                                step={step}
                                onAnswerSelected={(event) => this.handleAnswerSelected(event)}
                                onSubmit={() => this.handleSubmit()}
                                back={() => this.handleBack()}
                                error={error}
                            />
                            : ''}
                    </div>
                }
            </div>
        )
    }
}