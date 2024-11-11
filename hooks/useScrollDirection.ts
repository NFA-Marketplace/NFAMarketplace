import { useState, useEffect } from 'react'

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const threshold = 10
  let previousScroll = 0

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset
      if (Math.abs(currentScroll - previousScroll) < threshold) {
        return
      }
      setScrollDirection(currentScroll > previousScroll ? 'down' : 'up')
      previousScroll = currentScroll
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollDirection
}