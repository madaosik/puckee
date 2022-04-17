import axios from 'axios'
import { API_BASE, axiosConfig } from '.'

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