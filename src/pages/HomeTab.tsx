import './HomeTab.css';
import React, { useState } from 'react';
import { IonCard, IonTitle, IonIcon, IonItem, IonPage, IonModal, IonButton, IonContent } from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { SotaState } from '../redux';
import InputForm from './ItinerarySetupFlow';

const HomeTab: React.FC = () => {
  const firstName = useSelector((state: SotaState) => state.user.firstName);
  const lastName = useSelector((state: SotaState) => state.user.lastName);
  const itineraryName = useSelector(
    (state: SotaState) => state.transitItinerary.name
  );
  const locationName = useSelector(
    (state: SotaState) => state.transitItinerary.locationName
  );
  const [showModal, setShowModal] = useState(false);
  return (
    <IonPage>
      <IonContent>
      <IonTitle>Welcome {`${firstName} ${lastName}`}!</IonTitle>
      <IonTitle>
        {itineraryName ? `${itineraryName}` : 'No Itinerary Yet'}
      </IonTitle>
      <IonItem href="tab2" className="ion-activated">
        <IonCard>
          <IonTitle>
            {locationName ? `${locationName}` : 'No Location Yet'}
          </IonTitle>
        </IonCard>
      </IonItem>
      <IonTitle>Add Itinerary</IonTitle>
      <IonItem href="tab1">
      <IonIcon icon={addCircleOutline} size="large" />
        <IonModal isOpen={showModal}>
          <InputForm />
          {/* <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton> */}
        </IonModal>
        <IonButton onClick={() => setShowModal(true)}>Add Itinerary</IonButton>
      </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default HomeTab;
