import './HomeTab.css';
import React from 'react';
import { IonCard, IonTitle, IonIcon, IonItem, IonPage } from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { SotaState } from '../redux';
import HomeContainer from '../components/HomeContainer';
import SignInContainer from '../components/SignInContainer';

// considerations
// might need to change title and non IonContent stuff through switches

// once works, probably want to make SignInContainer into something that can handle signing up

const HomeTab: React.FC = () => {
  // const firstName = useSelector((state: SotaState) => state.user.firstName);
  // const lastName = useSelector((state: SotaState) => state.user.lastName);
  // const itineraryName = useSelector(
  //   (state: SotaState) => state.transitItinerary.name
  // );
  // const locationName = useSelector(
  //   (state: SotaState) => state.transitItinerary.locationName
  // );
  const userId = useSelector((state: SotaState) => state.user.id);
  return <IonPage>{userId ? <HomeContainer /> : <SignInContainer />}</IonPage>;
};

export default HomeTab;
