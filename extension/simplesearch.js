// Make Markup Label
const markupLabel = document.createElement('p');
markupLabel.classList.add('ss-label');
markupLabel.innerHTML = 'Results cleaned up by <a class="ss-label__link" href="https://themarkup.org" target="_blank">The Markup</a>';

// Make close button
const closeButton = document.createElement('div');
closeButton.classList.add('ss-close');
closeButton.innerHTML = '<p class="ss-close__label">View Original Results</p><svg version="1.1" class="ss-close__button" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 1024 1024" xml:space="preserve"><path d="M91.6 91.6l840.8 840.8M932.4 91.6L91.6 932.4"/></svg>';
closeButton.addEventListener('click', function() {
	document.querySelector('body').classList.remove('ss--has-results');
});

// Make header
const controls = document.createElement('div');
controls.classList.add('ss-header');
controls.appendChild(markupLabel);
controls.appendChild(closeButton);

// Make results box
const results = document.createElement('div');
results.id = '_ss_results';

// Make footer
const explanation = document.createElement('div');
explanation.classList.add('ss-footer');
explanation.innerHTML = '<h3 class="ss-footer__title">Did you know? 41% of the first page of Google search results is taken up by Google products.</h3><p class="ss-footer__description">That\'s why we, at The Markup, built this browser extension. You can learn more about this and our investigation into Google Search results on <a class="ss-footer__link" target="_blank" href="https://themarkup.org">themarkup.org</a></p>';

// Make box
const viewbox = document.createElement('div');
viewbox.classList.add('ss-box');
viewbox.appendChild(controls);
viewbox.appendChild(results);
viewbox.appendChild(explanation);

function showPopup() {
	// Get Page Results
	const googleResults = document.querySelectorAll('.rc');

	if (googleResults.length > 0) {
		// Add placeholder for results if we've found results
		document.querySelector('#center_col').prepend(viewbox);

		// Populate new results with those clean results
		googleResults.forEach(function(result, i) {
			console.log(result);
			const linkEl = result.querySelector('a');
			const url = linkEl.href;
			const rel = linkEl.rel;
			const title = result.querySelector('h3').innerHTML;
			const desc = result.querySelector('div > div > span > span:last-of-type');
			const cite = result.querySelector('cite');

			if (desc && cite) {
				results.innerHTML += '<div class="ss-result"><h4 class="ss-result__cite">' + cite.innerText + '</h4><a href="' + url + '" rel="' + rel + '" class="ss-result__link">' + title + '</a><p class="ss-result__description">' + desc.innerHTML + '</p></div>';
			}
		});

		// Set a class to make it all visible
		document.querySelector('body').classList.add('ss--has-results');
	}
}

showPopup();