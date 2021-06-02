import { Wrapper, Logo, MenuTitle, MenuOption } from './styles'

import Link from 'next/link'

import {
  RiMovie2Line,
  RiHomeFill,
  RiCompass4Fill,
  RiTimerFlashLine,
} from 'react-icons/ri'

import { BiTrendingUp } from 'react-icons/bi'

export function LeftSidebar() {
  return (
    <Wrapper>
      <Link href="/">
        <Logo>
          <RiMovie2Line color={'#d22f27'} size="2rem" />
          <span>Exxmon</span>
        </Logo>
      </Link>
      <MenuTitle>menu</MenuTitle>
      <nav>
        <Link href="/">
          <MenuOption>
            <RiHomeFill color={'#5c5d63'} size="1.5rem" />
            <span>Home</span>
          </MenuOption>
        </Link>
        <Link href="/movies/popular">
          <MenuOption>
            <BiTrendingUp color={'#5c5d63'} size="1.5rem" />
            <span>Popular</span>
          </MenuOption>
        </Link>
        <MenuOption>
          <RiCompass4Fill color={'#5c5d63'} size="1.5rem" />
          <span>Discovery</span>
        </MenuOption>
        <MenuOption>
          <RiTimerFlashLine color={'#5c5d63'} size="1.5rem" />
          <span>Coming Soon</span>
        </MenuOption>
      </nav>
    </Wrapper>
  )
}
