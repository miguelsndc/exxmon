import styled from 'styled-components'

interface CardProps {
  posterPath: string
}

export const Card = styled.article<CardProps>`
  background-image: ${(props) => `url(${props.posterPath})`};
  background-size: cover;
  background-position-x: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-radius: 20px;
  width: 80%;
  height: 20rem;
  text-align: center;
  cursor: pointer;
  transition: box-shadow 0.2s;
  span {
    font-weight: 500;
  }
  &:hover {
    & > div:first-child //overlay
    {
      opacity: 0.2;
    }
    box-shadow: 0px 0px 1px 4px #ebebeb;
  }
`

export const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
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
