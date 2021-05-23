import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import registerReducer from '../features/register/store';
import loginReducer from '../features/login/store';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    register: registerReducer,
    login: loginReducer,
  },
});
