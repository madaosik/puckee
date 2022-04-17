import axios from 'axios'
import { API_BASE, axiosConfig } from '.'

export async function fetchGames ({pageParam = 5})
{
  const response = await axios.get(`${API_BASE}/game?page_id=${pageParam}&per_page=10`, axiosConfig)
  return {
    items: response.data.data,
    previous_id: response.data.previous_id,
    next_id: response.data.next_id
  }
}