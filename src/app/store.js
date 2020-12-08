import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from './../features/employees/employeesSlice'; 
import userReducer from '../features/user/userSlice';
import reportsReducer from './../features/reports/reportsSlice';
import devicesReducer from './../features/devices/devicesSlice';
import tasksReducer from './../features/tasks/tasksSlice';

export default configureStore({
  reducer: {
    employees: employeesReducer,
    user: userReducer,
    reports: reportsReducer,
    devices: devicesReducer,
    tasks : tasksReducer,
  },
});
