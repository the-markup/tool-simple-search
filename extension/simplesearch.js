// Make Markup Label
const markupLabel = document.createElement('p');
markupLabel.classList.add('ss-label');
markupLabel.innerHTML = 'Simple Search by <a class="ss-label__link" href="https://themarkup.org" target="_blank">The Markup</a>';

// Make close button
const closeButton = document.createElement('div');
closeButton.classList.add('ss-close');
closeButton.innerHTML = '<p class="ss-close__label">View Original Results</p><svg version="1.1" class="ss-close__button" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 1024 1024" xml:space="preserve"><path d="M91.6 91.6l840.8 840.8M932.4 91.6L91.6 932.4"/></svg>';
closeButton.addEventListener('click', function() {
	closeSimpleSearch();
});

// Make header
const controls = document.createElement('div');
controls.classList.add('ss-header');
controls.appendChild(markupLabel);
controls.appendChild(closeButton);

// Make results box
const results = document.createElement('div');
results.classList.add('ss-results');

// Make footer
const explanation = document.createElement('div');
explanation.classList.add('ss-footer');
explanation.innerHTML = '<h3 class="ss-footer__title">TK TK TK</h3><p class="ss-footer__description">TK TKTKTKTKTKTKTTKTK TK TK <a class="ss-footer__link" target="_blank" href="https://themarkup.org">themarkup.org</a></p>';


// Make box
const viewbox = document.createElement('div');
viewbox.classList.add('ss-box');
viewbox.appendChild(controls);
viewbox.appendChild(results);
viewbox.appendChild(explanation);

// Make blur box 
const blurbox = document.createElement('div');
blurbox.classList.add('ss-blurbox');
blurbox.appendChild(viewbox);
blurbox.addEventListener('click', function(e) {
	if (e.target.classList.contains('ss-blurbox')) {
		closeSimpleSearch();
	}
});

let whereAmI;

function showPopup() {
	whereAmI = window.location.hostname;

	if (whereAmI.includes('google')) {
		const googleResults = document.querySelectorAll('div#rso > div.g > div.rc');

		if (googleResults.length > 0) {
			// Populate new results with those clean results
			googleResults.forEach(function(result, i) {
				const linkEl = result.querySelector('a');
				const url = linkEl.href;
				const rel = linkEl.rel;
				const title = result.querySelector('h3').innerHTML;
				const desc = result.querySelector('div > div > span > span:last-of-type');
				const cite = result.querySelector('cite');

				if (desc && cite) {
					results.innerHTML += '<div class="ss-result"><h4 class="ss-result__cite">' + cite.innerText + '</h4><a href="' + url + '" rel="' + rel + '" class="ss-result__link">' + title + '</a><p class="ss-result__description">' + desc.innerHTML + '</p></div>';
				} else if (cite) {
					results.innerHTML += '<div class="ss-result"><h4 class="ss-result__cite">' + cite.innerText + '</h4><a href="' + url + '" rel="' + rel + '" class="ss-result__link">' + title + '</a><p class="ss-result__description">' + '</p></div>';
				}
			});

			// Get page navigation and add to the box
			if (document.querySelector('#foot h1')) {
				const navigation = document.querySelector('#foot');
				const didYouMean = document.querySelector('#fprs');
				const clonedNavigation = navigation.cloneNode(true);
				results.append(clonedNavigation);

				if (didYouMean) {
					const clonedDidYouMean = didYouMean.cloneNode(true);
					results.prepend(didYouMean);
				}
			}

			// Add placeholder for results if we've found results
			document.querySelector('#rcnt').prepend(blurbox);

			// Get Google Height
			const googleResultsHeight = document.querySelector('#rcnt').clientHeight;

			// Set a class to make it all visible
			document.querySelector('html').classList.add('ss--has-results', 'ss--is-google');

			// Get Simple Height
			const simpleSearchHeight = viewbox.clientHeight;

			// Cut off original results to stop the page from being super long
			document.querySelector('#rcnt').style.height = (simpleSearchHeight + 100) + 'px';

			document.querySelector('.ss-footer__title').textContent = 'TK TK TK You Saved ' + (googleResultsHeight - simpleSearchHeight) + ' pixels TK TK TK';
		} else {
			document.querySelector('html').classList.add('ss--no-results');
		}
	} else if (whereAmI.includes('bing')) {
		const bingResults = document.querySelectorAll('li.b_algo');

		if (bingResults.length > 0) {
			document.querySelector('body').prepend(blurbox);

			bingResults.forEach(function (result, i) {
				const resultTitle = result.querySelector('h2 > a');
				const resultHref = resultTitle.href;
				const resultH = resultTitle.h;
				const resultDesc = result.querySelector('p');
				const resultCite = result.querySelector('cite');

				if (resultTitle && resultDesc && resultCite) {
					results.innerHTML += '<div class="ss-result">' + 
						'<a href="' + resultHref + '" h="' + resultH + '" class="ss-result__link">' + resultTitle.innerText + '</a>' + 
						'<h4 class="ss-result__cite">' + resultCite.innerText + '</h4>' + 
						'<p class="ss-result__description">' + resultDesc.innerText + '</p>' + 
						'</div>';
				}
			});

			// Get page navigation and add to the box
			if (document.querySelector('.b_pag')) {
				const navigation = document.querySelector('.b_pag');
				const clonedNavigation = navigation.cloneNode(true);
				results.append(clonedNavigation);
			}

			// Add placeholder for results if we've found results
			document.querySelector('#b_content').prepend(blurbox);

			// Get Google Height
			const googleResultsHeight = document.querySelector('#b_content').clientHeight;

			// Set a class to make it all visible
			document.querySelector('html').classList.add('ss--has-results', 'ss--is-bing');

			// Get Simple Height
			const simpleSearchHeight = viewbox.clientHeight;

			// Cut off original results to stop the page from being super long
			document.querySelector('#b_content').style.height = (simpleSearchHeight + 100) + 'px';

			document.querySelector('.ss-footer__title').textContent = 'TK TK TK You Saved ' + (googleResultsHeight - simpleSearchHeight) + ' pixels TK TK TK';
		} else {
			document.querySelector('html').classList.add('ss--no-results');
		}
	}
}

function closeSimpleSearch() {
	document.querySelector('html').classList.remove('ss--has-results');
	document.querySelector('html').classList.add('ss--no-results');

	if (document.querySelector('#rcnt')) {
		document.querySelector('#rcnt').style.height = 'auto';
	}

	if (document.querySelector('#b_content')) {
		document.querySelector('#b_content').style.height = 'auto';
	}
}

showPopup();

// Add event listener for subsequent Bing searches
if (whereAmI.includes('bing')) {
	document.addEventListener('search', () => {
		const url = window.location.href;

		const checkForNewURL = setInterval(() => {
			if (url !== window.location.href) {
				clearInterval(checkForNewURL);
				window.location.reload();
			}
		}, 20);
	})
}
