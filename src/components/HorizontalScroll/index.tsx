import Link from 'next/link'

import { ReactNode, useRef } from 'react'
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri'
import { Wrapper, Items, RoundedButton } from './styles'

enum Directions {
  Left = 'left',
  Right = 'right',
}

interface HorizontalScrollSectionProps {
  children: ReactNode
  title: string
  path: string
}

export function HorizontalScrollSection({
  children,
  title,
  path,
}: HorizontalScrollSectionProps) {
  const itemsRef = useRef<HTMLDivElement>(null)

  function scrollTo(direction: string) {
    const containerWidth = itemsRef.current!.offsetWidth

    switch (direction) {
      case Directions.Right:
        itemsRef.current!.scrollLeft += containerWidth / 1.5
        break
      case Directions.Left:
        itemsRef.current!.scrollLeft -= containerWidth / 1.5
        break
      default:
        break
    }
  }

  function scrollLeft() {
    scrollTo(Directions.Left)
  }

  function scrollRight() {
    scrollTo(Directions.Right)
  }

  return (
    <Wrapper>
      <header>
        <h2>{title}</h2>
        <Link href={path}>
          <button>See all</button>
        </Link>
      </header>
      <div>
        <RoundedButton onClick={scrollLeft} align="left">
          <RiArrowLeftSLine size="1.65rem" color="#fff" />
        </RoundedButton>
        <RoundedButton onClick={scrollRight} align="right">
          <RiArrowRightSLine size="1.65rem" color="#fff" />
        </RoundedButton>
        <Items ref={itemsRef}>{children}</Items>
      </div>
    </Wrapper>
  )
}
