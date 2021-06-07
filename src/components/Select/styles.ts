import styled from 'styled-components'

interface SelectedValueProps {
  areOptionsShown: boolean
}

export const SelectControl = styled.div`
  width: 400px;
`

export const Options = styled.div`
  border-radius: 10px;
  background: ${(props) => props.theme.background};

  box-shadow: 0px 0px 10px 4px #101317;
`

export const Option = styled.div`
  width: 100%;
  padding: 0.6rem 1rem;
  font-weight: 500;

  user-select: none;
  cursor: pointer;

  &:hover {
    background: #101317;
  }

  &:first-child {
    padding-top: 0.75rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  &:last-child {
    padding-bottom: 0.75rem;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`

export const SelectedValue = styled.div<SelectedValueProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 1rem 0;
  border-radius: 10px;
  border: 2px solid
    ${(props) => (props.areOptionsShown ? props.theme.primary : '#ededed')};
  padding: 0.6rem;
  font-weight: 500;

  transition: all 0.2s;
  cursor: pointer;

  svg {
    transition: fill 0.2s;
  }

  &:hover {
    border: 2px solid ${(props) => props.theme.primary};

    svg {
      fill: ${(props) => props.theme.primary};
    }
  }
`
