import styled from 'styled-components'

export const GridContainer = styled.div`
  display: grid;
  row-gap: 2.5rem;
  width: 75%;
  column-gap: 0.5rem;
  justify-content: center;

  grid-template-columns: repeat(5, 1fr);

  @media (max-width: 1544px) {
    width: 85%;
  }

  @media (max-width: 1080px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
    width: 90%;
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
  padding: 1rem 2.25rem;
`
