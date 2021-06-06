import styled from 'styled-components'

interface MovieCardProps {
  hasPoster: boolean
}

export const Card = styled.article<MovieCardProps>`
  background: ${(props) => !props.hasPoster && '#000'};
  position: relative;
  text-align: center;
  border-radius: 10px;

  width: 80%;
  height: 17rem;

  cursor: pointer;

  transition: box-shadow 0.2s;

  strong {
    position: absolute;
    color: #ebebeb;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  img {
    border-radius: 10px;
  }

  span {
    font-weight: 500;
  }

  &:hover {
    box-shadow: 0px 0px 1px 4px white;
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
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: opacity 0.2s;
  border-radius: 10px;
  opacity: 0.35;
  background: ${(props) => props.theme.background};
`
