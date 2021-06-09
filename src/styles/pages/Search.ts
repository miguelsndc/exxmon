import styled from 'styled-components'

export const SearchContainer = styled.div`
  margin-top: 12vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const SearchForm = styled.form`
  margin-top: 2rem;

  input[type='text'] {
    border: 2px solid ${(props) => props.theme.text};
    outline: 0;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    font-weight: 500;

    font: inherit;
    color: white;

    background: transparent;
    margin-right: 1rem;
  }

  button[type='submit'] {
    border: 0;
    outline: 0;
    padding: 0.65rem 1rem;
    border-radius: 10px;

    background: ${(props) => props.theme.primary};
    font: inherit;
    color: white;
    font-weight: 500;
  }
`

export const Controllers = styled.div`
  text-align: center;

  hr {
    border: 0;
    height: 1px;
    width: 100%;
    background: ${(props) => props.theme.primary};
    opacity: 0.75;
    margin-bottom: 1.75rem;
  }
`
export const ResultsFeedback = styled.div`
  margin: 1.75rem 0;

  font-weight: 500;
`
export const ErrorMessage = styled.div`
  color: ${(props) => props.theme.primary};
  font-weight: 500;
  margin-top: 1rem;
`
