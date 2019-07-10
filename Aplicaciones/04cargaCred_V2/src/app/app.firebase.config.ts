export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCgZJJ4U7kzVVSbY8u2wODFSmUQCSEg36Y",
  authDomain: "ppsAppVecinal.firebaseapp.com",
  databaseURL: "https://ppsAppVecinal.firebaseio.com",
  projectId: "ppsAppVecinal",
  storageBucket: "ppsAppVecinal.appspot.com",
  messagingSenderId: "205973701461",
  appId: "1:205973701461:android:f3f0cd9fda1e715d"
};

export const snapshotToArray = snapshot => {
  let returnArray = [];
  snapshot.forEach(element => {
    let item = element.val();
    item.key = element.key;
    returnArray.push(item);
  });

  return returnArray;
}