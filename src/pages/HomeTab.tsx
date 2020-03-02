import './HomeTab.css';
import React from 'react';
import { IonCard, IonTitle, IonIcon, IonItem, IonPage } from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { SotaState } from '../redux';

const HomeTab: React.FC = () => {
  const firstName = useSelector((state: SotaState) => state.user.firstName);
  const lastName = useSelector((state: SotaState) => state.user.lastName);
  const itineraryName = useSelector(
    (state: SotaState) => state.transitItinerary.name
  );
  const locationName = useSelector(
    (state: SotaState) => state.transitItinerary.locationName
  );
  return (
    <IonPage>
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
      <IonIcon icon={addCircleOutline} size="large" />
    </IonPage>
  );
};

export default HomeTab;
