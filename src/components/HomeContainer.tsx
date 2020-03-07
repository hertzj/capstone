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
  IonGrid,
  IonRow,
  IonCol,
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
  const itineraryName = useSelector(
    (state: SotaState) => state.transitItinerary.name
  );
  const locationName = useSelector(
    (state: SotaState) => state.transitItinerary.locationName
  );
  const dispatch = useDispatch();
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome {`${firstName} ${lastName}`}!</IonTitle>
          {/* <IonTitle>
            {itineraryName ? `${itineraryName}` : 'No Itinerary Yet'}
          </IonTitle> */}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonTitle>Current Itinerary</IonTitle>
          <IonCard>
            <IonTitle>
              {locationName ? `${locationName}` : 'No Location Yet'}
            </IonTitle>
          </IonCard>
        <IonModal isOpen={showModal}>
          <InputForm/>
          <IonButton color="secondary" onClick={() => setShowModal(false)}>Back</IonButton>
        </IonModal>
        <IonGrid>
          <IonRow className="ion-justify-content-evenly">
            <IonCol class="ion-justify-content-center">
            <IonButton onClick={() => setShowModal(true)}>Add Itinerary</IonButton>
            </IonCol>
            <IonCol class="ion-justify-content-center">
           <IonButton color="secondary" onClick={() => dispatch(signOutThunk())}>Sign Out</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
};

export default HomeContainer;
