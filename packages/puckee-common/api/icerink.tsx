import axios from 'axios'
import { API_BASE, axiosConfig } from '.'

export async function fetchIceRinks()
{
  const response = await axios.get(`${API_BASE}/icerink`, axiosConfig)
  return response.data
}

export async function fetchIceRinkById (icerinkId: number)
{
  const response = await axios.get(`${API_BASE}/icerink/${icerinkId}`, axiosConfig)
  return response.data
}