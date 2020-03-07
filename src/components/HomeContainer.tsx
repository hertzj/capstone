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
        <IonItem href="tab2" className="ion-activated">
          <IonCard>
            <IonTitle>
              {locationName ? `${locationName}` : 'No Location Yet'}
            </IonTitle>
          </IonCard>
        </IonItem>
        <IonModal isOpen={showModal}>
          <InputForm/>
          <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
        </IonModal>
        <IonButton onClick={() => setShowModal(true)}>Add Itinerary</IonButton>
        <IonButton onClick={() => dispatch(signOutThunk())}>Sign Out</IonButton>
      </IonContent>
    </>
  );
};

export default HomeContainer;
