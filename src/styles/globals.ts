import styled, { createGlobalStyle } from 'styled-components'

export const Container = styled.div`
  width: 100%;
  padding: 2rem 4rem;
  height: 100vh;
  border-right: 1px solid ${(props) => props.theme.gray400};
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }
  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #16181c;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Montserrat', sans-serif;
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.white}
  }
  @media (max-width: 1366px) {
    html {
      font-size: 93.75%;
    }
  }
  @media (max-width: 1080px) {
    html {
      font-size: 87.5%;
    }
  }
  button {
      cursor: pointer;
    }
    
    a {
      color: inherit;
      text-decoration: none;
    }
`

export const FlexCenterX = styled.div`
  display: flex;
  justify-content: center;
`
