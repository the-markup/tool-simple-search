chrome.runtime.onInstalled.addListener(function (details) {
	chrome.storage.sync.set({"toggle": true});
});

chrome.browserAction.onClicked.addListener(function(tab) {
	// Get the current setting
	var key = "toggle";
	chrome.storage.sync.get([key], function(result) {
		var toggle = result[key];

		// flip the setting
		toggle = !toggle;

		//save the new setting
		chrome.storage.sync.set({'toggle': toggle});
	});
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
    	if (key === 'toggle') {
    		console.log('changed!!');
    		updateIcon();
    	}
    }
});

function updateIcon() {
	var key = "toggle";
	chrome.storage.sync.get([key], function(result) {
		var toggle = result[key];

		if (toggle) {
			chrome.browserAction.setIcon({path:"icons/on.png"});
		} else {
			chrome.browserAction.setIcon({path:"icons/off.png"});
		}
	});
}