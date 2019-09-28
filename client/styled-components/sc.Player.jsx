import styled from 'styled-components';

export const Paddle = styled.div.attrs((props) => ({
  style: { transform: `translateY(${props.position}px)` },
}))`
  width: 7px;
  height 100px;
  transition: all ease 0.05s
  float: ${(props) => props.player};
  background-color: white;
  border: solid black 1px;
`;
