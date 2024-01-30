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


    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]


"rewrites": [
      {
        "source": "/free/static/**",
        "destination": "/static/**"
      },
      {
        "source": "/free/**",
        "destination": "/index.html"
      }
    ]






















  <script>
    document.addEventListener('DOMContentLoaded', function () {
      const loadEl = document.querySelector('#load');
      // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
      // // The Firebase SDK is initialized and available here!
      //
      // firebase.auth().onAuthStateChanged(user => { });
      // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
      // firebase.firestore().doc('/foo/bar').get().then(() => { });
      // firebase.functions().httpsCallable('yourFunction')().then(() => { });
      // firebase.messaging().requestPermission().then(() => { });
      // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
      // firebase.analytics(); // call to activate
      // firebase.analytics().logEvent('tutorial_completed');
      // firebase.performance(); // call to activate
      //
      // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

      try {
        let app = firebase.app();
        let features = [
          'auth',
          'database',
          'firestore',
          'functions',
          'messaging',
          'storage',
          'analytics',
          'remoteConfig',
          'performance',
        ].filter(feature => typeof app[feature] === 'function');
        loadEl.textContent = `Firebase SDK loaded with ${features.join(', ')}`;
      } catch (e) {
        console.error(e);
        loadEl.textContent = 'Error loading the Firebase SDK, check the console.';
      }
    });
  </script>

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
