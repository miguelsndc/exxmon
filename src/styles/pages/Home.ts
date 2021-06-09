import styled from 'styled-components'

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  margin: 1rem 0;

  button {
    border: 0;
    font: inherit;

    padding: 0.75rem 1rem;
    font-weight: 500;
    color: white;

    background: ${(props) => props.theme.primary};
  }
`
