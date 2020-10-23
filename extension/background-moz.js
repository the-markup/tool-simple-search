browser.runtime.onInstalled.addListener(function (details) {
	browser.storage.sync.set({"toggle": true});
});

browser.browserAction.onClicked.addListener(function(tab) {
	// Get the current setting

	var key = "toggle";
	browser.storage.sync.get([key], function(result) {
		var toggle = result[key];

		// flip the setting
		toggle = !toggle;

		//save the new setting
		browser.storage.sync.set({'toggle': toggle});
	});
});

browser.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
    	if (key === 'toggle') {
    		console.log('changed!!');
    		updateIcon();
    	}
    }
});

function updateIcon() {
	var key = "toggle";
	browser.storage.sync.get([key], function(result) {
		var toggle = result[key];

		if (toggle) {
			browser.browserAction.setIcon({
				"path": 'icons/on.png'
			});
		} else {
			browser.browserAction.setIcon({
				"path": 'icons/off.png'
			});
		}
	});
}