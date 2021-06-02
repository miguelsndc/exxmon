import { useEffect, useRef, useState } from 'react'

export function useElementOnScreen(options: IntersectionObserverInit) {
  const elementRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries
      setIsVisible(entry.isIntersecting)
    })

    if (elementRef.current) observer.observe(elementRef.current)

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current)
    }
  }, [elementRef, options])

  return { elementRef, isVisible }
}
