import { shuffleArray } from '../utils';

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export type QuestionType = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionState = QuestionType & { answers: string[] };

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    return data.results.map((q: QuestionType) => ({
        ...q, 
        answers: shuffleArray([
            ...q.incorrect_answers, 
            q.correct_answer,
        ]),
    }));
}