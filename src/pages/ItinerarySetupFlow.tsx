import React from 'react';
import Calendar from 'react-calendar';

import { IonSegment, IonSegmentButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonItem, IonLabel, IonSelect, IonSelectOption, IonChip, IonAvatar, IonIcon, IonList, IonCheckbox } from '@ionic/react'


const form = [
    { text: 'Art', val:'art', isChecked: true },
    { text: 'Child-Friendly', val: 'character-Kid_friendly', isChecked: false },
    { text: 'Food', val: 'food', isChecked: false },
    { text: 'Cafe', val: 'poitype-Cafe', isChecked: false },
    { text: 'Night Life', val: 'nightlife', isChecked: false }, 
    { text: 'Outdoor Activities', val: 'exploringnature', isChecked: false }, 
    { text: 'Theatre', val: 'showstheatresandmusic', isChecked: false }, 
    { text: 'Unique Neighborhooods', val: 'poitype-Interesting_neighbourhood', isChecked: false }, 
    { text: 'Shopping', val: 'poitype-Shopping_district', isChecked: false }, 
    { text: 'Sightseeing', val: 'sightseeing', isChecked: false }, 
    { text: 'Top Attractions', val: 'topattractions', isChecked: false }, 
];

const InputForm: React.FC = () => (
    <IonContent>
        <form>
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Location</IonCardTitle>
                <IonSelect interface="popover" placeholder="Select Location"> 
                    <IonSelectOption value="New New_York_City">New York</IonSelectOption>
                    <IonSelectOption value="Bangkok">Bangkok</IonSelectOption>
                    <IonSelectOption value="Paris">Paris</IonSelectOption>
                    <IonSelectOption value="London">London</IonSelectOption>
                    <IonSelectOption value="Dubai">Dubai</IonSelectOption>
                    <IonSelectOption value="Kuala_Lumpur">Kuala Lumpur</IonSelectOption>
                    <IonSelectOption value="Singapore">Singapore</IonSelectOption>
                    <IonSelectOption value="Tokyo">Tokyo</IonSelectOption>
                    <IonSelectOption value="Seoul">Seoul</IonSelectOption>
                </IonSelect>
                </IonCardHeader>
            </IonCard>
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Dates</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonItem>
                    <Calendar
                        // onChange={this.onChange}
                        // value={this.state.date}
                    />
                </IonItem>
            </IonCardContent>
        </IonCard>

        <IonCard>
            <IonCardTitle>Price Range</IonCardTitle>
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
        <IonCard>
                <IonCardTitle>Categories</IonCardTitle>
                <IonList>
                    {form.map(({ val, text, isChecked }) => (
                        <IonItem key={val}>
                            <IonLabel>{text}</IonLabel>
                            <IonCheckbox slot="end" value={val} checked={isChecked} />
                        </IonItem>
                    ))}
                </IonList>
        </IonCard>
        </form> 
    </IonContent>
);

export default InputForm
