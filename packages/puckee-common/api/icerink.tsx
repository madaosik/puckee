import axios from 'axios'
import { API_BASE, axiosConfig } from '.'

export async function fetchIceRinks ()
{
  const response = await axios.get(`${API_BASE}/icerink`, axiosConfig)
  return response.data
}