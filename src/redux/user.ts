import { SIGN_IN, SIGN_OUT } from './constants';
import { v4 } from 'uuid/interfaces';

interface User {
  id: v4 | null;
  firstName: string;
  lastName: string;
  city?: string;
  email: string;
  password: string; // need to check if we want this here or not; prob not unless encrypted
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

// when sign in populate info

// might want a sign in case as well; though could be sipler to have the sign in thunk return the set user action creator
const userReducer = (state = initialState, action: UserAction) => {
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
