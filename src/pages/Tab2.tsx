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

  const makeListOfActivities = () => {
    if (scheduled) {
      return scheduled.map((singleActivity: { imgUrl: any; location: React.ReactNode; types: React.ReactNode; }) => {
        return (
          <IonCard style={{
            backgroundImage: `url(${singleActivity.imgUrl[0]})`,
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
              <IonCardTitle style={{
                color: '#ffffff',
              }}>{singleActivity.location}</IonCardTitle>
              <IonChip>
                <IonLabel color="light">{singleActivity.types}</IonLabel>
              </IonChip>
            </IonCardContent>
          </IonCard>
        );
      });
    }
  };

  // {
  //   scheduled.map((activity: ItineraryActivity) => {
  //     if (activity.types === 'transit') {
  //       // or whatever we call it
  //       // return some code to show the transit
  //     }
  //     // just a guess for what the below would be like. I'm sure you all have better ideas than I do
  //     else if (activity.images) {
  //       return (
  //         <IonItem>
  //           {activity.images.length ? (
  //             <IonImg src={activity.images[0]}></IonImg>
  //           ) : (
  //               ''
  //             )}
  //           <IonLabel>
  //             {activity.name} from {activity.startTime} to {activity.endTime}{' '}
  //           </IonLabel>
  //         </IonItem>
  //       );
  //     }
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
        {makeListOfActivities()}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
