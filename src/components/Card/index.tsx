import { Wrapper, Overlay, Details, Rating } from './styles'

import { RiStarFill } from 'react-icons/ri'

import Image from 'next/image'

interface CardProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  name: string
  popularity: number
  backdropPath?: string
}

export function Card({ name, popularity, backdropPath, ...rest }: CardProps) {
  const myLoader = ({ src }) => {
    return `${src}`
  }

  console.log(backdropPath)

  return (
    <div {...rest}>
      <Wrapper>
        <Image loader={myLoader} layout="fill" src={`${backdropPath}`} />
        <Overlay />
        <Details>
          <span>{name}</span>
          <Rating>
            <h5>{popularity}</h5>
            <RiStarFill color="#F6C800" />
          </Rating>
        </Details>
      </Wrapper>
    </div>
  )
}

// <Details>
// <span>{name}</span>
// <Rating>
//   <h5>{popularity}</h5>
//   <RiStarFill color="#F6C800" />
// </Rating>
// </Details>
