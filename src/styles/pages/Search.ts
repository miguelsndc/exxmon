import styled from 'styled-components'

export const Controllers = styled.div`
  text-align: center;

  hr {
    border: 0;
    height: 1px;
    background: ${(props) => props.theme.red400};
    opacity: 0.75;
    margin-bottom: 1.75rem;
  }
`
export const ResultsFeedback = styled.div`
  margin: 1.75rem 0;

  font-weight: 500;
`
export const ErrorMessage = styled.div`
  color: ${(props) => props.theme.red400};
  font-weight: 500;
  margin-top: 1rem;
`
