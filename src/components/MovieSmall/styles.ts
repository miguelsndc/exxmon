import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  margin: 1.35rem 0;
  img {
    width: 5rem;
    height: 7rem;
    border-radius: 15px;
  }
`

export const MovieInfo = styled.div`
  margin-left: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h3 {
    font-weight: 600;
    font-size: 1.05rem;
    margin-bottom: 0.2rem;
  }
  span {
    font-weight: 500;
    font-size: 0.9rem;
    color: #4d4a59;
  }
  h5 {
    font-weight: 500;
  }
`

export const Rating = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 2.8rem;
    height: 2.8rem;
    margin-right: 8px;
    border-radius: 4px;
  }
`
