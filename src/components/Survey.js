import React from 'react'
import axios from 'axios'
import Question from './Question'


export default class Survey extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            survey: {},
            step: 0,
            Useranswers: []
        }
    }

    async componentDidMount() {
        const data = await axios.get('/data/quiz.json');
        this.setState({ survey: data });
    }


    handleSubmit() {
        if (this.state.Useranswers[this.state.step] != null) {
            this.setState({error : ''});
            this.state.step < this.state.survey.data.questions.length ?
                this.setState({ 'step': this.state.step + 1 }) : ''
        }else {
            this.setState({error : 'Please select one'})
        }

    }



    handleBack() {
        this.state.step > 0 ?
            this.setState({ 'step': this.state.step - 1 }) : ''
    }


    handleAnswerSelected(event) {
        this.setState({error : ''});
        let list = [...this.state.Useranswers.slice(0, this.state.step),
        parseInt(event.target.value),
        ...this.state.Useranswers.slice(this.state.step + 1)];
        this.setState({ 'Useranswers': list })
    }

    summaryCreator() {
        return this.state.Useranswers.map((answer, i) => {
            return (
                <div key={i + 'r'}>
                    <div key={i + 'q'} className="summary">{`${this.state.survey.data.questions[i].question} :`}</div>
                    <div key={i + 'l'} className="summary">
                        {this.state.survey.data.questions[i].answers[answer].label}
                    </div>
                    <br />
                </div>
            )
        });
    }

    render() {

        const { survey, step, Useranswers,error } = this.state;
        const numberOfQuestions = survey.data ? survey.data.questions.length : 0;

        let completed = (survey.data && (step === survey.data.questions.length)) ? true : false;
        let summary;

        localStorage.question = survey.data ? survey.data.questions[step] : '';
        localStorage.Useranswers = Useranswers[step];
        localStorage.step = step;


        return (
            <div>
                {console.log('local', localStorage.step)}

                <h1>{survey.title}</h1>
                {completed ?

                    <div>
                        {/* Summary Page */}
                        <p>Congratulation, you finished the survey</p>
                        Summary : <br />
                        {this.summaryCreator()}
                        <br />
                        <button onClick={() => window.location.reload()}>Reload Survey</button>
                    </div>
                    :
                    <div>
                        {/* Progress bar */}
                        <h2>Question {step + 1} of {numberOfQuestions}</h2>
                        {survey.data && step < numberOfQuestions ?
                            <Question
                                question={survey.data.questions[step]}
                                Useranswers={Useranswers[step]}
                                step={step}
                                onAnswerSelected={(event) => this.handleAnswerSelected(event)}
                                onSubmit={() => this.handleSubmit()}
                                back={() => this.handleBack()}
                                error = {error}
                            />

                            : 'completed'}
                    </div>
                }
            </div>
        )
    }
}