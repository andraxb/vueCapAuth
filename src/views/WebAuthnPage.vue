<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>WebAuthn Registration</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <ion-button expand="block" @click="registerCredential">
          Register Credential
        </ion-button>
        <div v-if="credentialData">
          <h2>Credential Created</h2>
          <pre>{{ credentialData }}</pre>
        </div>
        <!-- <ion-button expand="block" @click="login()">
          Login
        </ion-button> -->
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
  
  export default defineComponent({
    name: 'WebAuthnRegistration',
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonButton
    },
    setup() {
      const credentialData = ref("");
  
      const registerCredential = async () => {
        try {
          // Create a random challenge using crypto.getRandomValues
          const challenge = crypto.getRandomValues(new Uint8Array(32));
          
          const publicKeyOptions: PublicKeyCredentialCreationOptions = {
            rp: {
              name: 'vueCapAuth',
              // Use window.location.hostname if your local server domain matches your RP id.
              id: window.location.hostname  
            },
            user: {
              // Convert your user id (should be a byte array)
              id: new TextEncoder().encode('4339212'),
              name: 'testuser@example.com',
              displayName: 'Test User'
            },
            challenge,
            pubKeyCredParams: [
              { type: 'public-key', alg: -7 } // ES256 algorithm
            ],
            authenticatorSelection: {
              authenticatorAttachment: 'platform',
              requireResidentKey: false,
              userVerification: 'preferred'
            },
            timeout: 60000,
            attestation: 'none'
          };
  
          // Use the WebAuthn API to create a credential.
          const credential: any = await navigator.credentials.create({ publicKey: publicKeyOptions });
          console.log('Credential created:', credential);
          credentialData.value = JSON.stringify(credential, null, 2);
  
          // TODO: Send the credential to your backend server for further processing.
          window.parent.postMessage('test', '*');
          window.parent.postMessage(JSON.stringify(credential), '*');
        } catch (err: any) {
          console.error('Error during WebAuthn registration:', err);
        }
      };
      const login = async () => {

      }
  
      return { registerCredential, login, credentialData };
    }
  });
  </script>
  
  <style scoped>
  /* Optional: Add custom styles here */
  </style>
  