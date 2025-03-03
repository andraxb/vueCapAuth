<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-button @click="openAuth()">
        Auth
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonButton, IonToolbar, IonContent, IonHeader, IonTitle } from '@ionic/vue';
// import { Browser } from '@capacitor/browser';
import { InAppBrowser, DefaultSystemBrowserOptions } from '@capacitor/inappbrowser';

export default defineComponent({
    name: 'TabsPage',
    components: {
     IonPage, IonButton, IonToolbar, IonContent, IonHeader, IonTitle
    },
    setup() {
      const openAuth = async() => {
        try {
          // Replace the URL with your local secure URL.
          // For example, if you serve your local website at capacitor://localhost/webauthn:
          // await Browser.open({ url: 'capacitor://localhost/webauthn' });
          
          await InAppBrowser.openInSystemBrowser({
              url: "https://192.168.178.66:8100/webauthn",
              options: DefaultSystemBrowserOptions
          });
        } catch (error) {
          console.error('Error opening browser', error);
        }
      }
      return { openAuth };
    }
  });
</script>
