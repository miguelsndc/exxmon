import styled from 'styled-components'

type ButtonProps = {
  align?: 'left' | 'right'
}

export const Wrapper = styled.div`
  margin: 1rem 0;

  &::-webkit-scrollbar {
    display: none;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 3rem;

    button {
      background: transparent;
      border: 0;
      outline: 0;
      font: inherit;
      color: ${(props) => props.theme.primary};

      &:hover {
        text-decoration: underline;
      }
    }
  }

  & > div {
    position: relative;
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

  &:first-child {
    margin-left: 1rem;
  }
`

export const Controllers = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 9;
  position: absolute;
  width: 96%;
`

export const RoundedButton = styled.button<ButtonProps>`
  position: absolute;
  border: 2px solid white;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.5rem;
  transition: filter 0.2s;
  background: white;
  z-index: 9;

  top: 50%;
  left: ${(props) => props.align === 'left' && '3%'};
  right: ${(props) => props.align === 'right' && '0'};
  transform: translate(-50%, -50%);

  svg {
    // icon
    fill: ${(props) => props.theme.gray400};
    transition: fill 0.2s;
  }

  &:hover {
    filter: brightness(0.9);
  }
`
