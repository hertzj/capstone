import React from 'react';
import { IonReorderGroup, IonPage, IonIcon, IonItem, IonLabel, IonReorder, IonContent, IonImg } from '@ionic/react';
import { ItemReorderEventDetail } from '@ionic/core';
//import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

function doReorder(event: CustomEvent<ItemReorderEventDetail>) {
  // The `from` and `to` properties contain the index of the item
  // when the drag started and ended, respectively
  console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

  // Finish the reorder and position the item in the DOM based on
  // where the gesture ended. This method can also be called directly
  // by the reorder group
  event.detail.complete();
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        {/*-- The reorder gesture is disabled by default, enable it to drag and drop items --*/}
        <IonReorderGroup disabled={false} onIonItemReorder={doReorder}>
          {/*-- Default reorder icon, end aligned items --*/}
          <IonItem>
            <IonImg src={"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.lonelyplanet.com%2Fusa%2Fhawaii&psig=AOvVaw2wmStOx1XrCWYatqVojzpm&ust=1582855740616000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLC1k6TT8OcCFQAAAAAdAAAAABAD"}></IonImg>
            <IonLabel>Item 1</IonLabel>
            <IonReorder slot="end" />
          </IonItem>

          

          <IonItem>
            <IonLabel>Item 2</IonLabel>
            <IonReorder slot="end" />
          </IonItem>

          {/*-- Default reorder icon, start aligned items --*/}
          <IonItem>
            <IonReorder slot="start" />
            <IonLabel>Item 3</IonLabel>
          </IonItem>

          <IonItem>
            <IonReorder slot="start" />
            <IonLabel>Item 4</IonLabel>
          </IonItem>

          {/*-- Custom reorder icon end items --*/}
          <IonItem>
            <IonLabel>Item 5</IonLabel>
            <IonReorder slot="end">
              <IonIcon name="pizza" />
            </IonReorder>
          </IonItem>

          <IonItem>
            <IonLabel>Item 6</IonLabel>
            <IonReorder slot="end">
              <IonIcon name="pizza" />
            </IonReorder>
          </IonItem>

          {/*-- Items wrapped in a reorder, entire item can be dragged --*/}
          <IonReorder>
            <IonItem>
              <IonLabel>Item 7</IonLabel>
            </IonItem>
          </IonReorder>

          <IonReorder>
            <IonItem>
              <IonLabel>Item 8</IonLabel>
            </IonItem>
          </IonReorder>
        </IonReorderGroup>
      </IonContent>

    </IonPage>
  );
};

export default Tab2;
