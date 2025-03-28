import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
const store = configureStore({
    reducer:{
        auth : authSlice,
        // post: postSlice // create this reducer -- TODO 1
    }
});

export default store