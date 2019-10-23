import styled from 'styled-components';

export const Login = styled.div`
float: right;
`;

export const Label = styled.label`
padding-left: 5px;
`;

export const UserLabel = styled.label`
padding-left: 5px;
display: ${(props) => (props.signup ? 'none' : 'inline-block')};
`;

export const Button = styled.button`
font-weight: 700;
float: right;
background-color: black;
color: white;
font-family: Courier New;
height: 23px;
width: 65px;
border: solid white 1px;
box-shadow: 0 0 0 2px black;
margin-right: 5px;
margin-bottom: 1px;
`;

export const Submit = styled.input`
font-weight: 700;
background-color: black;
color: white;
font-family: Courier New;
height: 23px;
width: 65px;
border: solid white 1px;
box-shadow: 0 0 0 2px black;
margin-right: 5px;
margin-bottom: 1px;
display: ${(props) => (props.signup ? 'none' : 'inline-block')};
`;

export const UserInput = styled.input`
display: ${(props) => (props.signup ? 'none' : 'inline-block')};
`;

export const PassInput = styled.input`
margin-right: 5px;
`;

export const LoggedInMessage = styled.span`
padding-right: 10px;
`;
