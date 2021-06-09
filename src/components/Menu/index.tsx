import {
  Wrapper,
  Logo,
  MenuItem,
  NavigationLinks,
  MobileMenu,
  CloseMenu,
  DesktopMenu,
} from './styles'

import Link from 'next/link'

import { RiMovie2Line, RiMenu3Fill, RiCloseCircleLine } from 'react-icons/ri'

import { DarkTheme } from '../../styles/themes/dark'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export function Menu() {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const router = useRouter()

  function scroll() {
    if (window.scrollY > 200) {
      setHasScrolled(true)
    } else {
      setHasScrolled(false)
    }
  }

  function toggleMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  function redirect(path: string) {
    setIsMobileMenuOpen(false)
    router.push(path)
  }

  useEffect(() => {
    window.addEventListener('scroll', scroll)

    return () => {
      window.removeEventListener('scroll', scroll)
    }
  }, [])

  return (
    <Wrapper hasScrolled={hasScrolled}>
      <nav>
        <Link href="/">
          <Logo>
            <RiMovie2Line color={DarkTheme.primary} size="2rem" />
            <span>Exxmon</span>
          </Logo>
        </Link>
        <MobileMenu onClick={toggleMenu}>
          <RiMenu3Fill size={'2rem'} color={DarkTheme.primary} />
        </MobileMenu>

        <DesktopMenu>
          <Link href="/">
            <MenuItem>Home</MenuItem>
          </Link>
          <Link href="/movies/popular">
            <MenuItem>Popular</MenuItem>
          </Link>

          <Link href="/movies/search">
            <MenuItem>Search</MenuItem>
          </Link>
        </DesktopMenu>

        {isMobileMenuOpen && (
          <NavigationLinks>
            <CloseMenu>
              <RiCloseCircleLine
                onClick={toggleMenu}
                size={'2rem'}
                color={DarkTheme.primary}
              />
            </CloseMenu>

            <MenuItem onClick={() => redirect('/')}>Home</MenuItem>

            <MenuItem onClick={() => redirect('/movies/popular')}>
              Popular
            </MenuItem>

            <MenuItem onClick={() => redirect('/movies/search')}>
              Search
            </MenuItem>
          </NavigationLinks>
        )}
      </nav>
    </Wrapper>
  )
}
