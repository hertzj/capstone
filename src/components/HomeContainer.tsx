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
  IonList,
  IonCardSubtitle,
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
          <IonCard style={{
            height: "20px", backgroundColor:"rgba(224,108,78,0.1)"}} key={itineraryObj.id}>
              <IonTitle>{itineraryObj.name}</IonTitle>
            <IonCardSubtitle>{itineraryObj.date}</IonCardSubtitle>
            </IonCard>
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
        </IonToolbar>
      </IonHeader>
      <IonList>
        {makeListOfItineraryNames()}
      </IonList>
      <IonContent>
        <IonModal isOpen={showModal}>
          <InputForm />
          <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
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
