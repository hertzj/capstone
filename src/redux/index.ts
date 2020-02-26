import { combineReducers } from 'redux';
import userReducer from './user';
import activityInstanceReducer from './activityInstances';
import transitReducer from './transitItinerary';
import planningReducer from './planningItinerary';
import activitiesReducer from './activites';

const appReducer = combineReducers({
  user: userReducer,
  activityInstances: activityInstanceReducer,
  transitItinerary: transitReducer,
  planningItinerary: planningReducer,
  activities: activitiesReducer,
});

export default appReducer;
export type RootState = ReturnType<typeof appReducer>;
