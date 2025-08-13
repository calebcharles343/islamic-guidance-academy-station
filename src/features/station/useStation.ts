import { useQuery } from '@tanstack/react-query'
import { getStation } from '../../services/apiAuth'

export function useStation(id: any) {
  return useQuery<any, Error>({
    queryKey: ['station', id],
    queryFn: () => getStation(id as any),
    staleTime: 0,
  })
}
