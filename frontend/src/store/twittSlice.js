import { createSlice } from '@reduxjs/toolkit';
import config from '../appconfig.json';

const initialState = {
  twitts: [],
};

const twittSlice = createSlice({
  name: 'twitt',
  initialState,
  reducers: {
    setUsertwitt(state, action) {
      // const {userTwitts}=action.payload
      state.twitts = action.payload;
      // state.twitts.push(action.payload.userTwitt);
    },
  },
});

export const fetchUserTwitts = (token, limit, skip) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${config.api}twitt/${limit}/${skip}`, {
        method: 'GET',
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
      const userTwitt = await fetchData();
      dispatch(twittActions.setUsertwitt(userTwitt));
    } catch (err) {
      console.log('error', err);
    }
  };
};

export const twittActions = twittSlice.actions;
export default twittSlice;
