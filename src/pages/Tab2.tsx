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
import { types } from 'util';
import moment from 'moment';

const Tab2: React.FC = itinerary => {
  const scheduled = useSelector(
    //@ts-ignore
    state => state.activityInstances.scheduledActivities
  );
  //@ts-ignore
  const currentItinerary = useSelector(state => state.planningItinerary);
  // @ts-ignore
  const options = useSelector(state => state.activityInstances.otherOptions);
  console.log('scheduled on tab2: ', scheduled);
  console.log('options on tab2: ', options);

  // I think we want to display both the scheduled and the options?
  // Or maybe just the scheduled for now
  // something like

  const makeListOfActivities = () => {
    if (scheduled) {
      return scheduled.map(
        (singleActivity: {
          images: any;
          name: any;
          types: any;
          startTime: any;
          endTime: any;
          travel_time_minutes: any;
        }) => {
          let backgroundImageUrl;
          if (singleActivity.types[0] !== 'transit') {
            backgroundImageUrl = singleActivity.images.length
              ? `${singleActivity.images[0]}`
              : `https://cdn.vox-cdn.com/thumbor/YQVObtsv5vFSxMWPZOxyzPnT3ZE=/0x0:2000x1333/1200x900/filters:focal(840x507:1160x827)/cdn.vox-cdn.com/uploads/chorus_image/image/58405263/171109_08_17_25_5DSR4719.0.jpg`;
          } else {
            backgroundImageUrl = `https://cdn.dribbble.com/users/1052154/screenshots/6643893/d1.jpg`;
          }

          return (
            <IonCard
            style={{
                backgroundImage: `url(${backgroundImageUrl})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              fontSize: 22,
              height: '300px',
            }}
            > 
              <IonCardContent
                style={{
                  height: '100%',
                  width: '100%',
                  backgroundColor: 'rgba(0,0,0, 0.3)',
                }}
              >
                <IonCardTitle
                  style={{
                    color: '#ffffff',
                  }}
                >
                  {singleActivity.name}
                </IonCardTitle>
                <IonChip>
                  {singleActivity.types ? (
                    <IonLabel color="light">{singleActivity.types[1]}</IonLabel>
                  ) : (
                      <IonLabel color="light">Activity</IonLabel>
                    )}
                </IonChip>
                {singleActivity.types[0] !== 'transit' ? (
                  <>
                    <IonCardSubtitle
                      style={{
                        color: '#f4ab9a',
                        paddingTop: '5px',
                      }}
                    >
                      Start Time
                    </IonCardSubtitle>
                    <IonCardTitle
                      style={{
                        color: '#ffffff',
                        fontSize: '14px',
                      }}
                    >
                      {moment(singleActivity.startTime, "hh:mm:ss").format("h:mm A")}
                    </IonCardTitle>
                    <IonCardSubtitle
                      style={{
                        color: '#f4ab9a',
                        paddingTop: '5px',
                      }}
                    >
                      End Time
                    </IonCardSubtitle>
                    <IonCardTitle
                      style={{
                        color: '#ffffff',
                        fontSize: '14px',
                      }}
                    >
                      {moment(singleActivity.endTime, "hh:mm:ss").format("h:mm A")}
                    </IonCardTitle>
                  </>
                ) : (
                    <>
                      <IonCardSubtitle
                        style={{
                          color: 'primary',
                          paddingTop: '5px',
                        }}
                      >
                        Travel Time
                    </IonCardSubtitle>
                      <IonCardTitle
                        style={{
                          color: '#ffffff',
                          fontSize: '14px',
                        }}
                      >
                        {singleActivity.travel_time_minutes} minutes
                    </IonCardTitle>
                    </>
                  )}
              </IonCardContent>
            </IonCard>
          );
        }
      );
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {currentItinerary.name
              ? currentItinerary.name
              : 'Itinerary Building in Progress'}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollEvents={true}>{makeListOfActivities()}</IonContent>
    </IonPage>
  );
};

export default Tab2;
