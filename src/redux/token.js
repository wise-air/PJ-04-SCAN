import { createSlice } from '@reduxjs/toolkit'
import {useSelector} from "react-redux";

export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        token: localStorage.getItem('token') || '',
        expire: localStorage.getItem('expire') || new Date().toString(),
    },
    reducers: {
        setToken: (state, action) => {
            const data = action.payload
            state.token = data.accessToken
            localStorage.setItem('token', data.accessToken)
            state.expire = data.expire
            localStorage.setItem('expire', data.expire)
        },
        clearToken: (state) => {
            state.token = ''
            localStorage.removeItem('token')
            state.expire = new Date().toString()
            localStorage.removeItem('expire')
        }
    }
})

export const useToken = () => {
    const token = useSelector((state) => state.token.token)
    const expire = useSelector((state) => state.token.expire)
    const expireDate = new Date(expire)
    const currentDate = new Date()
    if (currentDate >= expireDate) {
        return false
    }
    return token
}

export const { setToken, clearToken } = tokenSlice.actions

export default tokenSlice.reducer