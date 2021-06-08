import styled from 'styled-components'

export const Poster = styled.div`
  width: 100%;
  position: relative;

  display: flex;
  align-items: center;
  height: 85vh;
`
export const MovieDetails = styled.div`
  padding-left: 3rem;

  z-index: 2;

  h1 {
    font-family: 'Bebas Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
    text-transform: uppercase;
    line-height: 0.8;
    font-size: 4.5rem;
  }

  span {
    text-transform: capitalize;
    font-weight: 500;
    font-size: 1.2rem;
    color: white;
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
`
