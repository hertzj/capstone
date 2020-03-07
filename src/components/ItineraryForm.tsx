import React, { useState, FormEvent } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import { useDispatch } from 'react-redux';
// import * as moment from 'moment';

import {
    IonSegment,
    IonSegmentButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonChip,
    IonAvatar,
    IonIcon,
    IonList,
    IonCheckbox,
    IonInput,
    IonTitle,
    IonDatetime,
    IonButton,
} from '@ionic/react';
import { createNewItinerary } from '../redux/planningItinerary';

interface Tag {
    text: string;
    val: string;
    isChecked: boolean;
}

const InputForm: React.FC = () => {
    const form = [
        { text: 'Art', val: 'art', isChecked: false },
        { text: 'Child-Friendly', val: 'character-Kid_friendly', isChecked: false },
        { text: 'Food', val: 'eatingout', isChecked: false },
        { text: 'Cafe', val: 'poitype-Cafe', isChecked: false },
        { text: 'Night Life', val: 'nightlife', isChecked: false },
        { text: 'Outdoor Activities', val: 'exploringnature', isChecked: false },
        { text: 'Theatre', val: 'showstheatresandmusic', isChecked: false },
        {
            text: 'Unique Neighborhooods',
            val: 'poitype-Interesting_neighbourhood',
            isChecked: false,
        },
        { text: 'Shopping', val: 'poitype-Shopping_district', isChecked: false },
        { text: 'Sightseeing', val: 'sightseeing', isChecked: false },
        { text: 'Top Attractions', val: 'topattractions', isChecked: false },
    ];
    const dispatch = useDispatch();
    const tagsInitialState: string[] = [];
    const [name, setName] = useState('');
    const [budget, setBudget] = useState('');
    const [locationName, setLocationName] = useState('');
    const [startLocation, setStartLocation] = useState('');
    let [endLocation, setEndLocation] = useState('');
    const [tags, setTags] = useState(tagsInitialState);
    const [showTags, setShowTags] = useState(form);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [setShowModal] = useState(true);
    // consider moment here
    const [date, setDate] = useState(new Date());

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (!endLocation.length) {
            endLocation = startLocation;
        }
        const itinerary = {
            name,
            date,
            locationName,
            budget,
            startLocation,
            endLocation,
            startTime,
            endTime,
            tags,
        };
        // console.log('itinerary on submit: ', itinerary);
        dispatch(createNewItinerary(itinerary));
    };

    return (
        <IonContent>
            <form onSubmit={e => {
                // setShowModal(false)
                submit(e)}}>
                <IonCard>
                    <IonItem>
                        <IonLabel position="floating" class="card_title">
                            Itinerary Name
            </IonLabel>
                        <IonInput
                            required
                            type="text"
                            onIonChange={(e: CustomEvent) => {
                                if (e.detail) setName(e.detail.value);
                            }}
                        ></IonInput>
                    </IonItem>
                </IonCard>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>City</IonCardTitle>
                        <IonSelect
                            interface="popover"
                            placeholder="Select Location"
                            onIonChange={e => {
                                setLocationName(e.detail.value);
                            }}
                        >
                            <IonSelectOption value="New_York_City">New York</IonSelectOption>
                            <IonSelectOption value="Bangkok">Bangkok</IonSelectOption>
                            <IonSelectOption value="Paris">Paris</IonSelectOption>
                            <IonSelectOption value="London">London</IonSelectOption>
                            <IonSelectOption value="Dubai">Dubai</IonSelectOption>
                            <IonSelectOption value="Kuala_Lumpur">
                                Kuala Lumpur
              </IonSelectOption>
                            <IonSelectOption value="Singapore">Singapore</IonSelectOption>
                            <IonSelectOption value="Tokyo">Tokyo</IonSelectOption>
                            <IonSelectOption value="Seoul">Seoul</IonSelectOption>
                        </IonSelect>
                    </IonCardHeader>
                </IonCard>
                <IonCard>
                    <IonLabel position="floating">Starting Location</IonLabel>
                    <IonInput
                        required
                        type="text"
                        onIonChange={(e: CustomEvent) => {
                            if (e.detail) setStartLocation(e.detail.value);
                        }}
                    ></IonInput>
                    <IonLabel position="floating">End Location</IonLabel>
                    <IonInput
                        type="text"
                        onIonChange={(e: CustomEvent) => {
                            if (e.detail) setEndLocation(e.detail.value);
                        }}
                    ></IonInput>
                </IonCard>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Dates</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonItem>
                            <Calendar
                                onChange={selectedDate => {
                                    // @ts-ignore
                                    setDate(selectedDate);
                                }}
                                value={date}
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel>Start Time</IonLabel>
                            <IonDatetime
                                displayFormat="h:mm A"
                                onIonChange={(e: CustomEvent) => {
                                    const time = moment(e.detail.value).format('HH:mm');
                                    setStartTime(time);
                                }}
                            ></IonDatetime>
                        </IonItem>
                        <IonItem>
                            <IonLabel>End Time</IonLabel>
                            <IonDatetime
                                displayFormat="h:mm A"
                                onIonChange={(e: CustomEvent) => {
                                    const time = moment(e.detail.value).format('HH:mm');
                                    setEndTime(time);
                                }}
                            ></IonDatetime>
                        </IonItem>
                    </IonCardContent>
                </IonCard>

                <IonCard>
                    <IonCardTitle>Price Range</IonCardTitle>
                    <IonSegment
                        onIonChange={e => {
                            if (typeof e.detail.value === 'string') {
                                setBudget(e.detail.value);
                            }
                        }}
                    >
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
                        {showTags.map(({ val, text, isChecked }) => (
                            <IonItem key={val}>
                                <IonLabel>{text}</IonLabel>
                                <IonCheckbox
                                    slot="end"
                                    value={val}
                                    checked={isChecked}
                                    onIonChange={e => {
                                        if (e.detail.checked) {
                                            const newTags = [...tags, e.detail.value];
                                            const newShowTags = showTags.map((tag: Tag) => {
                                                if (tag.val === e.detail.value) {
                                                    tag.isChecked = true;
                                                }
                                                return tag;
                                            });
                                            setTags(newTags);
                                            setShowTags(newShowTags);
                                        } else {
                                            const newTags = tags.filter((tag: string) => {
                                                if (tag !== e.detail.value) return tag;
                                            });
                                            const newShowTags = showTags.map((tag: Tag) => {
                                                if (tag.val === e.detail.value) {
                                                    tag.isChecked = false;
                                                }
                                                return tag;
                                            });
                                            setTags(newTags);
                                            setShowTags(newShowTags);
                                        }
                                    }}
                                />
                            </IonItem>
                        ))}
                    </IonList>
                </IonCard>
                <IonButton type="submit" expand="block">
                    Create Itinerary
        </IonButton>
            </form>
        </IonContent>
    );
};

export default InputForm;
