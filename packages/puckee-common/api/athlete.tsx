import axios from 'axios'
import { API_BASE, axiosConfig } from '.'
import { useQuery } from "react-query"
import { AthleteRole } from '../types'

interface FetchAllPlayersProps {
    queryKey: [queryName: string, userId: number]
    pageParam: number
  }
  
export async function fetchAthletes ({queryKey, pageParam = 1} : FetchAllPlayersProps)
{
    const response = await axios.get(`${API_BASE}/athlete?page_id=${pageParam}&per_page=10&requesting_id=${queryKey[1]}`, axiosConfig)
    return {
        items: response.data.data,
        previous_id: response.data.previous_id,
        next_id: response.data.next_id
    }
}

export async function searchAthleteByNameAndRole (name: string, role: AthleteRole, requestingId: number)
{
  const response = await axios.get(
        `${API_BASE}/athlete/search?name=${name}&role_id=${role}&requesting_id=${requestingId}&followers_only=1&opt_out_mode=1`,
        axiosConfig
        )
  return response.data
}


export default function useAthleteFollowersSearch(name: string, role: AthleteRole, requestingId: number) {
    return useQuery(["game", name, role, requestingId], () => searchAthleteByNameAndRole(name, role, requestingId),
              {
                refetchOnWindowFocus: false,
                enabled: Boolean(name)
              }
            )
}