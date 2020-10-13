import React from 'react';
import { AnswerObject } from '../App';
import { Wrapper, ButtonWrapper } from '../style/QuestionCard.style';

type Props = {
    question: string;
    answers: string[];
    correctAns: string;
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNumber: number;
    totalQuestions: number;

}

const QuestionCard: React.FC<Props> = ({ 
    question, 
    answers, 
    correctAns,
    callback, 
    userAnswer, 
    questionNumber, 
    totalQuestions
}) => {
    
    return (
        <Wrapper>
           <p className="number">
               Question: {questionNumber} / {totalQuestions}
           </p>
            <p dangerouslySetInnerHTML={{ __html: question}} />
            <div>
                {answers.map(answer => (
                    <ButtonWrapper key={answer} 
                    correct={userAnswer?.correctAnswer === answer} 
                    userClicked={userAnswer?.answer === answer} >
                        <button disabled={userAnswer ? true : false} value={answer} onClick={callback}><span dangerouslySetInnerHTML={{ __html: answer }} /></button>
                        
                    </ButtonWrapper>
                ))}
            </div>
        </Wrapper>
    );
}

export default QuestionCard;
