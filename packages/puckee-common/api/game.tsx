import axios from 'axios'
import { useQuery } from "react-query"
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

export async function createGame()
{
  const response = await axios.post(`${API_BASE}/game`, )
}

export async function fetchGameById (gameId: string, userId: number, attendance: boolean)
{
  const response = await axios.get(`${API_BASE}/game/${gameId}?requesting_id=${userId}&attendance=${attendance}`, axiosConfig)
  return response.data
}

export const useFetchGameById = (gameId: string, userId: number, attendance: boolean) => useQuery(["game", gameId, userId], () => fetchGameById(gameId, userId, attendance));

export async function fetchGameParticipantsById (gameId: string, userId: number)
{
  const response = await axios.get(`${API_BASE}/game/${gameId}/participants?requesting_id=${userId}`, axiosConfig)
  return response.data
}