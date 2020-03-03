import { SIGN_IN, SIGN_OUT } from './constants';
import { v4 } from 'uuid/interfaces';
import { Reducer, Action } from 'redux';

export interface User {
  id: v4 | null;
  firstName: string;
  lastName: string;
  city?: string;
  email: string;
  password: string; // this is safe since password is hashed
}

interface UserAction {
  type: symbol;
  user: User;
}

const initialState: User = {
  id: null,
  firstName: '',
  lastName: '',
  city: '',
  email: '',
  password: '',
};

export const setUser = (user: User): UserAction => {
  return {
    type: SIGN_IN,
    user,
  };
};

// might want a sign in case as well; though could be sipler to have the sign in thunk return the set user action creator
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
