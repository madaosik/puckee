import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
    createSelector
  } from '@reduxjs/toolkit'
  import { RootState } from '../../redux/store'
  import { client } from '../../api'
  import { AccessToken, IGame } from '../../types'
  import { API_BASE } from '../../api';
  import { format, addDays } from 'date-fns';
//   import { fetchToken } from '../../utils/auth';
  
  const gamesAdapter = createEntityAdapter<IGame>()
  
  // Thunk (Async Dispatch)
  export const fetchGames = createAsyncThunk('games/fetchGames', async (token: AccessToken) => {
    // const today = format(Date.now(), "yyyy-MM-dd")
    // const nextWeekDay = format(addDays(Date.now(), 7) , "yyyy-MM-dd")
    // const response = await client.get(`${API_BASE}/game/date?start_date=${today}&end_date=${nextWeekDay}`)
    const customConfig = {headers: {'Authorization': `Bearer ${token}`}}
    console.log(customConfig)
    const response = await client.get(`${API_BASE}/game`, customConfig)
    return response.data
  })
  
  const gamesSlice = createSlice({
    name: 'games',
    initialState: gamesAdapter.getInitialState({
      status: 'idle',
      error: null,
      activeFilters: {myAttended: false, myOrganized: false, BySkill: {skillFilter: false, skillMinVal:0}}
    }),
    reducers: {
      toggleMyAttFilter: (state) => {
        state.activeFilters.myAttended = !state.activeFilters.myAttended
      },
      toggleMyOrgFilter: (state) => {
        state.activeFilters.myOrganized = !state.activeFilters.myOrganized
      },
      toggleBySkillFilter: (state) => {
        state.activeFilters.BySkill.skillFilter = !state.activeFilters.BySkill.skillFilter
      },
      setReqSkillLevelValue: (state, action) => {
        state.activeFilters.BySkill.skillMinVal = action.payload
      },
    },
    extraReducers: {
      [fetchGames.pending.type]: (state, action) => {
        state.status = 'loading'
      },
      [fetchGames.fulfilled.type]: (state, action) => {
        state.status = 'succeeded'
        // Add any fetched games to the array
        // Use the `upsertMany` reducer as a mutating update utility
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
    selectIds: selectGameIds,
  
  } = gamesAdapter.getSelectors<any>(state => state.games)
  
  
  export const selectGamesByAttendeeId = createSelector(
    [selectAllGames, (state: RootState, userId: number) => userId],
    (games, userId) => games.filter(game => game.players.some(p => p.id == userId))
  )
  
  export const selectGamesByOrganizerId = createSelector(
    [selectAllGames, (state: RootState, userId: number) => userId],
    (games, userId) => games.filter(game => game.organizers.some(p => p.id == userId))
  )
  
  export const selectGamesBySkillLevel = createSelector(
    [selectAllGames, (state: RootState, perfLevel: number) => perfLevel],
    (games, perfLevel) => games.filter(game => game.exp_level >= perfLevel))
  
  export const { toggleMyAttFilter, toggleMyOrgFilter, toggleBySkillFilter, setReqSkillLevelValue } = gamesSlice.actions;
  export default gamesSlice.reducer
  