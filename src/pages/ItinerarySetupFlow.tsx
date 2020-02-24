import React from 'react';
import { IonSegment, IonSegmentButton, IonSlides, IonSlide, IonDatetime, IonInput, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonItem, IonLabel } from '@ionic/react'

const slideOpts = {
    initialSlide: 1,
    speed: 400
};

const InputForm: React.FC = () => (
    <IonContent>
        <IonSlides pager={true} options={slideOpts}>
            <IonSlide>
                <IonCard>
                    <IonCardHeader>
                        <IonCardSubtitle>Location</IonCardSubtitle>
                        <IonCardTitle>Enter Location</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonInput placeholder="Enter Location"></IonInput>
                    </IonCardContent>
                </IonCard>
            </IonSlide>
            <IonSlide>
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

            </IonSlide>
            <IonSlide>
                <IonCard>
                    <IonSegment onIonChange={e => console.log('Segment selected', e.detail.value)}>
                        <IonSegmentButton value="$">
                            <IonLabel>$</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="$$">
                            <IonLabel>$$</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="$$$">
                            <IonLabel>$$$</IonLabel>
                        </IonSegmentButton>
                    </IonSegment>
                </IonCard>
            </IonSlide>
        </IonSlides>



       
       
        
    </IonContent>
);

export default InputForm

