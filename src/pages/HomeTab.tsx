import './HomeTab.css';
import React from 'react';
import { IonCard, IonTitle, IonIcon, IonItem, IonPage } from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';

const HomeTab: React.FC = () => {
return(
    <IonPage>
        <IonTitle>Welcome Name!</IonTitle>
        <IonTitle>Current Itinerary</IonTitle>
        <IonItem href="tab2" className="ion-activated">
        <IonCard>
        <IonTitle>New York</IonTitle>
        </IonCard>
        </IonItem>
        <IonTitle>Add Itinerary</IonTitle>
        <IonIcon icon={addCircleOutline} size="large"/>
    </IonPage>
)
}

export default HomeTab;