import {
  SET_ACTIVITY_INSTANCES,
  SELECT_NEW_ACTIVITY,
  DE_SELECT_ACTIVITY,
  ADD_ITINERARY_ACTIVITY,
  REMOVE_ITINERARY_ACTIVITY,
  SET_ITINERARY_ACTIVITIES,
} from './constants';
// import { v4 } from 'uuid/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { Reducer, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './index';
import { Activity } from './activites';

interface ActivityInstanceAction {
  type: symbol;
  selectedActivities?: Activity[];
  itineraryActivities?: ItineraryActivity[];
  activity?: ItineraryActivity | Activity;
}

// export interface ItineraryActivity {
//   id: string;
//   startTime: string;
//   endTime: string;
//   date: Date;
//   plannedDuration: number;
//   actualDuration: number;
//   rating: number | null;
//   activityId?: string;
//   itineraryId?: string;
// }

export interface ItineraryActivity {
  type: string;
  details: Details | TravelDetails;
}

interface Details {
  id: string;
  name: string;
  locationLat: number;
  locationLong: number;
  startTime: string | null; // not null eventually
  endTime: string | null; // not null eventually
  date: Date | null; // not null eventually
  images: string[];
  actualDuration: number | null; // or default to planned and then edit?
  duration: number;
  rating: number | null;
  itineraryId?: string;
}

interface TravelDetails {
  id: string;
  walk: boolean;
  duration: number;
}

export const selectActivity = (activity: Activity): ActivityInstanceAction => {
  return {
    type: SELECT_NEW_ACTIVITY,
    activity,
  };
};

export const deSelectActivity = (
  activity: Activity
): ActivityInstanceAction => {
  return {
    type: DE_SELECT_ACTIVITY,
    activity,
  };
};

export const newItineraryActivity = (
  activity: ItineraryActivity
): ActivityInstanceAction => {
  return {
    type: ADD_ITINERARY_ACTIVITY,
    activity,
  };
};

export const removeItineraryActivity = (
  activity: ItineraryActivity
): ActivityInstanceAction => {
  return {
    type: REMOVE_ITINERARY_ACTIVITY,
    activity,
  };
};

export const setItineraryActivities = (
  itineraryActivities: ItineraryActivity[]
): ActivityInstanceAction => {
  return {
    type: SET_ITINERARY_ACTIVITIES,
    itineraryActivities,
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
  selectedActivities: Activity[];
  itineraryActivities: ItineraryActivity[];
}

const initialState: ActivityInstanceState = {
  selectedActivities: [],
  itineraryActivities: [],
};

//@ts-ignore
const activityInstanceReducer: Reducer<
  ActivityInstanceState,
  ActivityInstanceAction
> = (state = initialState, action: ActivityInstanceAction) => {
  switch (action.type) {
    case SET_ACTIVITY_INSTANCES:
      return {
        selectedActivities: action.selectedActivities,
        itineraryActivities: action.itineraryActivities,
      };
    case SELECT_NEW_ACTIVITY:
      return {
        ...state,
        selectedActivities: [...state.selectedActivities, action.activity],
      };
    case DE_SELECT_ACTIVITY:
      return {
        ...state,
        selectedActivities: state.selectedActivities.filter(
          (activity: Activity) => {
            if (action.activity && 'id' in action.activity) {
              return activity.id !== action.activity.id;
            }
          }
        ),
      };
    case SET_ITINERARY_ACTIVITIES:
      return {
        ...state,
        itineraryActivities: action.itineraryActivities,
      };
    case ADD_ITINERARY_ACTIVITY:
      return {
        ...state,
        itineraryActivities: [...state.itineraryActivities, action.activity],
      };
    case REMOVE_ITINERARY_ACTIVITY:
      return {
        ...state,
        itineraryActivities: state.itineraryActivities.filter(
          (activity: ItineraryActivity) => {
            if (action.activity && 'details' in action.activity) {
              return activity.details.id !== action.activity.details.id;
            }
          }
        ),
      };
    default:
      return state;
  }
};

export default activityInstanceReducer;
