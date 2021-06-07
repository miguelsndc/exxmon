import styled from 'styled-components'

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

export const Filters = styled.div``
