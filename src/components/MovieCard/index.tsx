import { Card, Overlay, MovieInfo } from './styles'

import Link from 'next/link'

interface MovieCardProps {
  title: string
  id: number
  posterPath: string
  rating: number
}

export function MovieCard({ title, posterPath, rating, id }: MovieCardProps) {
  return (
    <Link href={`/movies/${id}`}>
      <Card posterPath={`https://image.tmdb.org/t/p/w500/${posterPath}`}>
        <Overlay />
        <MovieInfo>
          <span>{title}</span>
          <div>
            <img src="/assets/images/imdb.svg" alt="imdb" />
            <span>{rating}</span>
          </div>
        </MovieInfo>
      </Card>
    </Link>
  )
}
