// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
 /** Dev2.0 enviroment */

  // firebase : {
  //   apiKey: "AIzaSyD7J54YJRxNC1bnrCQfNk7qoAtMwiVTmgk",
  //   authDomain: "birralandia.firebaseapp.com",
  //   databaseURL: "https://birralandia.firebaseio.com",
  //   projectId: "birralandia",
  //   storageBucket: "",
  //   messagingSenderId: "739399867502",
  //   appId: "1:739399867502:web:22a00eef255de7ad"
  // }

  /** Dev 1.0 Enviroment */
  
  firebase : {
    apiKey: "AIzaSyCLoF1mpKuhEzSgaxlhI1wpI74mq-KkB3M",
    authDomain: "belgica-d.firebaseapp.com",
    databaseURL: "https://belgica-d.firebaseio.com",
    projectId: "belgica-d",
    storageBucket: "belgica-d.appspot.com",
    messagingSenderId: "520684756316",
    appId: "1:520684756316:web:7f06f1deeeb5c0ea4fb599"
  }
};

// Initialize Firebase

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
