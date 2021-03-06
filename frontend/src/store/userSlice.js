import { createSlice } from '@reduxjs/toolkit';
import config from '../appconfig.json';

const initialState = {
  isLogedIn: false,
  token: '',
  firstName: '',
  lastName: '',
  email: '',
  image: '',
  registeredAt: '',
  twitts: [],
  followings: [],
  followers: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLogin(state, action) {
      state.token = action.payload;
      state.isLogedIn = true;
    },
    setUserInfo(state, action) {
      const { firstName, lastName, email, registeredAt, image } =
        action.payload;

      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
      state.registeredAt = registeredAt;
      state.image = image;
    },
    setUserLogout(state, action) {
      state.token = '';
      state.isLogedIn = false;
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.registeredAt = '';
      state.twitts = [];
      state.followers = [];
      state.followings = [];
    },
  },
});

export const fetchUserData = () => {
  const token = localStorage.getItem('token');
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${config.api}user/userInfo`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Faild');
      }
      const data = await response.json();
      return data;
    };
    try {
      const userData = await fetchData();
      dispatch(userActions.setUserInfo(userData));
    } catch (err) {
      dispatch(userActions.setUserLogout());
      localStorage.clear();
      console.log('error', err);
    }
  };
};

export const userActions = userSlice.actions;
export default userSlice;
