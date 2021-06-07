import styled from 'styled-components'

export const MostPopularSection = styled.section`
  margin-top: 8vh;
  h1 {
    margin-bottom: 2rem;
  }

  display: grid;
  place-items: center;
`

export const GridContainer = styled.div`
  display: grid;
  row-gap: 2.5rem;
  width: 75%;
  column-gap: 0.5rem;
  justify-content: center;

  grid-template-columns: repeat(5, 1fr);

  @media (max-width: 1544px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1080px) {
    grid-template-columns: repeat(3, 1fr);
  }
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

  margin-top: 2rem;
  padding: 1rem 2.25rem;
  text-transform: capitalize;
`
