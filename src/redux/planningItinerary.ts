import {
  NEW_ITINERARY,
  EDIT_PLANNING_ITINERARY,
  TYPE_ACTIVITY,
} from './constants';
import {
  ItineraryActivity,
  setScheduledActivities,
  setOtherOptions,
  putAndSetScheduledActs,
  setOldActsToScheduled,
} from './activityInstances';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './index';
//@ts-ignore
import Geocode from 'react-geocode';
import { googleAPIKey, cityMapperAPIKey } from '../secrets';
import axios from 'axios';

export interface ItineraryAction {
  type: symbol;
  id?: string;
  name?: string;
  locationName?: string;
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
  locationName: string;
  budget: string;
  startLocation?: string;
  endLocation?: string;
  startLocationLat?: number;
  startLocationLong?: number;
  endLocationLat?: number;
  endLocationLong?: number;
  startTime: string;
  endTime: string;
  tags: string[];
  activities?: ItineraryActivity[];
}

export const newItineraryActionCreator = (
  itinerary: Itinerary
): ItineraryAction => {
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
    case 'locationName':
      editsToSend.locationName = edits;
    case 'budget':
      editsToSend.budget = edits;
    case 'startLocation':
      editsToSend.startLocation = edits;
    case 'endLocation':
      editsToSend.endLocation = edits;
    case 'startTime':
      editsToSend.startTime = edits;
    case 'endTime':
      editsToSend.endTime = edits;
    case 'tags': // might be more complicated due to it being an array
      editsToSend.tags = edits;
    default:
      editsToSend.type = null;
  }
  return editsToSend;
};

export const createNewItinerary = (
  itinerary: Itinerary
): ThunkAction<void, RootState, unknown, Action> => {
  return async (dispatch, getState) => {
    Geocode.setApiKey(googleAPIKey);
    const { startLocation, endLocation, budget } = itinerary;
    let newBudget = '';
    switch (budget) {
      case '$':
        newBudget = 'budget';
        break;
      case '$$':
        newBudget = 'mid_range';
        break;
      case '$$$':
        newBudget = 'splurge';
        break;
      default:
        newBudget = 'mid_range';
    }
    itinerary.budget = newBudget;
    await Geocode.fromAddress(startLocation)
      .then((res: any) => {
        const { lat, lng } = res.results[0].geometry.location;
        itinerary.startLocation = `${lat},${lng}`;
      })
      .catch((e: any) => {
        console.log('error creating start lat and lng');
        console.error(e);
      });
    await Geocode.fromAddress(endLocation)
      .then((res: any) => {
        const { lat, lng } = res.results[0].geometry.location;
        itinerary.endLocation = `${lat},${lng}`;
      })
      .catch((e: any) => {
        console.log('error creating start lat and lng');
        console.error(e);
      });

    const newTransitData = (
      await axios.post(
        `http://sota-server.herokuapp.com/api/itineraries/newActivities/${
          getState().user.id
        }`,
        itinerary
      )
    ).data;

    let { newItinerary, scheduledActivities, otherOptions } = newTransitData;
    const actsToSend: any[] = [];

    console.log(
      'scheduled activities we get back from posting to itineraries/newActivities: ',
      scheduledActivities
    );

    const { date, startLocationLat, startLocationLong } = newItinerary;

    const { locationLat, locationLong } = scheduledActivities[0];

    const firstMove = {
      date,
      startLocationLat,
      startLocationLong,
      endLocationLat: locationLat,
      endLocationLong: locationLong,
      endTime: scheduledActivities[0].startTime,
      itineraryId: newItinerary.id,
    };

    axios
      .post('https://sota-server.herokuapp.com/api/citymapper', firstMove)
      .then(res => {
        const firstTransit = res.data;
        firstTransit.types = ['transit'];
        console.log('first transit: ', firstTransit);
        actsToSend.push(firstTransit);
      })
      .then(() => {
        return scheduledActivities.forEach(
          async (activity: ItineraryActivity, idx: number) => {
            const { locationLat, locationLong, endTime } = activity;
            const startLocationLat = locationLat;
            const startLocationLong = locationLong;
            let endLocationLat;
            let endLocationLong;
            if (idx < scheduledActivities.length - 1) {
              endLocationLat = scheduledActivities[idx + 1].locationLat;
              endLocationLong = scheduledActivities[idx + 1].locationLong;
            } else {
              endLocationLat = newItinerary.endLocationLat;
              endLocationLong = newItinerary.endLocationLong;
            }

            await axios
              .post('https://sota-server.herokuapp.com/api/citymapper', {
                date,
                startLocationLat,
                startLocationLong,
                endLocationLat,
                endLocationLong,
                endTime,
                itineraryId: newItinerary.id,
              })
              .then(res => {
                const transit = res.data;
                transit.types = ['transit'];
                console.log('transit within for each: ', transit);
                actsToSend.push(activity);
                actsToSend.push(transit);
              })
              .then(() => {
                if (idx === scheduledActivities.length - 1) {
                  dispatch(newItineraryActionCreator(newItinerary));
                  dispatch(putAndSetScheduledActs(actsToSend));
                  dispatch(setOtherOptions(otherOptions));
                }
              });
            console.log('at end of for each');
          }
        );
      })
      .catch(e => {
        console.log('error in promise chain');
        console.error(e);
      });
  };
};

export const getItinerary = (
  id: string
): ThunkAction<void, RootState, unknown, Action> => {
  return async dispatch => {
    const newItinerary = (
      await axios.get(`http://sota-server.herokuapp.com/api/itineraries/${id}`)
    ).data;
    console.log('newItinerary: ', newItinerary);
    dispatch(newItineraryActionCreator(newItinerary));
    dispatch(setOldActsToScheduled(id));
  };
};

const initialState = {
  name: '',
  date: new Date(),
  locationName: '',
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
  const locationName = action.locationName;
  const budget = action.budget;
  const startLocation = action.startLocation;
  const endLocation = action.endLocation;
  const startTime = action.startTime;
  const endTime = action.endTime;
  const tats = action.tags;
  const activities = action.activities;
  switch (action.type) {
    case NEW_ITINERARY:
      return action.itinerary;
    default:
      return state;
  }
};

export default planningReducer;
