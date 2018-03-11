import React from 'react';
import { shallow } from 'enzyme';
import { Question } from './Question';

describe('Question Component', () => {
    const data =
        {
            "question": "Choose your Favorite Country",
            "answers": [
                {
                    "point": 1,
                    "label": "Germany"
                },
                {
                    "point": 0,
                    "label": "UK"
                },
                {
                    "point": 0,
                    "label": "US"
                },
                {
                    "point": 0,
                    "label": "France"
                }
            ]
        }
    const mockSubmit = jest.fn();
    const mockOnAnswerSelected = jest.fn();
    const mockBack = jest.fn();

    const props = {
        question: data, Useranswers: 1, step: 1,
        onAnswerSelected: mockOnAnswerSelected, onSubmit: mockSubmit,back:mockBack
    };
    const question = shallow(<Question {...props} />);

    it('renders properly', () => {
        expect(question).toMatchSnapshot();
    });

    it('displays the question from props', () => {
        expect(question.find('.question').text()).toEqual('Choose your Favorite Country');
    });

    it('creates a checkboxes in order to choose the answer', () => {
        expect(question.find('.radioCustomButton').exists()).toBe(true);
    });

    it('creates 4 checkboxes ', () => {
        expect(question.find('.radioCustomButton').length).toEqual(4);
    });

});



