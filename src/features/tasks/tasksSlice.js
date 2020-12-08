import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { client } from '../../api/client';


const tasksAdapter = createEntityAdapter(
    {
        selectId: task => task._id,
    }
);


export const fetchTasksByTechnicianId = createAsyncThunk('tasks/fetchTasksByTechnician', async (id) => {
    const response = await client.get(`api/tasks/technician/${id}`);
    return response.tasks;
});

export const addNewTask = createAsyncThunk('tasks/addNewTask', async (task) => {
    const response = await client.post('api/tasks', { task });
    return response.task;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task) => {
    const response = await client.put(`api/tasks/${task._id}`, { task });
    return response.task;
});



const initialState = tasksAdapter.getInitialState({
    status: 'idle',
    error: null
});

const tasksSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {


    },
    extraReducers: {
        
        [fetchTasksByTechnicianId.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchTasksByTechnicianId.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            tasksAdapter.upsertMany(state, action.payload);
        },
        [fetchTasksByTechnicianId.rejected]: (state, action) => {
            state.status = 'failed';
        },
        [addNewTask.fulfilled]: (state, action) => tasksAdapter.addOne(state, action.payload),
        [updateTask.fulfilled]: (state, action) => tasksAdapter.updateOne(state,{id:action.payload._id, changes:action.payload}),

    }
});
export const {
    selectAll: selectAllTasks,
    selectIds: selectAllTaskIds,
    selectById: selectTaskById,
} = tasksAdapter.getSelectors(state => state.tasks);
export default tasksSlice.reducer;