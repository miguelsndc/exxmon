import styled, { keyframes } from 'styled-components'

type WrapperProps = {
  hasScrolled: boolean
}

const Fade = keyframes`
  from{
    opacity:0
  }
  to {
    opacity: 1
  }
`

export const Wrapper = styled.header<WrapperProps>`
  width: 100%;
  min-height: 10vh;
  padding: 1rem 1rem;

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
  cursor: pointer;
  color: ${(props) => props.theme.white};

  &:hover {
    color: ${(props) => props.theme.white};
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
    font-weight: 500;
  }
`

export const NavigationLinks = styled.div`
  position: absolute;

  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  text-align: center;
  background: ${(props) => props.theme.background};

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
`

export const DesktopMenu = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  @media (max-width: 768px) {
    display: none;
  }
`

export const MobileMenu = styled.div`
  font-size: 0;

  @media (min-width: 768px) {
    display: none;
  }
`

export const CloseMenu = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
`
