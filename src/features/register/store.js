import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { firebase } from '../../firebase';

const initialState = {
  email: '',
  password: '',
  error: '',
  loading: false,
  isRegister: false,
  // Khi nó register được rồi, thì sẽ có thông tin về user ở dưới
  user: {
    email: '',
    avatar: '',
    displayName: '',
  },
};

export const registerAsync = createAsyncThunk(
  'counter/registerAsync',
  async ({ email, password }) => {
    const res = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return res;
  }
);

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.email = action.payload;
      state.error = '';
    },
    setPassword: (state, action) => {
      state.password = action.payload;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = `[${action.error.name}]: ${action.error.message}`;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isRegister = true;
        state.error = '';
        const { user } = action.payload;
        state.user = {
          email: user.email,
        }
      });
  },
});

export const { setUsername, setPassword } = registerSlice.actions;

export default registerSlice.reducer;
