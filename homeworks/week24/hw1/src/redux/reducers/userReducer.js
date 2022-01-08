import { createSlice } from '@reduxjs/toolkit';
import { getMe, login, signUp } from '../../WebAPI';
import { setAuthToken } from '../../utils';

export const userReducer = createSlice({
  name: 'users',
  initialState: {
    user: null,
    isLoadingUser: false,
    errorMessage: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setIsLoadingUser: (state, action) => {
      state.isLoadingUser = action.payload;
    },

    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  setUser,
  setIsLoadingUser,
  setErrorMessage,
} = userReducer.actions;

export const loginBlog = (navigate, username, password) => (dispatch) =>
  login(username, password).then((res) => {
    dispatch(setErrorMessage(null));
    if (res.ok === 0) {
      dispatch(setErrorMessage(res.message));
      return undefined;
    }
    setAuthToken(res.token);

    getMe().then((resMe) => {
      if (resMe.ok !== 1) {
        setAuthToken(null);
        dispatch(setErrorMessage(resMe.toString()));
      }
      dispatch(setUser(resMe.data));
      navigate('/');
    });
  });

export const getUser = () => (dispatch) => {
  dispatch(setIsLoadingUser(true));
  getMe().then((res) => {
    if (res.ok) {
      dispatch(setUser(res.data));
      dispatch(setIsLoadingUser(false));
    }
  });
};

export const signUpBlog = (
  navigate,
  nickname,
  username,
  password,
) => dispatch => {
  signUp(nickname, username, password).then((res) => {
    dispatch(setErrorMessage(null));
    if (res.ok === 0) {
      dispatch(setErrorMessage(res.message));
      return undefined;
    }
    setAuthToken(res.token);

    getMe().then((resMe) => {
      if (resMe.ok !== 1) {
        setAuthToken(null);
        dispatch(setErrorMessage(resMe.toString()));
      }
      dispatch(setUser(resMe.data));
      navigate('/');
    });
  });
};

export default userReducer.reducer;
