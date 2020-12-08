import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {client} from '../../api/client';

const reportsAdapter = createEntityAdapter({
    selectId : report => report._id,

});

export const fetchReports = createAsyncThunk('reports/fetchReports', async () =>{
    const response = await client.get(`api/reports`);
    return response.reports;
});
export const deleteReport = createAsyncThunk('reports/deleteReport', async (id)=>{
    const response = await client.delete(`api/reports/${id}`);
    return response.report;
});
export const addNewReport = createAsyncThunk('reports/addNewReport',async (report)=>{
    const response = await client.post('api/reports',{report});
    return response.report;
})
export const checkReportStatus = async (id, dispatch)=>{
    const response = await client.get(`api/reports/${id}/status`);
    return response.status;
};



const initialState = reportsAdapter.getInitialState({
    status : 'idle',
    error: null,
    filters:{

    }
});
const reportsSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {
        
    },
    extraReducers:{
        [fetchReports.pending]:(state , action)=>{
            state.status = 'loading';
        },
        [fetchReports.fulfilled] :(state , action)=>{
            state.status = 'succeeded';
            reportsAdapter.upsertMany(state, action.payload);
        },
        [fetchReports.rejected] :(state , action)=>{
            state.status = 'failed';
        },
        [addNewReport.fulfilled]:(state, action)=> reportsAdapter.addOne(state, action.payload),
        [deleteReport.fulfilled]: (state, action)=>reportsAdapter.removeOne(state, action.payload._id),
    }
});

export const {
    selectAll: selectAllReports,
    selectIds: selectReportIds,
    selectById: selectReportById,
    selectEntities: selectReport,
} = reportsAdapter.getSelectors(state => state.reports);
export default reportsSlice.reducer;