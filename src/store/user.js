import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

let initialState = null

try {
    const token = localStorage.getItem('minishopAccessToken')
    const userData = jwtDecode(token)
    initialState = userData
} catch {}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null
    },
    reducers: {
        addUser:(state, action) => {
            state.data = {...action.payload.userData}
        },
        removeUser: (state) => {
            state.data = null
        }        
    }
})

export default userSlice