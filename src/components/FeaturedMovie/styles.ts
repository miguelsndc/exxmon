import styled from 'styled-components'

type PosterProps = {
  hasPoster: boolean
}

export const Poster = styled.div<PosterProps>`
  width: 100%;
  position: relative;

  background: ${(props) => props.hasPoster && 'black'};

  display: flex;
  align-items: center;
  height: 95vh;

  @media (max-width: 600px) {
    text-align: center;
    justify-content: center;
  }
`

export const PosterFallback = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: black;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    font-size: 2rem;
    text-transform: capitalize;
    filter: brightness(0.8);
  }
`

export const MovieDetails = styled.div`
  padding-left: 3rem;
  margin-top: 1rem;

  z-index: 9;

  h1,
  h2,
  h3 {
    font-family: 'Bebas Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
    text-transform: uppercase;
    line-height: 0.9;
  }

  h1 {
    letter-spacing: 1px;
    font-size: 5rem;
    margin-left: -1.4rem;
  }

  h2 {
    font-size: 4.25rem;
    color: ${(props) => props.theme.primary};
    letter-spacing: 1px;
    margin: 1rem 0;
  }

  h3 {
    margin-bottom: 1rem;
    font-size: 2rem;
    color: ${(props) => props.theme.primary};
  }

  span {
    text-transform: capitalize;
    font-weight: 500;
    font-size: 1.2rem;
    color: white;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 3.25rem;
      margin-left: 0;
    }
    h2 {
      font-size: 2.5rem;
    }
  }

  @media (max-width: 600px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-left: 0rem;
  }
`

export const Genres = styled.div`
  margin: 1.25rem 0;

  & > span > span {
    color: ${(props) => props.theme.primary};
  }
`

export const Overlay = styled.div`
  position: absolute;

  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(23, 24, 26, 0) 0%,
    rgba(16, 16, 18, 1) 100%
  );
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
  background: ${(props) => props.theme.primary};
  padding: 1rem 2.25rem;
`

export const Description = styled.p`
  width: 70%;
  max-width: 900px;
  margin-bottom: 2rem;

  @media (max-width: 700px) {
    width: 90%;
  }
`

export const Tagline = styled.h3`
  font-size: 1.85rem;
  margin-top: 1rem;
  font-style: italic;
`
