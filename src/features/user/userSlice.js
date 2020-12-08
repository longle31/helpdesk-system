import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../../api/client';


export const fetchUser = createAsyncThunk('user/fetchUser', async (id)=>{
    const response = await client.get(`api/employees/${id}`);
    
    return response.employee;
});
export const updateUser = createAsyncThunk('user/updateUser', async (employee) =>{
    const response = await client.put(`api/employees/${employee._id}`, {employee: employee});
    return response.employee;
});
export const checkMail = async (email) => {
    const response = await client.get(`api/employees/email/check?email=${email}`);
    return response.error;
};
const initialState = {
   user:{},
   status: 'idle',
   error: null,
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        userUpdated : (state, action) =>{
            state = action.payload;
            return state;
        }

    },
    extraReducers:{
        [fetchUser.fulfilled]:(state, action)=>{
            state.user = action.payload;
            state.status = 'succeeded';
        },
        [fetchUser.pending] :(state, action) =>{
            state.status = 'loading';
        },
        [fetchUser.rejected] :(state, action) =>{
            state.status = 'failed';
        },
        [updateUser.fulfilled]:(state, action)=>{
            state.user = action.payload;
        }
    }
});

export const selectUser = state => state.user.user;
export default userSlice.reducer;