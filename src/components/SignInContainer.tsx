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
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { signInThunk, initialLogInAttempt } from '../redux/user';
import SignUpContainer from './SignUpContainer';

const SignInContainer: React.FC = () => {
  const [hasAccount, setHasAccount] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  useIonViewWillEnter(() => {
    dispatch(initialLogInAttempt());
    // need to redirect if this is true
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const info = {
      email,
      password,
    };
    dispatch(signInThunk(info));
    return null;
  };

  const signIn = () => {
    return (
      <form onSubmit={e => submit(e)}>
        <IonList>
          <IonItem>
            <IonLabel>Email</IonLabel>
            <IonInput
              required
              type="email"
              onIonChange={(e: CustomEvent) => {
                if (e.detail) {
                  setEmail(e.detail.value);
                }
              }}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Password</IonLabel>
            <IonInput
              required
              type="password"
              onIonChange={(e: CustomEvent) => {
                if (e.detail) {
                  setPassword(e.detail.value);
                }
              }}
            ></IonInput>
          </IonItem>
          <IonGrid>
            <IonRow class="ion-justify-content-center">
          <div className="signInButton">
            <IonCol>
            <IonButton type="submit">Sign In</IonButton>
            </IonCol>
            <IonCol>
                  <IonRouterLink class="ion-align-self-center	" onClick={() => setHasAccount(false)}>
              Don't have an account, sign up!
            </IonRouterLink>
            </IonCol>
            </div>
            </IonRow>
            </IonGrid>
        </IonList>
      </form>
    );
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign {hasAccount ? 'in' : 'up'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>{hasAccount ? signIn() : <SignUpContainer />}</IonContent>
    </>
  );
};

export default SignInContainer;
