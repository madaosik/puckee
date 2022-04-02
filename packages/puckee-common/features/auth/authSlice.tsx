import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import * as SecureStore from 'expo-secure-store';
import { client } from 'puckee-common/api'
// import { useAppDispatch } from '../../redux/store';
// import { Athlete } from 'puckee-common/types';
// import { storeToken, removeToken } from '../../utils/auth';
import { Credentials } from '../../types';
import { API_BASE } from 'puckee-common/api';
// import GameDetailsChat from '../../../../apps/mob/src/features/games/GameDetailsChat';
// import * as SecureStore from 'expo-secure-store';
// import history from '../../routes/history';
// import history from 'puckee-web/src/routes/history'

export const login = createAsyncThunk('auth/login', async (cred: Credentials) => {
    console.log(`logging in to ${API_BASE}/auth/login`)
    const response = await client.post(`${API_BASE}/auth/login`, cred);
    return response.data;
});

// export const signOut = createAsyncThunk('auth/signOut', async () => {
    // await SecureStore.deleteItemAsync('secure_token')
// });

// export const loginLocalStorage = createAsyncThunk('auth/login', async (cred: Credentials) => {
//     const response = await client.post(API_BASE + '/auth/login', cred);
//     await localStorage.setItem('access_token', response.data.access_token);
//     // setToken(response.data.access_token)
//     history.push('/home');
//     return response.data;
// });

// export const signUp = createAsyncThunk('auth/signup', async () => {
//     return "cus"
// })

export const signOut = createAsyncThunk('auth/signOut', async () => {
    localStorage.removeItem('jwt');
}); 

const initialState = {
    token: null,
    status: 'idle',
    userData: {}
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [signOut.pending.type]: (state, action) => {
            state.status = 'loading'
        },
        [signOut.fulfilled.type]: (state, action) => {
            state.status = 'succeeded';
            state.userData = {};
            state.token = null;
            state.userData = {}
        },
        [login.pending.type]: (state, action) => {
            state.status = 'loading'
        },
        [login.fulfilled.type]: (state, action) => {
            // const {accessToken, user} = action.payload;
            state.token = action.payload.access_token
            state.status = 'succeeded'
            state.userData = action.payload.athlete
        },
        [login.rejected.type]: (state, action) => {
            state.status = 'failed'
        },
        // [fetchUserData.pending.type]: (state, action) => {
        //     state.status = 'loading'
        // },
        // [fetchUserData.fulfilled.type]: (state, action) => {
        //     const {accessToken, user} = action.payload;
        //     state.token = accessToken;
        //     state.userData = user;
        //     state.status = 'succeeded'
        // },
        // [fetchUserData.rejected.type]: (state, action) => {
        //     state.status = 'failed'
        //     state.userData = {};
        //     state.token = null;
        // }
    },
})


export const {} = authSlice.actions;

export default authSlice.reducer;