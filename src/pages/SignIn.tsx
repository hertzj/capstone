import React, { useState, FormEvent, useEffect } from 'react';
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
} from '@ionic/react';
import { signInThunk, initialLogInAttempt } from '../redux/user';

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
            <div className="signInButton">
              <IonButton type="submit">Sign In</IonButton>
              <IonRouterLink href="/signUp">
                Don't have an account, sign up!
              </IonRouterLink>
            </div>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default SignInForm;
