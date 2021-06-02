import styled from 'styled-components'

export const Card = styled.article`
  position: relative;
  text-align: center;
  border-radius: 20px;

  width: 85%;
  height: 20rem;

  cursor: pointer;

  img {
    border-radius: 20px;
  }

  span {
    font-weight: 500;
  }

  &:hover {
    & > div:first-child //overlay
    {
      opacity: 0.2;
    }
  }
`

export const MovieInfo = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  position: absolute;

  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 9;
  span {
    font-weight: 500;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 3rem;
      height: 3rem;
      margin-right: 0.65rem;
    }
  }
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: opacity 0.2s;
  background: ${(props) => props.theme.background};
  border-radius: 18px;
  opacity: 0.35;
`
