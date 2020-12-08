import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import reportsReducer from './../features/reports/reportsSlice';
import devicesReducer from './../features/devices/devicesSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    reports: reportsReducer,
    devices: devicesReducer,
  },
});
