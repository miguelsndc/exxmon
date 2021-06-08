import { Wrapper, Overlay, Details, Rating } from './styles'

import { RiStarFill } from 'react-icons/ri'

import Image from 'next/image'
import { useRouter } from 'next/router'

interface CardProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  name: string
  popularity: number
  backdropPath?: string
  path?: string
}

export function Card({
  name,
  popularity,
  backdropPath,
  path,
  ...rest
}: CardProps) {
  const router = useRouter()

  const myLoader = ({ src }) => {
    return `${src}`
  }

  return (
    <div {...rest} onClick={() => router.push(path)}>
      <Wrapper hasPoster={!!backdropPath}>
        <Image
          loader={myLoader}
          layout="fill"
          src={`${backdropPath}`}
          objectFit="cover"
        />
        <Overlay />
        <Details>
          <span>{name.length > 25 ? `${name.slice(0, 20)}...` : name}</span>
          <Rating>
            <h5>{popularity}</h5>
            <RiStarFill color="#F6C800" />
          </Rating>
        </Details>
      </Wrapper>
    </div>
  )
}
