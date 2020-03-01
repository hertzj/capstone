import { NEW_ITINERARY, EDIT_PLANNING_ITINERARY } from './constants';
import { ItineraryActivity } from './activityInstances';
// import { v4 } from 'uuid/interfaces';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './index';
//@ts-ignore
import Geocode from 'react-geocode';
import { googleAPIKey } from '../../secrets.js';

export interface ItineraryAction {
  type: symbol;
  id?: string;
  name?: string;
  city?: string;
  date?: Date; // be careful here
  budget?: string;
  startLocation?: string;
  endLocation?: string;
  startTime?: string; // not sure
  endTime?: string; // also not sure
  activities?: ItineraryActivity[];
  tags?: string[];
  itinerary?: Itinerary;
}

export interface Itinerary {
  id?: string;
  name: string;
  date: Date;
  city: string;
  budget: string;
  startLocation: string;
  endLocation: string;
  startTime: string;
  endTime: string;
  tags: string[];
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

export const createNewItinerary = (
  itinerary: Itinerary
): ThunkAction<void, RootState, unknown, Action> => {
  return async (dispatch, getState) => {
    // do the thing
    // post itinerary and get its data
    // dispatch(newItinerary(postedItinerary))
    Geocode.setApiKey(googleAPIKey);
    const { startLocation, endLocation } = itinerary;
    Geocode.fromAddress(startLocation)
      .then((res: any) => {
        const { lat, lng } = res.results[0].geometry.location;
        console.log('lat and lng of start: ', lat, lng);
        itinerary.startLocation = `${lat},${lng}`;
      })
      .catch((e: any) => {
        console.log('error creating start lat and lng');
        console.error(e);
      });
    Geocode.fromAddress(endLocation)
      .then((res: any) => {
        const { lat, lng } = res.results[0].geometry.location;
        console.log('lat and lng of end: ', lat, lng);
        itinerary.endLocation = `${lat},${lng}`;
      })
      .catch((e: any) => {
        console.log('error creating start lat and lng');
        console.error(e);
      });
    // post itinerary with the tags
    // NEXT TO DO - console.log the response
    // I want back the activities instances a user selects from
    //
    // and the new transit iterinary
    // dispatch activity instances
    // dispatch the transit itinerary
  };
};

const initialState = {
  name: '',
  date: new Date(),
  city: '',
  budget: '',
  startLocation: '',
  endLocation: '',
  startTime: '',
  endTime: '',
  tags: [],
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
