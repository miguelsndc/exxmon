import styled, { keyframes } from 'styled-components'

const Fade = keyframes`
  from {
    opacity: 0;
  } 
  to {
    opacity: 1;
  }
`

export const Wrapper = styled.aside`
  width: 16vw;
  height: 100vh;
  padding: 3rem;
  svg {
    transition: all 0.2s;
  }
`
export const SearchMovieForm = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  border: 2px solid #5c5d63;
  padding: 0.45rem;
  border-radius: 30px;
  span {
    font-weight: 700;
    font-size: 1.25rem;
    &::after {
      content: '.';
      color: ${(props) => props.theme.red400};
    }
  }
  input {
    outline: 0;
    border: 0;
    font: inherit;
    font-weight: 600;
    color: white;
    background: transparent;
    margin-left: 0.2rem;
  }
`
export const MenuTitle = styled.span`
  font-weight: 700;
  color: white;
`
export const MenuOption = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  padding: 1rem 0;
  cursor: pointer;
  color: ${(props) => props.theme.text};
  position: relative;
  &:hover {
    svg {
      fill: ${(props) => props.theme.red400};
    }
    span {
      color: ${(props) => props.theme.white};
    }
    &::after {
      content: '';
      position: absolute;
      right: 0;
      width: 0.4rem;
      height: 2rem;
      background: ${(props) => props.theme.red400};
      animation: ${Fade} 0.2s;
    }
  }
  span {
    margin-left: 0.45rem;
    font-weight: 700;
    transition: all 0.2s;
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
  width: 100%;
  background: ${(props) => props.theme.red400};
  padding: 1rem 2.25rem;
`
