import { createStore, applyMiddleware } from 'redux';
import appReducer from './redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const RESET_STORE = 'RESET_STORE';
export const resetStore = () => ({ type: RESET_STORE });
const rootReducer = (state: any, action: any) => {
  if (action.type === RESET_STORE) {
    state = undefined;
    return appReducer(state, action);
  }
  return appReducer(state, action);
};

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
  )
);
