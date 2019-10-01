import styled, { keyframes } from 'styled-components';

const flicker = keyframes`
0% {background-color: black;}
20% {background-color: white;}
40% {background-color: black;}
60% {background-color: white;}
80% {background-color: black;}
100% {background-color: white;}
`;

export const Paddle = styled.div.attrs((props) => ({
  style: {
    transform: `translateY(${props.position}px)`,
  },
}))`
animation: ${(props) => (!props.visible ? flicker : '')} 0.25s linear 2;
width: 8px;
height 80px;
transition: all ease 0.05s
float: ${(props) => props.player};
background-color: white;
border: solid black 1px;
`;
