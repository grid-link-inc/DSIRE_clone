locally host template with firebase
## where is firebase's run command?


## what is the template's?
react-script start in package.json

## how do I make firebase do what the template does?
look into CORS, CSP. permit app to look in various locations for various file types

public url
### where is PUBLIC URL "/free" getting set from?
- no clue
- but i can set it with export PUBLIC_URL
### homepage it set to 

### when i run yarn start where does it load assets from. /free?? but it doesn't exist

### when I emulate I get back index.html for the css and js request


# Live data
## firebase app
DONE
## cloud function
https://firebase.google.com/docs/functions/callable?gen=2nd
DONE

## Security
App check https://firebase.google.com/docs/app-check/cloud-functions
grant admin creds for Functions: https://firebase.google.com/docs/functions/local-emulator#set_up_admin_credentials_optional
env vars for secrets - not necessary: https://firebase.google.com/docs/projects/api-keys
squash commits

const firebaseConfig = {
    apiKey: "xxxx",
    authDomain: "policy-db.firebaseapp.com",
    projectId: "policy-db",
    storageBucket: "policy-db.appspot.com",
    messagingSenderId: "681212162559",
    appId: "1:681212162559:web:d62bf83caa104c306f77ca",
    measurementId: "G-RF37VLFW3T"
};

Run locally access secret
How do I access the secret?
How do I view the function

gcloud functions deploy get_programs \
--set-secrets 'PROTOTYPING_DB_PW=prototyping-db-pw:1'
--runtime RUNTIME \

## query
maube need: https://firebase.google.com/docs/functions/local-emulator#set_up_admin_credentials_optional
https://firebase.google.com/docs/functions/config-env?gen=2nd#node.js

## load into table






<!-- Firebase Config -->
  <!-- update the version number as needed -->
  <script defer src="/__/firebase/10.7.2/firebase-app-compat.js"></script>
  <!-- include only the Firebase features as you need -->
  <script defer src="/__/firebase/10.7.2/firebase-auth-compat.js"></script>
  <script defer src="/__/firebase/10.7.2/firebase-database-compat.js"></script>
  <script defer src="/__/firebase/10.7.2/firebase-firestore-compat.js"></script>
  <script defer src="/__/firebase/10.7.2/firebase-functions-compat.js"></script>
  <script defer src="/__/firebase/10.7.2/firebase-messaging-compat.js"></script>
  <script defer src="/__/firebase/10.7.2/firebase-storage-compat.js"></script>
  <script defer src="/__/firebase/10.7.2/firebase-analytics-compat.js"></script>
  <script defer src="/__/firebase/10.7.2/firebase-remote-config-compat.js"></script>
  <script defer src="/__/firebase/10.7.2/firebase-performance-compat.js"></script>
