import React, { useState } from 'react';
import {
  IonCard,
  IonTitle,
  IonIcon,
  IonItem,
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
  IonModal,
} from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';
import { useSelector, useDispatch } from 'react-redux';
import { SotaState } from '../redux';
import { signOutThunk } from '../redux/user';
import InputForm from '../pages/ItinerarySetupFlow';

const HomeContainer: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const firstName = useSelector((state: SotaState) => state.user.firstName);
  const lastName = useSelector((state: SotaState) => state.user.lastName);
  const itineraryList = useSelector(
    (state: SotaState) => state.user.itineraries
  );

  const makeListOfItineraryNames = () => {
    if (itineraryList) {
      return itineraryList.map(itineraryObj => {
        return (
          <IonItem className="ion-activated" key={itineraryObj.id}>
            <IonCard>
              <IonTitle>{itineraryObj.name}</IonTitle>
            </IonCard>
          </IonItem>
        );
      });
    }
  };

  const dispatch = useDispatch();
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome {`${firstName} ${lastName}`}!</IonTitle>

          <IonTitle>
            {itineraryList ? `Your Intineraries` : 'No Itineraries Yet'}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {makeListOfItineraryNames()}
      </IonContent>
      <IonContent>
        <IonModal isOpen={showModal}>
          <InputForm />
          <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
        </IonModal>
        <IonButton onClick={() => setShowModal(true)}>Add Itinerary</IonButton>
        <IonButton onClick={() => dispatch(signOutThunk())}>Sign Out</IonButton>
      </IonContent>
    </>
  );
};

export default HomeContainer;
