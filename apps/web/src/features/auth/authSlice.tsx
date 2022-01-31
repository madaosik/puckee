import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setToken, removeToken } from '../../utils/auth';
import { API_BASE, client } from 'puckee-common/api'
import { IAthlete } from 'puckee-common/types';
import { Athlete } from 'puckee-common/types';
// import * as SecureStore from 'expo-secure-store'
import env from 'react-dotenv'

// import { MdEmail } from 'react-icons/md';

// export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (_, {rejectWithValue}) => {
//     try {
//         const accessToken = getToken();
//         const customConfig = {headers: {'Authorization': `Bearer ${accessToken}`}}
//         const response = await client.get('/user', customConfig);
//         return {...response.data, accessToken};
//     } catch (e){
//         removeToken();
//         return rejectWithValue('');
//     }
// });

// const token = await fetchToken()
// if (token) {
//   headers.Authorization = `Bearer ${token}`
// }


export type Credentials = {
    email: string,
    password: string
}

export const login = createAsyncThunk('auth/login', async (cred: Credentials) => {
    const response = await client.post(API_BASE + '/auth/login', cred);
    setToken(response.data.access_token)
    // history.push('/home');
    return response.data;
});

export const signUp = createAsyncThunk('auth/signup', async () => {
    return "cus"
})

export const signOut = createAsyncThunk('auth/signOut', async () => {
    removeToken();
});

const initialState = {
    token: null,
    status: 'idle',
    userData: {} as IAthlete
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [signOut.fulfilled.type]: (state, action) => {
            state.status = 'succeeded';
            state.userData = Athlete.emptyAthlete();
            state.token = null;
        },
        [login.pending.type]: (state, action) => {
            state.status = 'loading'
        },
        [login.fulfilled.type]: (state, action) => {
            // const {accessToken, user} = action.payload;
            state.token = action.payload.access_token
            state.userData = action.payload.athlete;
            state.status = 'succeeded'
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


// export const {} = authSlice.actions;

export default authSlice.reducer;