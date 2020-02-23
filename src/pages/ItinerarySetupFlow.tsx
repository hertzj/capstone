import React from 'react';
import { IonDatetime, IonInput, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonIcon, IonItem, IonLabel } from '@ionic/react'

const CardExample: React.FC = () => (
    <IonContent>
        <IonCard>
            <IonCardHeader>
                <IonCardSubtitle>Location</IonCardSubtitle>
                <IonCardTitle>Enter Location</IonCardTitle>    
            </IonCardHeader>
            <IonCardContent>
                <IonInput placeholder="Enter Location"></IonInput>
      </IonCardContent>
        </IonCard>

        <IonCard>
            <IonCardHeader>
                <IonCardSubtitle>Dates</IonCardSubtitle>
                <IonCardTitle>Select Dates</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonItem>
                    <IonCardSubtitle>Start Date</IonCardSubtitle>
                    <IonLabel>MM DD YY</IonLabel>
                    <IonDatetime displayFormat="MM DD YY" placeholder="Select Date"></IonDatetime>
                </IonItem>
                <IonItem>
                    <IonCardSubtitle>End Date</IonCardSubtitle>
                    <IonLabel>MM DD YY</IonLabel>
                    <IonDatetime displayFormat="MM DD YY" placeholder="Select Date"></IonDatetime>
                </IonItem>
            </IonCardContent>
        </IonCard>

        <IonCard>
            <IonItem href="#" className="ion-activated">
                <IonIcon name="wifi" slot="start" />
                <IonLabel>Card Link Item 1 activated</IonLabel>
            </IonItem>

            <IonItem href="#">
                <IonIcon name="wine" slot="start" />
                <IonLabel>Card Link Item 2</IonLabel>
            </IonItem>

            <IonItem className="ion-activated">
                <IonIcon name="warning" slot="start" />
                <IonLabel>Card Button Item 1 activated</IonLabel>
            </IonItem>

            <IonItem>
                <IonIcon name="walk" slot="start" />
                <IonLabel>Card Button Item 2</IonLabel>
            </IonItem>
        </IonCard>
    </IonContent>
);

export default CardExample