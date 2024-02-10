// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, ReCaptchaV3Provider } from 'firebase/app-check';

const firebaseConfig = {
  apiKey: 'AIzaSyA5YvcgWwaEd0peH8q_YYKDdYs2cv2o05Y',
  authDomain: 'policy-db.firebaseapp.com',
  projectId: 'policy-db',
  storageBucket: 'policy-db.appspot.com',
  messagingSenderId: '681212162559',
  appId: '1:681212162559:web:d62bf83caa104c306f77ca',
  measurementId: 'G-RF37VLFW3T'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
// connectFunctionsEmulator(functions, '127.0.0.1', 5001);

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
// https://firebase.google.com/docs/app-check/web/recaptcha-provider#web-modular-api
// initializeAppCheck(app, {
//   provider: new ReCaptchaEnterpriseProvider('6LcGmW0pAAAAAHJJ-au6_vjcVHNCI57bCMn83w8v'), // 'policy-db.web.app' https://console.cloud.google.com/security/recaptcha/6LexO2spAAAAAGmp6tHqDo9ruSVLoBN-I1fu10K2/edit?project=policy-db&supportedpurview=project
//   isTokenAutoRefreshEnabled: true
// });
// initializeAppCheck(app, {
//   provider: new ReCaptchaEnterpriseProvider('6LexO2spAAAAAGmp6tHqDo9ruSVLoBN-I1fu10K2'), // 'policy-db.web.app' https://console.cloud.google.com/security/recaptcha/6LexO2spAAAAAGmp6tHqDo9ruSVLoBN-I1fu10K2/edit?project=policy-db&supportedpurview=project
//   isTokenAutoRefreshEnabled: true
// });
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LdU2G0pAAAAAE4sUMp9oUpR9JNkOjMQPfipAlhE'),
  isTokenAutoRefreshEnabled: true
});
// initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider('6LexO2spAAAAAGmp6tHqDo9ruSVLoBN-I1fu10K2'),
//   isTokenAutoRefreshEnabled: true
// });

export { app, functions };
