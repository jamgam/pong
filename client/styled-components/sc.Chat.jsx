import styled from 'styled-components';

export const Chat = styled.div`
border: solid black 1px;
padding: 3px;
margin-left: 15px;
width: 600px;
display: inline-flex;
justify-context: space-between;
flex-direction: column;
`;

export const Heading = styled.div`
font-weight: 800;
border: solid black 1px;
padding: 1px;
`;

export const Messages = styled.div`
height:100%;
overflow-y: auto;
margin-bottom: 5px;
margin-top: 2px;
overflow-wrap: break-word;
`;

export const Input = styled.input`
font-size: 15px;
height: 18px;
width: 99.4%;
font-family: Courier New;
`;
