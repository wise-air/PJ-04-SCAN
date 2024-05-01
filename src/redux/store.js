import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from './token'
import request from "./request";

export default configureStore({
    reducer: {
        token: tokenReducer,
        request: request,
    },
})

