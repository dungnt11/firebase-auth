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
  isLogin: false,
  // Khi nó login được rồi, thì sẽ có thông tin về user ở dưới
  user: {
    email: '',
    avatar: '',
    displayName: '',
  },
};

export const loginAsync = createAsyncThunk(
  'counter/loginAsync',
  async ({ email, password }) => {
    const res = await firebase.auth().signInWithEmailAndPassword(email, password);
    return res.user.email;
  }
);

export const getInfoUserAsync = createAsyncThunk(
  'counter/getInfoUserAsync',
  async ({ email }) => {
    const res1 = await firebase
          .firestore()
          .collection('users/')
          .where("email", "==", email)
          .get();

    const userInfoPaser = res1.docs[0].data();
    return {
      email: email,
      displayName: userInfoPaser.displayName,
      avatar: userInfoPaser.avatar,
    }
  }
);

export const loginSlice = createSlice({
  name: 'login',
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
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = `[${action.error.name}]: ${action.error.message}`;
      })
      .addCase(getInfoUserAsync.fulfilled, async (state, action) => {
        state.loading = false;
        state.isLogin = true;
        state.error = '';
        const { email, displayName, avatar } = action.payload;
        state.user = {
          email,
          displayName,
          avatar,
        }
      });
  },
});

export const { setUsername, setPassword } = loginSlice.actions;

export default loginSlice.reducer;
