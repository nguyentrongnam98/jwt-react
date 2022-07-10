import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:'user',
    initialState:{
        users:{
            allUsers:null,
            isFetching:false,
            error:false
        }
    },
    reducers:{
        getAllUsersStart: (state) => {
            state.users.isFetching = true
        },
        getAllUsersSuccess: (state,action) => {
            state.users.isFetching = false
            state.users.allUsers = action.payload
        },
        getAllUsersFailed: (state) => {
            state.users.isFetching = false
            state.users.error = true
        }
    }
})

export const { getAllUsersStart, getAllUsersSuccess, getAllUsersFailed } = userSlice.actions;

export default userSlice.reducer;