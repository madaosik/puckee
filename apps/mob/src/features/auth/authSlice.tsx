import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import * as SecureStore from 'expo-secure-store';
import { client } from 'puckee-common/api'
// import { useAppDispatch } from '../../redux/store';
// import { Athlete } from 'puckee-common/types';
import { storeToken, removeToken } from '../../utils/auth';

import { API_BASE } from 'puckee-common/api';

export type Credentials = {
    email: string,
    password: string
}

export const login = createAsyncThunk('auth/login', async (cred: Credentials) => {
    const response = await client.post(`${API_BASE}/auth/login`, cred);
    await storeToken(response.data.access_token);
    return response.data;
});

export const signOut = createAsyncThunk('auth/signOut', async () => {
    await removeToken()
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
        // [signOut.pending.type]: (state, action) => {
        //     state.status = 'loading'
        // },
        [signOut.fulfilled.type]: (state, action) => {
            state.status = 'succeeded';
            // state.userData = {};
            state.token = null;
            // state.userData = {}
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