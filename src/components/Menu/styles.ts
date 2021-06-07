import styled from 'styled-components'

type WrapperProps = {
  hasScrolled: boolean
}

export const Wrapper = styled.header<WrapperProps>`
  width: 100%;
  height: 8vh;
  padding: 0.5rem 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;

  transition: background 0.2s;

  background: ${(props) =>
    props.hasScrolled ? props.theme.background : 'transparent'};

  nav {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  svg {
    transition: all 0.2s;
  }
`
export const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    margin-right: 0.45rem;
  }

  span {
    font-weight: 700;
    font-size: 1.25rem;

    &::after {
      content: '.';
      color: ${(props) => props.theme.primary};
    }
  }
`
export const MenuTitle = styled.span`
  font-weight: 700;
  font-size: 0.95rem;
  text-transform: uppercase;
  color: ${(props) => props.theme.white};
`
export const MenuItem = styled.span`
  margin-right: 3rem;
  cursor: pointer;
  color: ${(props) => props.theme.white};

  &:hover {
    color: ${(props) => props.theme.white};
  }
`

export const NavigationLinks = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`

export const SearchForm = styled.form`
  input[type='text'] {
    border: 2px solid ${(props) => props.theme.white};
    outline: 0;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    font-weight: 500;

    font: inherit;
    color: white;

    background: transparent;
    margin-right: 1rem;

    &::placeholder {
      color: white;
    }
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
