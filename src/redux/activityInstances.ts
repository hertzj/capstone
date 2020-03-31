import { SET_OTHER_OPTIONS, SET_SCHEDULED_ACTIVITIES } from './constants';
// import { v4 } from 'uuid/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { Reducer, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './index';
import { Activity } from './activites';
import axios from 'axios';

interface ActivityInstanceAction {
  type: symbol;
  scheduledActivities?: ItineraryActivity[];
  otherOptions?: ItineraryActivity[];
}

export interface ItineraryActivity {
  activity: boolean;
  types: string | string[];
  id: string;
  name?: string;
  locationLat?: number;
  locationLong?: number;
  startTime: string | null; // not null eventually
  endTime: string | null; // not null eventually
  date: Date | null | string; // figure out which
  images?: string[];
  distance?: number;
  duration: number;
  walk?: boolean;
  itineraryId?: string;
  travel_time_minutes?: number;
  order?: number;
}

export const setScheduledActivities = (
  scheduledActivities: ItineraryActivity[]
): ActivityInstanceAction => {
  return {
    type: SET_SCHEDULED_ACTIVITIES,
    scheduledActivities,
  };
};

export const setOtherOptions = (
  otherOptions: ItineraryActivity[]
): ActivityInstanceAction => {
  return {
    type: SET_OTHER_OPTIONS,
    otherOptions,
  };
};

export const putAndSetScheduledActs = (
  scheduled: Activity[]
): ThunkAction<void, RootState, unknown, Action> => {
  return async dispatch => {
    scheduled.forEach((act: Activity, idx: number) => {
      act.order = idx + 1;
    });
    const newScheduled = (
      await axios.put(
        'http://sota-server.herokuapp.com/api/activityInstances',
        scheduled
      )
    ).data;
    console.log('new scheduled: ', newScheduled);
    dispatch(setScheduledActivities(newScheduled));
  };
};

export const setOldActsToScheduled = (
  id: string
): ThunkAction<void, RootState, unknown, Action> => {
  return async dispatch => {
    const oldActsToSee = (
      await axios.get(
        `http://sota-server.herokuapp.com/api/activityInstances/${id}`
      )
    ).data;

    console.log('old acts to see before sort: ', oldActsToSee);

    oldActsToSee.sort((a: ItineraryActivity, b: ItineraryActivity) => {
      // @ts-ignore
      if (a.order > b.order) return 1;
      return -1;
    });
    console.log('old acts to see after sort: ', oldActsToSee);
    dispatch(setScheduledActivities(oldActsToSee));
  };
};

export interface ActivityInstanceState {
  scheduledActivities: Activity[];
  otherOptions: ItineraryActivity[];
}

const initialState: ActivityInstanceState = {
  scheduledActivities: [],
  otherOptions: [],
};

//@ts-ignore
const activityInstanceReducer: Reducer<
  ActivityInstanceState,
  ActivityInstanceAction
> = (state = initialState, action: ActivityInstanceAction) => {
  switch (action.type) {
    case SET_SCHEDULED_ACTIVITIES: {
      return {
        ...state,
        scheduledActivities: action.scheduledActivities,
      };
    }
    case SET_OTHER_OPTIONS: {
      return {
        ...state,
        otherOptions: action.otherOptions,
      };
    }
    default:
      return state;
  }
};

export default activityInstanceReducer;
