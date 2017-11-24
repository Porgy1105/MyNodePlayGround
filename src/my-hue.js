var hue = require("node-hue-api"),
	HueApi = hue.HueApi,
	lightState = hue.lightState;

var host = "xxx.xxx.xxx.xxx",
	username = "xxxxxxxx",
	api = new HueApi(host, username),
	state = lightState.create(),
	lightId = 3;

var displayResult = function (result) {
	console.log(result);
};

var displayError = function (err) {
	console.error(err);
};

api.setLightState(lightId, state.on())
	.then(displayResult)
	.fail(displayError)
	.done();