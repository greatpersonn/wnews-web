export const env = {
  appName: 'Weazel News',
  apiMode: 'firestore' as 'mock' | 'firestore',

  firebase: {
    apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY as string,
    authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN as string,
    projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID as string,
    storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
    appId: import.meta.env.PUBLIC_FIREBASE_APP_ID as string,
  },
};