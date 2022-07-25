// Import the functions you need from the SDKs you need
const {initializeApp,applicationDefault} = require("firebase-admin/app");


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    credential: applicationDefault(),
    databaseURL:"https://test-app2-177a1-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

module.exports = app;


