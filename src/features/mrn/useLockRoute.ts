// hooks/useLockRoute.ts
import { useEffect } from 'react'

export function useLockRoute(active = true) {
  useEffect(() => {
    if (!active) return

    const push = () => window.history.pushState(null, '', window.location.href)
    push() // seed a state

    const onPopState = () => {
      push() // immediately push again to block back
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [active])
}
