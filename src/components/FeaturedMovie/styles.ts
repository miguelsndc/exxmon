import styled from 'styled-components'

interface PosterProps {
  backdropPath: string
}

export const Poster = styled.div<PosterProps>`
  background-image: ${(props) => `url(${props.backdropPath})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  border-radius: 40px;
  position: relative;
  height: 32rem;
`
export const MovieDetails = styled.div`
  padding-bottom: 4rem;
  padding-left: 3rem;
  position: absolute;
  bottom: 0;
  h1 {
    font-weight: 700;
    text-transform: uppercase;
    font-size: 2.5rem;
    margin-bottom: 5px;
  }
  span {
    text-transform: uppercase;
    font-weight: 700;
    color: #d3d4de;
  }
`

export const Genres = styled.div`
  margin-bottom: 2rem;
`

export const Overlay = styled.div`
  position: absolute;
  border-radius: 10px;
  background: ${(props) => props.theme.background};
  opacity: 0.45;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

const Button = styled.button`
  border: 0;
  border-radius: 10px;
  font: inherit;
  color: white;
  font-weight: 600;
  transition: filter 0.2s;
  &:hover {
    filter: brightness(0.93);
  }
`

export const CtaButton = styled(Button)`
  background: ${(props) => props.theme.red400};
  padding: 1rem 2.25rem;
`

export const AddToFavoritesButton = styled(Button)`
  font-size: 0;
  background: #4d4a59;
  opacity: 0.85;
  padding: 0.65rem;
  margin-left: 1.4rem;
`

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`
