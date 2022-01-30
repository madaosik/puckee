import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit'
// import { GiConsoleController } from 'react-icons/gi'
import { API_BASE, client } from 'puckee-common/api'
import { IGame } from 'puckee-common/types'
import { fetchToken } from '../../utils/auth'

const gamesAdapter = createEntityAdapter<IGame>()

export const fetchGames = createAsyncThunk('games/fetchAllGames', async () => {
    const customConfig = {headers: {'Authorization': `Bearer ${fetchToken()}`}}
    const response = await client.get(`${API_BASE}/game`, customConfig)
    return response.data
})

const gamesSlice = createSlice({
    name: 'games',
    initialState: gamesAdapter.getInitialState({
      status: 'idle',
      error: null
    }),
    reducers: {},
    extraReducers: {
          [fetchGames.pending.type]: (state, action) => {
            state.status = 'loading'
          },
          [fetchGames.fulfilled.type]: (state, action) => {
            state.status = 'succeeded'
            gamesAdapter.upsertMany(state, action.payload)
          },
          [fetchGames.rejected.type]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          },
      }
})

// Selectors
export const {
  selectAll: selectAllGames,
  selectById: selectGameById,
  selectIds: selectGameIds
} = gamesAdapter.getSelectors<any>(state => state.games)

// export const selectPostsByUser = createSelector(
//   [selectAllPosts, (state: RootState, userId: string) => userId],
//   (posts, userId) => posts.filter(post => post.user === userId)
// )

export default gamesSlice.reducer