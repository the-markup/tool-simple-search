
// when initially installed, set the toggle to true
chrome.runtime.onInstalled.addListener(function (details) {
	chrome.storage.sync.set({"toggle": true});
});

// when someone clicks, change the toggle setting
chrome.action.onClicked.addListener(function(tab) {
	// Get the current setting
	var key = "toggle";
	chrome.storage.sync.get([key], function(result) {
		var toggle = result[key];

		// flip the setting
		toggle = !toggle;

		// inform the page

		// update the icon
		updateIcon(toggle);

		//save the new setting
		chrome.storage.sync.set({'toggle': toggle});
	});
});

// listen for toggle setting change
/*
chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
    	if (key === 'toggle') {
    		console.log('changed!!');
    		updateIcon();
    	}
    }
});
*/

function updateIcon(toggle) {
	if (toggle) {
		chrome.browserAction.setIcon({
			"path": 'icons/on.png'
		});
	} else {
		chrome.browserAction.setIcon({
			"path": 'icons/off.png'
		});
	}
}
