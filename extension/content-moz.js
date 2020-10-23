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
//explanation.innerHTML = '<h3 class="ss-footer__title">TK TK TK</h3><p class="ss-footer__description">TK TKTKTKTKTKTKTTKTK TK TK <a class="ss-footer__link" target="_blank" href="https://themarkup.org">themarkup.org</a></p>';

const explanationHed = document.createElement('h3');
const explanationDek = document.createElement('p');
explanationHed.classList.add('ss-footer__title');
explanationDek.classList.add('ss-footer__description');
explanation.appendChild(explanationHed);
explanation.appendChild(explanationDek);

explanationHed.innerHTML = 'Like this tool?'
explanationDek.innerHTML = 'Want to play with more of our tools, or read more about how technology like search engines is affecting society? Read more at <a class="ss-footer__link" target="_blank" href="https://themarkup.org">themarkup.org</a>';

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
whereAmI = window.location.hostname;

function showPopup() {
	if (whereAmI.includes('google')) {
		const googleResults = document.querySelectorAll('div#rso > div.g div.rc');

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
				const didYouMean = document.querySelector('#taw');
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
			const pageHeightForGoogle = document.body.clientHeight;

			// Set a class to make it all visible
			document.querySelector('html').classList.add('ss--has-results', 'ss--is-google');

			// Get Simple Height
			const simpleSearchHeight = viewbox.clientHeight;

			// Cut off original results to stop the page from being super long
			document.querySelector('#rcnt').style.height = (simpleSearchHeight + 50) + 'px';

			// Get New Page Height
			const pageHeightForSimple = document.body.clientHeight;

			//document.querySelector('.ss-footer__title').textContent = 'TK TK TK You Saved ' + (pageHeightForGoogle - pageHeightForSimple) + ' pixels TK TK TK';

			// Get Difference 
			const pageDifference = (pageHeightForGoogle - pageHeightForSimple);

			const footCopy = generateDescriptiveCopy(pageHeightForGoogle, pageHeightForSimple, pageDifference ); 
			document.querySelector('.ss-footer__title').innerHTML = footCopy[0];
			document.querySelector('.ss-footer__description').innerHTML = footCopy[1];
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
			const pageHeightForBing = document.body.clientHeight;

			// Set a class to make it all visible
			document.querySelector('html').classList.add('ss--has-results', 'ss--is-bing');

			// Get Simple Height
			const simpleSearchHeight = viewbox.clientHeight;

			// Cut off original results to stop the page from being super long
			document.querySelector('#b_content').style.height = (simpleSearchHeight + 100) + 'px';

			// Get Simple Search Page Height
			const pageHeightForSimple = document.body.clientHeight;

			// Get Difference 
			const pageDifference = (pageHeightForBing - pageHeightForSimple);

			const footCopy = generateDescriptiveCopy(pageHeightForBing, pageHeightForSimple, pageDifference ); 
			document.querySelector('.ss-footer__title').innerHTML = footCopy[0];
			document.querySelector('.ss-footer__description').innerHTML = footCopy[1];


			//document.querySelector('.ss-footer__title').textContent = 'TK TK TK You Saved ' + (pageHeightForBing - pageHeightForSimple) + ' pixels TK TK TK';
		} else {
			document.querySelector('html').classList.add('ss--no-results');
		}
	}
}

function generateDescriptiveCopy( original, current, pageDifference ) {
	const copy = [
		[
			'Did you know?',
			"This page is " + pageDifference + " pixels shorter with Simple Search than the original. What's taking up all that extra space? Read more at <a class='ss-footer__link' target='_blank' href='https://themarkup.org'>themarkup.org</a>"
		], [
			'You saved ' + pageDifference + ' pixels.',
			"What's taking up all that extra space? You can always click \"View Original Results\" to find out. Check out our other tools and read our work at <a class='ss-footer__link' target='_blank' href='https://themarkup.org'>themarkup.org</a>"
		], [
			'Like this tool?',
			'Want to play with more of our tools, or read more about how technologies like search engines are affecting society? Read more at <a class="ss-footer__link" target="_blank" href="https://themarkup.org">themarkup.org</a>'
		], [
			'Like this tool?',
			'Thanks! We have a lot more stuff for you. Check out our other tools and read our work at our website, <a class="ss-footer__link" target="_blank" href="https://themarkup.org">themarkup.org</a>'
		],
	];

	const floooor = (pageDifference > 0) ? 0 : 2;
	const choice = Math.floor(Math.random() * (copy.length - floooor)) + floooor;

	return copy[choice];
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

function openSimpleSearch() {
	document.querySelector('html').classList.add('ss--has-results');
	document.querySelector('html').classList.remove('ss--no-results');
}

// MO PORTION

function checkSettings() {
	var key = "toggle";
	browser.storage.sync.get([key], function(result) {
		var toggle = result[key];

		if (toggle) {
			console.log("yep yep yep");
			showPopup();
		} else {
			closeSimpleSearch();
			console.log('nooooope');
		}
	});
}

// listen for storage changes
browser.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
    	if (key === 'toggle') {
    		console.log('changed!!');
    		checkSettings();
    	}
    }
});


checkSettings();

// END MO PORTION

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


