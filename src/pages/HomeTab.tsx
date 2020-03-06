import './HomeTab.css';
import React from 'react';
import { IonPage } from '@ionic/react';
import { useSelector } from 'react-redux';
import { SotaState } from '../redux';
import HomeContainer from '../components/HomeContainer';
import SignInContainer from '../components/SignInContainer';

const HomeTab: React.FC = () => {
  const userId = useSelector((state: SotaState) => state.user.id);
  return <IonPage>{userId ? <HomeContainer /> : <SignInContainer />}</IonPage>;
};

export default HomeTab;
