import firebaseApp from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDZw12F-AQ1Khi2ZKXlQr5niAprPDA3Nd0",
    authDomain: "poliquick-6355f.firebaseapp.com",
    databaseURL: "https://poliquick-6355f.firebaseio.com",
    projectId: "poliquick-6355f",
    storageBucket: "poliquick-6355f.appspot.com",
    messagingSenderId: "962168557462",
    appId: "1:962168557462:web:7e654aaf875185de84d7b7"
  };

export class MyFirebase {
constructor() {
    if (firebase.apps.length === 0) {
        firebaseApp.initializeApp(firebaseConfig);
    }
}

createANOTHERUser(name: string, pass: string, cty: string, userage: string) {
    let newUserRef = firebase.database().ref('users');
    newUserRef.push().set(
        {
            username: name,
            password: pass,
            city: cty,
            age: userage
        }
    ).then(
        () => { console.log("Added the BRAND NEW new user successfully!"); },
        (reason: any) => (console.log("ERROR: Did NOT add the brand new user.  Reason: " + reason))
    );
}

updateObject(location: string, updates: {}, callWhenFinished: (err: Error | null) => void): void {
    let ref = firebase.database().ref(location);
    ref.update(updates, callWhenFinished); // This will call the 'callWhenFinished' function for us
}

}