import styled, { keyframes } from 'styled-components'

const Fade = keyframes`
  from {
    opacity: 0;
  } to {
    opacity:1 
  }
`

interface SimilarMovieProps {
  posterPath: string
}

export const MoviePoster = styled.div`
  position: relative;

  width: 100%;
  height: 95vh;
  display: flex;
  align-items: flex-end;
  animation: ${Fade} 1s;
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  background: ${(props) => props.theme.background};
  opacity: 0.5;
`

export const MovieInfo = styled.div`
  display: flex;
  align-items: center;

  & * {
    z-index: 9;
  }
`

export const Poster = styled.img`
  width: 200px;
  height: 300px;
`

export const Details = styled.div`
  margin-left: 1.25rem;
  h2 {
    font-weight: 600;
    font-size: 2rem;
  }
  p {
    font-weight: 500;
    margin-top: 1rem;
  }
`

export const SimilarMovie = styled.div<SimilarMovieProps>`
  background-image: ${(props) => `url(${props.posterPath})`};
  background-size: cover;

  margin: 1rem;
  min-width: 13rem;
  height: 16rem;
`

export const ResultsNotFound = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 2rem 0;

  button {
    margin-top: 1.2rem;
  }
`
export const AdditionalInfo = styled.div`
  display: flex;
  align-items: center;

  h3 {
    font-weight: 500;
    margin-right: 0.5rem;
  }

  span {
    font-weight: 500;
    margin-right: 0.45rem;
    color: #c9c9c9;
  }

  &:nth-child(3) {
    margin: 1rem 0;
  }

  img {
    width: 4rem;
    height: 4rem;
    margin-right: 1rem;
  }
`
