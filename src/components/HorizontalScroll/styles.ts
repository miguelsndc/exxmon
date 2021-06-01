import styled from 'styled-components'

export const Wrapper = styled.div`
  margin: 1rem 0;
  &::-webkit-scrollbar {
    display: none;
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

export const Items = styled.div`
  display: flex;
  overflow-x: scroll;
  scroll-behavior: smooth;
  transition: scroll 0.2s;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const Controllers = styled.div`
  display: flex;
  align-items: center;
`

export const RoundedButton = styled.button`
  background: transparent;
  border: 2px solid white;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.5rem;
  transition: background 0.2s;
  &:hover {
    background: white;
    svg {
      // icon
      fill: ${(props) => props.theme.gray400};
      transition: fill 0.2s;
    }
  }
`
