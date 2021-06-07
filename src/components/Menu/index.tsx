import { Wrapper, Logo, MenuItem, NavigationLinks, SearchForm } from './styles'

import Link from 'next/link'

import { RiMovie2Line } from 'react-icons/ri'
import { useForm } from 'react-hook-form'
import { DarkTheme } from '../../styles/themes/dark'
import { useEffect, useState } from 'react'

type FormData = {
  query: string
}

export function Menu() {
  const { register, handleSubmit } = useForm<FormData>()
  const [hasScrolled, setHasScrolled] = useState(false)

  function searchMovie(data: FormData) {
    console.log(data)
  }

  function scroll() {
    if (window.scrollY > 200) {
      setHasScrolled(true)
    } else {
      setHasScrolled(false)
    }
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
        <NavigationLinks>
          <div>
            <Link href="/">
              <MenuItem>Home</MenuItem>
            </Link>
            <Link href="/movies/popular">
              <MenuItem>Popular</MenuItem>
            </Link>
            <Link href="/movies/discover">
              <MenuItem>Discovery</MenuItem>
            </Link>
          </div>
          <SearchForm onSubmit={handleSubmit(searchMovie)}>
            <input
              type="text"
              placeholder="Search"
              {...register('query', { required: true })}
            />
          </SearchForm>
        </NavigationLinks>
      </nav>
    </Wrapper>
  )
}
