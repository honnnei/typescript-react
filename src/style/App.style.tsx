import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
    }

    body {
        background: lightpink;
    }

    * {
        font-family: 'Catamaran' sans-serif;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    > p {
        color: #fff;
    }

    .score {
        color: #fff;
        font-size: 2rem;
        margin: 0;
    }

    h1 {
        font-family: 'Fascinate Inline', cursive;
        background-image: linear-gradient(180deg, #fff, #87f1ff);
        background-size: 100%;
        background-clip: text;
        -webkit-background-clip: text;
        filter: drop-shadow(2px 2px #0085a3);
        color: transparent;
        font-size: 70px;
        font-weight: 400;
        text-align: center;
        margin: 20px;
    }

    .start {
        cursos: pointer;
        user-select: none;
        font-size: 1rem;
        height: 2rem;
        width: 3rem;
        margin: 5px 0;
        border: 3px solif #fff;
        box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        text-shadow: 0px 1px 0px rgba(0, 0, 0 0.25);
    }
`;
