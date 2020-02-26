import { NEW_ITINERARY, EDIT_PLANNING_ITINERARY } from './constants';
import { ItineraryActivity } from './activityInstances';
// import { v4 } from 'uuid/interfaces';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './index';

export interface ItineraryAction {
  type: symbol;
  id?: string;
  name?: string;
  date?: Date; // be careful here
  startLocation?: string;
  endLocation?: string;
  startTime?: string; // not sure
  endTime?: string; // also not sure
  activities?: ItineraryActivity[];
  itinerary?: Itinerary;
}

export interface Itinerary {
  id?: string;
  name: string;
  date: Date;
  startLocation: string;
  endLocation: string;
  startTime: string;
  endTime: string;
  activities?: ItineraryActivity[];
}

export const newItinerary = (itinerary: Itinerary): ItineraryAction => {
  return {
    type: NEW_ITINERARY,
    itinerary,
  };
};

export const editedToPlanningItinerary = (
  editType: string,
  edits: string | Date
): ItineraryAction => {
  const editsToSend: any = {
    type: EDIT_PLANNING_ITINERARY,
  };
  switch (editType) {
    case 'name':
      editsToSend.name = edits;
    case 'date':
      editsToSend.date = edits;
    case 'startLocation':
      editsToSend.startLocation = edits;
    case 'endLocation':
      editsToSend.endLocation = edits;
    case 'startTime':
      editsToSend.startTime = edits;
    case 'endTime':
      editsToSend.endTime = edits;
    default:
      editsToSend.type = null;
  }
  return editsToSend;
};

// write thunks and action creators

// new itinerary thunk
// assume logged in for now

export const createNewItinerary = (
  itinerary: Itinerary
): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch, getState) => {
    // do the thing
    // post itinerary and get its data
    // dispatch(newItinerary(postedItinerary))
  };
};

const initialState = {
  name: '',
  date: new Date(),
  startLocation: '',
  endLocation: '',
  startTime: '',
  endTime: '',
  activities: [],
};

const planningReducer = (state = initialState, action: ItineraryAction) => {
  const name = action.name;
  const date = action.date;
  const startLocation = action.startLocation;
  const endLocation = action.endLocation;
  const startTime = action.startTime;
  const endTime = action.endTime;
  const activities = action.activities;
  switch (action.type) {
    case NEW_ITINERARY:
      return action.itinerary;
    default:
      return state;
  }
};

export default planningReducer;
