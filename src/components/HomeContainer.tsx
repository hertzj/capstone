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
  IonInfiniteScroll,
  IonVirtualScroll,
  IonCardHeader,
  IonCardTitle,
  IonText,
} from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';
import { useSelector, useDispatch } from 'react-redux';
import { SotaState } from '../redux';
import { signOutThunk } from '../redux/user';
import InputForm from '../pages/ItinerarySetupFlow';
import { getItinerary } from '../redux/planningItinerary';

const HomeContainer: React.FC = () => {
  const dispatch = useDispatch();
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
          <IonCard key={itineraryObj.id}>
            <IonCardHeader>
              <IonCardSubtitle>Itinerary Name</IonCardSubtitle>
              <IonCardTitle
                onClick={() => {
                  if (itineraryObj.id) {
                    dispatch(getItinerary(itineraryObj.id));
                  }
                }}
              >
                {itineraryObj.name}
              </IonCardTitle>
            </IonCardHeader>
          </IonCard>
        );
      });
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome {`${firstName} ${lastName}`}!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollEvents={true}>
        <IonItem>
          <IonText color="primary">
            <h1>Itineraries</h1>
          </IonText>
        </IonItem>
        <IonList>
          {makeListOfItineraryNames()}
        </IonList>
        <IonModal isOpen={showModal}>
          <InputForm />
          <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
        </IonModal>
        <IonGrid>
          <IonRow className="ion-justify-content-evenly">
            <IonCol class="ion-justify-content-center">
              <IonButton expand="block" onClick={() => setShowModal(true)}>
                Add Itinerary
              </IonButton>
            </IonCol>
            <IonCol class="ion-justify-content-center">
              <IonButton
                color="primary"
                fill="outline"
                expand="block"
                onClick={() => dispatch(signOutThunk())}
              >
                Sign Out
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
};

export default HomeContainer;
