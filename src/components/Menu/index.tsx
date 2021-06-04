import { Wrapper, Logo, MenuTitle, MenuItem } from './styles'

import Link from 'next/link'

import {
  RiMovie2Line,
  RiHomeFill,
  RiCompass4Fill,
  RiTimerFlashLine,
} from 'react-icons/ri'

import { BiTrendingUp } from 'react-icons/bi'

export function Menu() {
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
          <MenuItem>
            <RiHomeFill color={'#5c5d63'} size="1.5rem" />
            <span>Home</span>
          </MenuItem>
        </Link>
        <Link href="/movies/popular">
          <MenuItem>
            <BiTrendingUp color={'#5c5d63'} size="1.5rem" />
            <span>Popular</span>
          </MenuItem>
        </Link>
        <Link href="/movies/discover">
          <MenuItem>
            <RiCompass4Fill color={'#5c5d63'} size="1.5rem" />
            <span>Discovery</span>
          </MenuItem>
        </Link>
        <MenuItem>
          <RiTimerFlashLine color={'#5c5d63'} size="1.5rem" />
          <span>Coming Soon</span>
        </MenuItem>
      </nav>
    </Wrapper>
  )
}
