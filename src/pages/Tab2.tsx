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
} from '@ionic/react';
import { ItemReorderEventDetail } from '@ionic/core';
import { useDispatch, useSelector } from 'react-redux';
//import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
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
  const activities = useSelector(
    //@ts-ignore
    state => state.activityInstances.itineraryActivities
  );
  console.log('activities on tab2: ', activities);

  // these are the activities you want to map through; you can get the info from the details value on each activity object
  // something like

  // {
  //   activities.map(activity => {
  //     const { details } = activity; // alternatively could destructure in the argument
  //     return (
  //       <IonItem>
  //         <IonImg src={details.WHATEVER}></IonImg>
  //         <IonLabel>{details.locationORwhatever}</IonLabel>
  //         <IonReorder slot="end" />
  //       </IonItem>
  //     );
  //   });
  // }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Current Itinerary</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonReorderGroup disabled={false} onIonItemReorder={doReorder}>
          {/* {
            itinerary.map(location => {
              return (<IonItem>
                <IonImg src={location.imgUrl}></IonImg>
                <IonLabel>{location.location}</IonLabel>
                <IonReorder slot="end" />
              </IonItem>);
            }
            )
          } */}
          <IonItem>
            <IonLabel color="primary">Times Square</IonLabel>
            <br />
            <IonLabel color="secondary">Start Time</IonLabel>
            <br />
            <IonLabel color="secondary">End Time</IonLabel>
            <br />

            <IonImg src="https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg" />
            <IonReorder slot="end" />
          </IonItem>
          <IonItem>
            <IonLabel color="primary">Central Park</IonLabel>
            <IonLabel color="secondary">Start Time</IonLabel>
            <IonLabel color="secondary">End Time</IonLabel>
            <IonImg src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Central_Park_-_The_Pond_%2848377220157%29.jpg/1200px-Central_Park_-_The_Pond_%2848377220157%29.jpg" />
            <IonReorder slot="end" />
          </IonItem>
        </IonReorderGroup>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
