import { ReactNode, useRef } from 'react'
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri'
import { Wrapper, Items, Controllers, RoundedButton } from './styles'

interface HorizontalScrollSectionProps {
  children: ReactNode
  title: string
}

export function HorizontalScrollSection({
  children,
  title,
}: HorizontalScrollSectionProps) {
  const itemsRef = useRef<HTMLDivElement>(null)

  function scrollTo(direction: string) {
    const containerWidth = itemsRef.current!.offsetWidth

    switch (direction) {
      case 'right':
        itemsRef.current!.scrollLeft += containerWidth / 2
        break
      case 'left':
        itemsRef.current!.scrollLeft -= containerWidth / 2
        break
      default:
        break
    }
  }

  function scrollLeft() {
    scrollTo('left')
  }

  function scrollRight() {
    scrollTo('right')
  }

  return (
    <Wrapper>
      <header>
        <h3>{title}</h3>
        <Controllers>
          <RoundedButton onClick={scrollLeft}>
            <RiArrowLeftSLine size="1.65rem" color="#fff" />
          </RoundedButton>
          <RoundedButton onClick={scrollRight}>
            <RiArrowRightSLine size="1.65rem" color="#fff" />
          </RoundedButton>
        </Controllers>
      </header>
      <Items ref={itemsRef}>{children}</Items>
    </Wrapper>
  )
}
