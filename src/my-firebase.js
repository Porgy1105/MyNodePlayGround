var firebase = require("firebase");
var config = require('config');

const apikey = config.get('Firebase.apikey');
const domain = config.get('Firebase.domain');
const senderid = config.get('Firebase.senderid');

const fbconfig = {
    apiKey: apikey,
    authDomain: domain +".firebaseapp.com",
    databaseURL: "https://" + domain +".firebaseio.com",
    projectId: domain,
    storageBucket: domain + ".appspot.com",
    messagingSenderId: senderid
};

if (!firebase.apps.length) {
    firebase.initializeApp(fbconfig);
}

let insert = function (text) {
    firebase.database().ref("MyNodePlayGround").set({
            text: text
    });
}

firebase.database().ref("MyNodePlayGround").on('value', function (snapshot) {
    //let data = snapshot.val().text;
});

module.exports.insert = insert;