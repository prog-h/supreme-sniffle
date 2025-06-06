import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Comfortaa", serif;
        font-optical-sizing: auto;
        font-weight: 500;
        font-style: normal;
    }
    
    #root {
        height: 100vh;
    }

    &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.1);
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.2);
    }

    &::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.4);
    }

    &::-webkit-scrollbar-thumb:active {
        background: rgba(0, 0, 0, .9);
    }
`;
