import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import {
  IonPage,
  IonContent,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonInput,
  IonList,
  IonLabel,
  IonItem,
  IonButton,
  IonRouterLink,
  useIonViewWillEnter,
} from '@ionic/react';
import { signInThunk, initialLogInAttempt, signUpThunk } from '../redux/user';

const SignUpContainer: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e: CustomEvent) => {
    if (e.target) {
      // @ts-ignore
      switch (e.target.name) {
        case 'firstName':
          setFirstName(e.detail.value);
          break;
        case 'lastName':
          setLastName(e.detail.value);
          break;
        case 'city':
          setCity(e.detail.value);
          break;
        case 'email':
          setCity(e.detail.value);
          break;
        case 'password':
          setPassword(e.detail.value);
          break;
        default:
          break;
      }
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      city,
      email,
      password,
    };
    dispatch(signUpThunk(user));
  };

  return (
    <form onSubmit={e => submit(e)}>
      <IonList>
        <IonItem>
          <IonLabel>First Name</IonLabel>
          <IonInput
            required
            name="firstName"
            type="text"
            onIonChange={e => handleChange(e)}
          ></IonInput>
          <IonLabel>Last Name</IonLabel>
          <IonInput
            required
            name="lastName"
            type="text"
            onIonChange={e => handleChange(e)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>City</IonLabel>
          <IonInput
            type="text"
            name="city"
            onIonChange={e => handleChange(e)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Email</IonLabel>
          <IonInput
            required
            name="email"
            type="email"
            onIonChange={e => handleChange(e)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Password</IonLabel>
          <IonInput
            required
            name="password"
            type="password"
            onIonChange={e => handleChange(e)}
          ></IonInput>
        </IonItem>
        <div className="signInButton">
          <IonButton type="submit">Sign Up</IonButton>
        </div>
      </IonList>
    </form>
  );
};

export default SignUpContainer;
