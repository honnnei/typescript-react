import React, { useState } from 'react';
import styled from 'styled-components';

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    .todo {
        display: flex;
        justify-content: space-around;
        padding: 1em;
        margin: 0.5em;
    }

`;

interface ITodo {
    text: string
    completed: boolean
}

export default function Todo(): JSX.Element {
    const [text, setText] = useState<string>('');
    const [todos, setTodos] = useState<ITodo[]>([]);

    console.log(todos);

    const addTodo = (value: string): void => {
        const todo: ITodo = {
            text: value,
            completed: false
        }
        setTodos(prevTodos => [...prevTodos, todo]);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addTodo(text);
    }

    const checkTodo = (e: React.FormEvent<HTMLButtonElement>, index: number): void => {
        e.preventDefault();
        const todo : ITodo = {
            text: todos[index].text,
            completed: !todos[index].completed
        }
        setTodos(prevTodos => prevTodos.map((td, ind) => ind === index ? todo : td))
    }

    const deleteTodo = (e: React.FormEvent<HTMLButtonElement>, index: number): void => {
        e.preventDefault();
        setTodos(prevTodos => prevTodos.filter((td, ind) => ind === index ? null : td))
    }


    return (
        <Div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={text} onChange={e => setText(e.target.value)}/>
                <button type="submit">Add Todo</button>
            </form>
            {todos.map((todo: ITodo, index: number) => (
                <dl className="todo" key={index}>
                    <dt>{todo.text}</dt><dd>{todo.completed ? "- Done" : "- Not Yet"}</dd>
                    <button onClick={e => checkTodo(e, index)}>Check</button>
                    <button onClick={e => deleteTodo(e, index)}>X</button>
                </dl>
            ))}
        </Div>
    );
}
