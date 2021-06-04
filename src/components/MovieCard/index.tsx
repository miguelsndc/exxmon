import { Card, Overlay, MovieInfo } from './styles'

import Link from 'next/link'
import Image from 'next/image'

interface MovieCardProps {
  title: string
  id: number
  posterPath: string
  rating: number
}

export function MovieCard({ title, posterPath, rating, id }: MovieCardProps) {
  const posterLoader = ({ src }) => {
    return `https://image.tmdb.org/t/p/w500${src}`
  }

  return (
    <Link href={`/movies/${id}`}>
      <Card hasPoster={!!posterPath}>
        <Overlay />
        {posterPath ? (
          <Image
            loader={posterLoader}
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            layout="fill"
          />
        ) : (
          <strong>Poster not available.</strong>
        )}
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
