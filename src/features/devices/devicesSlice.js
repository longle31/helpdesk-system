import { client } from "../../api/client";

const { createSlice, createEntityAdapter, createAsyncThunk } = require("@reduxjs/toolkit");
const deviceAdapter = createEntityAdapter({
    selectId: device => device._id
});

export const getDevicesByEmployeeId = createAsyncThunk('devices/fetchDevices' ,async (id)=>{
    const response =await client.get(`api/employees/${id}/devices`);
   
    return response.devices;
});

export const  fetchDevices = createAsyncThunk('devices/fetchDevise', async () =>{
    const response = await client.get(`api/devices`);
    return response.devices;
})


const initialState = deviceAdapter.getInitialState({
    status: 'idle',
    error: null,
});

const devicesSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {

    },
    extraReducers:{
        [getDevicesByEmployeeId.pending]:(state, action)=>{
            state.status = 'loading';
        },
        [getDevicesByEmployeeId.rejected]:(state, action)=>{
            state.status = 'failed';
        },
        [getDevicesByEmployeeId.fulfilled]:(state, action)=>{
            state.status = 'succeeded';
            deviceAdapter.upsertMany(state, action.payload);
        }
    }
});
export const {
    selectAll : selectAllDevices,
    selectById: selectDeviceById,
} = deviceAdapter.getSelectors(state => state.devices);
export default devicesSlice.reducer;