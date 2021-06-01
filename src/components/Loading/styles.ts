import styled, { keyframes } from 'styled-components'

const Ellipsis1 = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
  `

const Ellipsis2 = keyframes`
    from{
      transform: translate(0, 0);
    }
    to {
      transform: translate(24px, 0);
    }
    `

const Ellipsis3 = keyframes`
from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }`

export const Ellipsis = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: ${(props) => props.theme.red400};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  & div:nth-child(1) {
    left: 8px;
    animation: ${Ellipsis1} 0.6s infinite;
  }
  & div:nth-child(2) {
    left: 8px;
    animation: ${Ellipsis2} 0.6s infinite;
  }
  & div:nth-child(3) {
    left: 32px;
    animation: ${Ellipsis2} 0.6s infinite;
  }
  & div:nth-child(4) {
    left: 56px;
    animation: ${Ellipsis3} 0.6s infinite;
  }
`
