import { createAsyncThunk, createEntityAdapter, createSlice, nanoid } from '@reduxjs/toolkit';
import { client } from '../../api/client';
const employeesAdapter = createEntityAdapter({
    selectId: emp => emp._id
});

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
    const response = await client.get('api/employees');
    return response.employees;
});
export const addNewEmployee = createAsyncThunk('employees/addNewEmployee', async (initialEmployee) => {
    const response = await client.post('api/employees', { employee: initialEmployee });
    return response.employee;
});

export const updateEmployee = createAsyncThunk('employees/updateEmployee', async (employee, _id) => {
    const response = await client.put(`api/employees/${_id}`, { employee });
    return response.emloyee;
});

export const getEmployeeId = createAsyncThunk('employees/updateEmployee', async (_id) => {
    const response = await client.get(`api/employees/${_id}`);
    return response.emloyee;
});

export const checkMail = async (email) => {
    const response = await client.get(`api/employees/email/check?email=${email}`);
    return response.error;
};
const initialState = employeesAdapter.getInitialState({
    status: 'idle',
    error: null,
})

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        
    },
    extraReducers: {
        [fetchEmployees.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchEmployees.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            employeesAdapter.upsertMany(state, action.payload);
        },
        [fetchEmployees.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
        [addNewEmployee.fulfilled]: employeesAdapter.addOne,
        [updateEmployee.fulfilled]: employeesAdapter.updateOne
    }
});
// export const selectAllEmployees = state => state.employees.employees;

// export const selectEmployeeById = (state, employeeId) =>
//     state.employees.employees.find(emp => emp._id === employeeId);

export const {
    selectAll: selectAllEmployees,
    selectById: selectEmployeeById,
    selectEntities: selectEmployees,
    
    
} = employeesAdapter.getSelectors(state => state.employees);

export const { addNewEmp, } = employeesSlice.actions;

export default employeesSlice.reducer;