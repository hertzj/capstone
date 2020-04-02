// I THINK WE DO NOT NEED THIS ANYMORE
import { SET_ACTIVITIES } from './constants';
// import { v4 } from 'uuid/interfaces';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './index';

export interface Activity {
  id: string;
  location: string;
  type: string;
  duration: number;
  rating: number;
  url: string; // think we will maybe want this or a description or something
  itineraryId?: string;
  order?: number;
}

interface ActivityAction {
  type: symbol;
  food?: Activity[];
  nightlife?: Activity[];
  culture?: Activity[];
  museum?: Activity[];
  kids?: Activity[];
  outdoors?: Activity[];
}

const setActivities = (): ActivityAction => {
  return {
    type: SET_ACTIVITIES,
    // the categories we want
  };
};

const filterActivity = (activities: Activity[], filter: string) => {
  return activities.filter(activity => activity.type === filter);
};

const initialSetActivities = (
  activities: Activity[]
): ThunkAction<void, RootState, unknown, Action> => {
  return dispatch => {
    const food: Activity[] = filterActivity(activities, 'food');
    // do for the other types we end up having;
    // dispatch action creator with all of them
  };
};

interface ActivitiesState {
  food: Activity[];
  nightlife: Activity[];
  culture: Activity[];
  museum: Activity[];
  kids: Activity[];
  outdoors: Activity[];
}

const initialState: ActivitiesState = {
  food: [],
  nightlife: [],
  culture: [],
  museum: [],
  kids: [],
  outdoors: [],
};

const activitiesReducer = (state = initialState, action: ActivityAction) => {
  switch (action.type) {
    case SET_ACTIVITIES:
      return {
        ...state,
        // the activities we want
      };
    default:
      return state;
  }
};

export default activitiesReducer;
