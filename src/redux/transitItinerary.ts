import { ItineraryAction, Itinerary } from './planningItinerary';
import { SET_TRANSIT_ITINERARY } from './constants';

// create thunks and action creators

export const placeTransitItinerary = (
  itinerary: Itinerary
): ItineraryAction => {
  return {
    type: SET_TRANSIT_ITINERARY,
    itinerary,
  };
};

// we will want to edit this, but really through automation in response to our algo

// might want other things in our itinerary
const initialState = {
  name: '',
  date: null,
  startLocation: '',
  endLocation: '',
  startTime: '',
  endTime: '',
  activities: [],
};

const transitReducer = (state = initialState, action: ItineraryAction) => {
  const name = action.name;
  const date = action.date;
  const startLocation = action.startLocation;
  const endLocation = action.endLocation;
  const startTime = action.startTime;
  const endTime = action.endTime;
  const activities = action.activities;
  switch (action.type) {
    case SET_TRANSIT_ITINERARY:
      return action.itinerary;
    default:
      return state;
  }
};

export default transitReducer;
