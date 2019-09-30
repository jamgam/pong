import styled from 'styled-components';

export const Ball = styled.div.attrs((props) => ({
  style: { transform: `translate(${props.pos[0]}px, ${props.pos[1]}px)` },
}))`
position: absolute;
width: 8px;
height: 8px;
background-color: white;
transition: all ease 0.05s;
`;
