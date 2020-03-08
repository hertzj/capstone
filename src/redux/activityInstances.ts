import { SET_OTHER_OPTIONS, SET_SCHEDULED_ACTIVITIES } from './constants';
// import { v4 } from 'uuid/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { Reducer, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './index';
import { Activity } from './activites';

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
}

// export const selectActivity = (activity: Activity): ActivityInstanceAction => {
//   return {
//     type: SELECT_NEW_ACTIVITY,
//     activity,
//   };
// };

// export const deSelectActivity = (
//   activity: Activity
// ): ActivityInstanceAction => {
//   return {
//     type: DE_SELECT_ACTIVITY,
//     activity,
//   };
// };

// export const newItineraryActivity = (
//   activity: ItineraryActivity
// ): ActivityInstanceAction => {
//   return {
//     type: ADD_ITINERARY_ACTIVITY,
//     activity,
//   };
// };

// export const removeItineraryActivity = (
//   activity: ItineraryActivity
// ): ActivityInstanceAction => {
//   return {
//     type: REMOVE_ITINERARY_ACTIVITY,
//     activity,
//   };
// };

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

// will need to think more about this one
// requires our algo
// this thunk  will take the selected activities and transform them into user activities by running the algo over them
// const transformActivityToItineraryActivity = (
//   activities: Activity[],
//   date: Date
// ): ThunkAction<void, RootState, unknown, Action> => {
//   return async (dispatch, getState) => {
//     // 1) sort activities based on location
//     // 2) then create ItineraryActivities
//     const itineraryActivities = activities.map((activity: Activity) => {
//       // could make the UUID for the id here as well with the UUID NPM library

//       // const itineraryDetails: Details = {
//       //   id: uuidv4(),
//       //   startTime: '',
//       //   endTime: '',
//       //   date,
//       //   // plannedDuration: activity.duration,
//       //   actualDuration: 0,
//       //   rating: null,
//       //   //@ts-ignore
//       //   itineraryId: getState().planningItinerary.id,
//       // };
//       const itineraryActivity: ItineraryActivity = {
//         type: 'travel',
//         details: itineraryDetails,
//       };
//       return itineraryActivity;
//     });

//     // 3) set start and end times (could also do while mapping)
//     // probably want a for each or some type of helper function to set the start and end times

//     // 4) post each activity through a for each
//     itineraryActivities.forEach((activity: ItineraryActivity) => {
//       // could also make the UUID here in sequelize
//       // (await /* something something */)
//     });

//     dispatch(setItineraryActivities(itineraryActivities));
//   };
// };

export interface ActivityInstanceState {
  scheduledActivities: Activity[];
  otherOptions: ItineraryActivity[];
}

// itineraryActivites become scheduledActivities
// these should also include the transit activites

// selectedActivities become otherOptions

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
