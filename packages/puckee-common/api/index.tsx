export const API_BASE = 'http://192.168.0.188:5000//api'

export const axiosConfig = {
  headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
  },
  timeout: 500
}

export { fetchGames } from './game'
export { fetchAthletes } from './athlete'
export { fetchIceRinks } from './icerink'
export { fetchIceRinkById } from './icerink'




