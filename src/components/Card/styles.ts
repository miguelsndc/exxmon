import styled from 'styled-components'

interface WrapperProps {
  hasPoster: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  background: ${(props) => props.hasPoster && 'black'};
  position: relative;
  padding: 1rem;
  margin: 1rem 0.5rem;
  min-width: 12rem;
  height: 16rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  cursor: pointer;
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${(props) => props.theme.background};
  opacity: 0.45;
  transition: opacity 0.2s;
`

export const Details = styled.div`
  text-align: center;
  z-index: 9;
  span {
    font-weight: 500;
    font-size: 1.2rem;
  }
`

export const Rating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.25rem;
  h5 {
    font-weight: 500;
    font-size: 1rem;
    margin-right: 7px;
  }
`
