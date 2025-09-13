import { createSlice } from '@reduxjs/toolkit'

// Get user details from local storage
const initialUserState = {
    _id: '',
    name: '',
    email: '',
    password: '',
    avatar: '',
    refreshToken: '',
    lastLogin: '',
    role: ''
}

// Create user slice
export const userSlice = createSlice({
    name: 'user_data',
    initialState: initialUserState,
    reducers: {
        setUserDetails: (state, action) => { 
            state._id = action.payload?._id
            state.name = action.payload?.name
            state.email = action.payload?.email
            state.password = action.payload?.password
            state.avatar = action.payload?.avatar
            state.refreshToken = action.payload?.refreshToken
            state.lastLogin = action.payload?.lastLogin
            state.role = action.payload?.role
        },
        setLogout: (state) => { 
            state._id = ''
            state.name = ''
            state.email = ''
            state.password = ''
            state.avatar = ''
            state.refreshToken = ''
            state.lastLogin = ''
            state.role = ''
        }
    }
})

export const { setUserDetails, setLogout } = userSlice.actions

export default userSlice.reducer