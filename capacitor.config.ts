import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'vueCapAuth',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    allowNavigation: ['https://192.168.178.66:8100'],
  }
};

export default config;
