var HueApi = require("node-hue-api").HueApi;

var displayResult = function (result) {
    console.log(JSON.stringify(result, null, 2));
};

var ip = "",
    username = "MyHue",
    api;

var displayUserResult = function (result) {
    console.log("Created user: " + JSON.stringify(result));
};

var displayError = function (err) {
    console.log(err);
};

var hue = new HueApi();

// --------------------------
// Using a promise
hue.registerUser(ip, newUserName, userDescription)
    .then(displayUserResult)
    .fail(displayError)
    .done();