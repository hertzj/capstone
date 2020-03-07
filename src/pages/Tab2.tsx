import React from 'react';
import {
  IonReorderGroup,
  IonPage,
  IonItem,
  IonLabel,
  IonReorder,
  IonContent,
  IonImg,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonChip,
} from '@ionic/react';
import { ItemReorderEventDetail } from '@ionic/core';
import { useDispatch, useSelector } from 'react-redux';
//import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { ItineraryActivity } from '../redux/activityInstances';
import { url } from 'inspector';
import { withRouter } from 'react-router';
const itinerary = [
  {
    id: 12,
    location: 'Times Square',
    type: 'SightSeeing',
    averageRating: 2,
    imgUrl:
      'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
  },
  {
    id: 14,
    location: 'Central Park',
    type: 'SightSeeing',
    averageRating: 2,
    imgUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Central_Park_-_The_Pond_%2848377220157%29.jpg/1200px-Central_Park_-_The_Pond_%2848377220157%29.jpg',
  },
];

function doReorder(event: CustomEvent<ItemReorderEventDetail>) {
  // The `from` and `to` properties contain the index of the item
  // when the drag started and ended, respectively
  console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

  // Finish the reorder and position the item in the DOM based on
  // where the gesture ended. This method can also be called directly
  // by the reorder group
  event.detail.complete();
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Tab2: React.FC = itinerary => {
  const scheduled = useSelector(
    //@ts-ignore
    state => state.activityInstances.scheduledActivities
  );
  // @ts-ignore
  const options = useSelector(state => state.activityInstances.otherOptions);
  console.log('scheduled on tab2: ', scheduled);
  console.log('options on tab2: ', options);

  // I think we want to display both the scheduled and the options?
  // Or maybe just the scheduled for now
  // something like

  {
    scheduled.map((activity: ItineraryActivity) => {
      if (activity.types === 'transit') {
        // or whatever we call it
        // return some code to show the transit
      }
      // just a guess for what the below would be like. I'm sure you all have better ideas than I do
      else if (activity.images) {
        return (
          <IonItem>
            {activity.images.length ? (
              <IonImg src={activity.images[0]}></IonImg>
            ) : (
                ''
              )}
            <IonLabel>
              {activity.name} from {activity.startTime} to {activity.endTime}{' '}
            </IonLabel>
          </IonItem>
        );
      }
    });
  }

  const newLocal = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabass.jpg/600px-New_york_times_square-terabass.jpg";
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Current Itinerary</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard style={{
          backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabass.jpg/600px-New_york_times_square-terabass.jpg)`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover', 
          fontSize: 22,
          height: "200px",
        }}>
          <IonCardContent style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0, 0.3)',
          }}>
            <IonCardSubtitle style={{
              color: '#ffffff',
            }}>Location</IonCardSubtitle>
            <IonCardTitle style={{
              color: '#ffffff',
            }}>Times Square</IonCardTitle>
            <IonChip>
              <IonLabel color="light">SightSeeing</IonLabel>
            </IonChip>
        </IonCardContent>
        </IonCard>
         
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
