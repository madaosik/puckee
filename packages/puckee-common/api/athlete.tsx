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

export async function searchAthleteByName (name: string, role: AthleteRole)
{
  const response = await axios.get(`${API_BASE}/athlete/search?name=${name}&role_id=${role}`, axiosConfig)
  return response.data
}


export default function useAthleteSearch(name: string, role: AthleteRole) {
    return useQuery(["game", name, role], () => searchAthleteByName(name, role),
              {
                refetchOnWindowFocus: false,
                enabled: Boolean(name)
              }
            )
}