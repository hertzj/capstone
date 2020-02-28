import React from 'react';
import { IonIcon, IonAvatar, IonChip, IonSegment, IonSegmentButton, IonSlides, IonSlide, IonDatetime, IonInput, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonItem, IonLabel } from '@ionic/react'

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

                            <IonCardSubtitle>Start Date and Time</IonCardSubtitle>
                            <IonDatetime displayFormat="MM DD YY" placeholder="Select Date"></IonDatetime>
                            <IonDatetime displayFormat="HH:mm" placeholder="Select Time"></IonDatetime>
                        </IonItem>
                        <IonItem>
                            <IonCardSubtitle>End Date and Time</IonCardSubtitle>
                            <IonDatetime displayFormat="MM DD YY" placeholder="Select Date"></IonDatetime>
                            <IonDatetime displayFormat="HH:mm" placeholder="Select Time"></IonDatetime>
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
            <IonSlide>
                <IonChip>
                    <IonLabel>Default</IonLabel>
                </IonChip>

                <IonChip>
                    <IonLabel color="secondary">Secondary Label</IonLabel>
                </IonChip>

                <IonChip color="secondary">
                    <IonLabel color="dark">Secondary w/ Dark label</IonLabel>
                </IonChip>

                <IonChip>
                    <IonIcon name="pin" />
                    <IonLabel>Default</IonLabel>
                </IonChip>

                <IonChip>
                    <IonIcon name="heart" color="dark"/>
                    <IonLabel>Default</IonLabel>
                </IonChip>

                <IonChip>
                    <IonLabel>Button Chip</IonLabel>
                    <IonIcon name="close-circle" />
                </IonChip>

                <IonChip>
                    <IonIcon name="pin" color="primary" />
                    <IonLabel>Icon Chip</IonLabel>
                    <IonIcon name="close" />
                </IonChip>

                <IonChip>
                    <IonAvatar>
                        <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                    </IonAvatar>
                    <IonLabel>Avatar Chip</IonLabel>
                    <IonIcon name="close-circle" />
                </IonChip>
            </IonSlide>
        </IonSlides>
        
    </IonContent>
);

export default InputForm

