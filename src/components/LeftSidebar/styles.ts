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
  border-right: 1px solid ${(props) => props.theme.gray400};
  padding-top: 3rem;
  padding-left: 3rem;
  nav {
    margin-top: 2.5rem;
  }
  svg {
    transition: all 0.2s;
  }
`
export const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  svg {
    margin-right: 0.45rem;
  }
  span {
    font-weight: 700;
    font-size: 1.25rem;
    &::after {
      content: '.';
      color: ${(props) => props.theme.red400};
    }
  }
`
export const MenuTitle = styled.span`
  font-weight: 700;
  font-size: 0.95rem;
  text-transform: uppercase;
  color: ${(props) => props.theme.title};
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
    margin-left: 0.3rem;
    font-weight: 700;
    transition: all 0.2s;
  }
`
