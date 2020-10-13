import React, {useState, useEffect} from 'react';
import QuestionCard from './components/QuestionCard';
import { GlobalStyle , Wrapper} from './App.style';

import { Difficulty, fetchQuizQuestions, QuestionState } from './api/API';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

function App() {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [currentQustionNumber, setCurrentQustionNumber] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    const questionsData = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(questionsData);
    setScore(0);
    setUserAnswers([]);
    setCurrentQustionNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[currentQustionNumber].correct_answer === answer;
      if (correct) setScore(prev => prev + 1);
      const answerObject = {
        question: questions[currentQustionNumber].question,
        answer,
        correct, 
        correctAnswer: questions[currentQustionNumber].correct_answer
      }
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  }

  const nextQuestion = () => {
    const nextQuestion = currentQustionNumber + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setCurrentQustionNumber(nextQuestion);
    }
  }


  return (
    <>
    <GlobalStyle />
    <Wrapper>
      <h1>Quiz</h1>
      { gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startQuiz}>Start</button>
      ) : null }
      {!gameOver && <p className="score">Score: {score}</p>}
      { loading && <p>Loading Questions ...</p> }
      {!loading && !gameOver ? (
        <QuestionCard 
        questionNumber={currentQustionNumber + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[currentQustionNumber].question}
        answers={questions[currentQustionNumber].answers}
        correctAns={questions[currentQustionNumber].correct_answer}
        userAnswer={userAnswers ? userAnswers[currentQustionNumber] : undefined}
        callback={checkAnswer}
        />
      ) : null}
      {!gameOver && !loading && userAnswers.length === currentQustionNumber + 1 && currentQustionNumber !== TOTAL_QUESTIONS ? (
        <button className="next-question-button" onClick={nextQuestion}>Next Question</button>
      ) : null}
    </Wrapper>
    </>
  );
}

export default App;
