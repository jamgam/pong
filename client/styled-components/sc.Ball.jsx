import styled from 'styled-components';

// export const Ball = styled.div`
//   width: 7px;
//   height: 7px;
//   background-color: white;
//   transform: translate(${(props) => props.pos[0]}px, ${(props) => props.pos[1]}px);
//   transition: all ease 0s
// `;

export const Ball = styled.div.attrs((props) => ({
  style: { transform: `translate(${props.pos[0]}px, ${props.pos[1]}px)` },
}))`
  width: 7px;
  height: 7px;
  background-color: white;
`;
