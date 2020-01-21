  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAnmasBnxiWXGGfackzII3w19FoaP6Iyps",
    authDomain: "coin-fever-v2.firebaseapp.com",
    databaseURL: "https://coin-fever-v2.firebaseio.com",
    projectId: "coin-fever-v2",
    storageBucket: "coin-fever-v2.appspot.com",
    messagingSenderId: "114710585727",
    appId: "1:114710585727:web:16b665ae9b9bf4794a3a4a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var uiConfig = {
signInSuccessUrl: '<url-to-redirect-to-on-success>',
signInOptions: [
  // Leave the lines as is for the providers you want to offer your users.
  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  firebase.auth.GithubAuthProvider.PROVIDER_ID,
  firebase.auth.EmailAuthProvider.PROVIDER_ID,
  firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
],
// tosUrl and privacyPolicyUrl accept either url string or a callback
// function.
// Terms of service url/callback.
tosUrl: '<your-tos-url>',
// Privacy policy url/callback.
privacyPolicyUrl: function() {
  window.location.assign('<your-privacy-policy-url>');
}
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
