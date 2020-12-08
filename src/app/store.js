import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import tasksReducer from '../features/tasks/tasksSlice';
import devicesReducer from './../features/devices/devicesSlice';
import reportsReducer from '../features/reports/reportsSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
    devices: devicesReducer,
    reports : reportsReducer,
  },
});
