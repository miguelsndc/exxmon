import { GetStaticProps } from 'next'

import { FeaturedMovie } from '../components/FeaturedMovie'
import { Container } from '../styles/globals'
import { Card } from '../components/Card'
import { HorizontalScrollSection } from '../components/HorizontalScroll'
import { api } from '../services/api'
import { MovieDetails, Genre } from '../types/Movie'
import { ArtistResponse } from '../types/Artist'

interface Artist {
  id: number
  name: string
  profilePath: string
  popularity: number
}

interface FeaturedMovie {
  backdropPath: string
  title: string
  genres: Genre[]
}

interface FeedProps {
  featuredMovie: FeaturedMovie
  mostPopularArtists: Artist[]
}

export default function Feed({ featuredMovie, mostPopularArtists }: FeedProps) {
  return (
    <Container>
      <FeaturedMovie
        backdropPath={featuredMovie?.backdropPath}
        originalTitle={featuredMovie?.title}
        genres={featuredMovie?.genres}
      />

      <HorizontalScrollSection title="Best Artists">
        {mostPopularArtists?.map((artist) => {
          return (
            <Card
              key={artist.id}
              name={artist.name}
              backdropPath={artist.profilePath}
              popularity={artist.popularity}
            />
          )
        })}
      </HorizontalScrollSection>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const featuredMovieResponse = await api.get<MovieDetails>('/movie/299536')
  const mostPopularArtistResponse = await api.get<ArtistResponse>(
    '/person/popular'
  )

  const featuredMovie = {
    backdropPath: featuredMovieResponse.data.backdrop_path,
    title:
      featuredMovieResponse.data.title ||
      featuredMovieResponse.data.original_title,
    genres: featuredMovieResponse.data.genres,
  }

  const mostPopularArtists = mostPopularArtistResponse.data.results.map(
    (artist) => {
      return {
        id: artist.id,
        name: artist.name,
        profilePath: artist.profile_path,
        popularity: artist.popularity,
      }
    }
  )

  return {
    props: { featuredMovie, mostPopularArtists },
  }
}
