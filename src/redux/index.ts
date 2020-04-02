import { combineReducers, Reducer, Action } from 'redux';
import userReducer, { User } from './user';
import activityInstanceReducer, {
  ActivityInstanceState,
} from './activityInstances';
import transitReducer from './transitItinerary';
import planningReducer, { Itinerary } from './planningItinerary';
import activitiesReducer, { Activity } from './activites';

//@ts-ignore
const appReducer: Reducer<SotaState, Action> = combineReducers({
  user: userReducer,
  activityInstances: activityInstanceReducer,
  transitItinerary: transitReducer,
  planningItinerary: planningReducer,
  activities: activitiesReducer,
});

export default appReducer;
export interface SotaState {
  user: User;
  activityInstaces: ActivityInstanceState;
  transitItinerary: Itinerary;
  planningItinerary: Itinerary;
  activities: Activity;
}
export type RootState = ReturnType<typeof appReducer>;
