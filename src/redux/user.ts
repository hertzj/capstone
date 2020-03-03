import { SIGN_IN, SIGN_OUT } from './constants';
import { v4 } from 'uuid/interfaces';
import { Reducer, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState, SotaState } from './index';
import { Plugins } from '@capacitor/core';
import axios from 'axios';
const { Storage } = Plugins;

const storageKey = 'sota_token';

export interface User {
  id: v4 | null; // might be string;
  firstName: string;
  lastName: string;
  city?: string;
  email: string;
}

interface UserAction {
  type: symbol;
  user?: User;
}

const initialState: User = {
  id: null,
  firstName: '',
  lastName: '',
  city: '',
  email: '',
};

export const setUser = (user: User): UserAction => {
  return {
    type: SIGN_IN,
    user,
  };
};

export const signOut = (): UserAction => {
  return {
    type: SIGN_OUT,
  };
};

export interface signInInfo {
  email: string;
  password: string;
}

export const signInThunk = (
  logInInfo: signInInfo
): ThunkAction<void, SotaState, unknown, Action> => {
  return dispatch => {
    axios
      .post('http://sota-server.herokuapp.com/auth/login', logInInfo)
      .then(async res => {
        console.log('logged in!');
        await Storage.set({
          key: storageKey,
          value: res.data.token,
        });
        return dispatch(setUser(res.data.user));
      })
      .catch(e => {
        console.log('error signing in');
        console.error('e');
        return dispatch(signOut());
      });
  };
};

export const signUpThunk = (
  user: User
): ThunkAction<void, SotaState, unknown, Action> => {
  return dispatch => {
    axios
      .post('http://sota-server.herokuapp.com/auth/signup', user)
      .then(async res => {
        console.log('yay, user created!');
        await Storage.set({
          key: storageKey,
          value: res.data.token,
        });
        return dispatch(setUser(res.data.user));
      })
      .catch(e => {
        console.log('error posting user');
        console.error(e);
      });
  };
};

export const signOutThunk = (): ThunkAction<
  void,
  SotaState,
  unknown,
  Action
> => {
  return (dispatch, getState) => {
    const email = getState().user.email;
    const emailObj = {
      email,
    };
    axios
      .post('http://sota-server.herokuapp.com/auth/logout', emailObj)
      .then(async res => {
        await Storage.remove({ key: storageKey });
        return dispatch(signOut());
      })
      .catch(e => {
        console.log('error signing out');
        console.error(e);
      });
  };
};

export const initialLogInAttempt = (): ThunkAction<
  void,
  SotaState,
  unknown,
  Action
> => {
  return async dispatch => {
    const { value } = await Storage.get({ key: storageKey });
    axios
      .get('http://sota-server.herokuapp.com/auth/me', {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
      .then(res => {
        console.log('yay, persistent login!');
        return dispatch(setUser(res.data));
      })
      .catch(e => {
        console.log('no persistent login');
        console.error(e);
        // dispatch the below when we are sure this works
        // return dispatch(signOut());
      });
  };
};

// might want a sign in case as well; though could be sipler to have the sign in thunk return the set user action creator

// fix later
//@ts-ignore
const userReducer: Reducer<User, UserAction> = (
  state = initialState,
  action: UserAction
) => {
  switch (action.type) {
    case SIGN_IN:
      return action.user;
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
