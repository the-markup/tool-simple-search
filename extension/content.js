/* GENERATING BOX SKELETON */
let loaded = false;

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

let isActuallySearch;
isActuallySearch = (new URLSearchParams(window.location.search).get('tbm') === null);
let pageHeightForBing;
let pageHeightForGoogle;

// when page initially loads
function onStart() {
    var key = "toggle";
	chrome.storage.sync.get([key], function(result) {
		var toggle = result[key];

		if (toggle) {	
			console.log("toggle on!!!!!");
			loadSimpleSearch();
			openSimpleSearch();
		} else {
			return;
		}
	});
}

// when first loading simple search
function loadSimpleSearch() {
	if (isActuallySearch) {
		document.querySelector('html').classList.add('ss--loaded');

		if (whereAmI.includes('google')) {
			const googleResults = document.querySelectorAll('div#rso div.g div.tF2Cxc');
			if (googleResults.length > 0) {
				// Populate new results with those clean results
				googleResults.forEach(function(result, i) {
					const linkEl = result.querySelector('a');
					const url = linkEl.href;
					const rel = linkEl.rel;
					const title = result.querySelector('h3').innerHTML;
					const desc = result.querySelector('span.aCOpRe');
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
					const didYouMean = document.querySelector('#taw > div > div.med');
					const clonedNavigation = navigation.cloneNode(true);
					results.append(clonedNavigation);

					if (didYouMean) {
						const clonedDidYouMean = didYouMean.cloneNode(true);
						results.prepend(clonedDidYouMean);
					}
				}

				// Add placeholder for results if we've found results
				document.querySelector('#rcnt').prepend(blurbox);

				// Get Google Height
				pageHeightForGoogle = document.body.clientHeight;

				// Set a class to make it all visible
				document.querySelector('html').classList.add('ss--has-results', 'ss--is-google');
			} else {
				document.querySelector('html').classList.add('ss--no-results');
			}
		} else if (whereAmI.includes('bing')) {
			const bingResults = document.querySelectorAll('li.b_algo');

			if (bingResults.length > 0) {
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
				blurbox.style.top = document.querySelector('#b_content').offsetTop + "px";
				document.querySelector('html').appendChild(blurbox);

				// Get Engine Height
				pageHeightForBing = document.body.clientHeight;

				// Set a class to make it all visible
				document.querySelector('html').classList.add('ss--has-results', 'ss--is-bing');
			} else {
				document.querySelector('html').classList.add('ss--no-results');
			}
		}
		loaded = true;
	}
}

// when opening simple search (either automatically or via toggle)
function openSimpleSearch() {
	// Get Simple Height
	const simpleSearchHeight = viewbox.clientHeight;

	// Skip if there are no search results
	if (simpleSearchHeight == 0) {
		closeSimpleSearch();
		return;
	}

	if (whereAmI.includes('google') && isActuallySearch) {
		document.querySelector('html').classList.remove('ss--off');
		document.querySelector('html').classList.add('ss--on');

		// Cut off original results to stop the page from being super long
		document.querySelector('#rcnt').style.height = (simpleSearchHeight + 50) + 'px';
		document.querySelector('#rcnt').style.overflow = 'hidden';

		// Get New Page Height
		const pageHeightForSimple = document.body.clientHeight;

		// Get Difference 
		const pageDifference = (pageHeightForGoogle - pageHeightForSimple);
		const footCopy = generateDescriptiveCopy(pageHeightForGoogle, pageHeightForSimple, pageDifference );

		document.querySelector('.ss-footer__title').innerHTML = footCopy[0];
		document.querySelector('.ss-footer__description').innerHTML = footCopy[1];
	} else if (whereAmI.includes('bing')) {
		document.querySelector('html').classList.remove('ss--off');
		document.querySelector('html').classList.add('ss--on');

		// Get Footer Height
		const footerHeight = document.querySelector('#b_footer').clientHeight;
		const footerPadding = 12;

		// Cut off original results to stop the page from being super long
		document.querySelector('#b_content').style.height = (simpleSearchHeight) + 'px';
		blurbox.style.height = (simpleSearchHeight + 100 - footerHeight + footerPadding) + 'px';

		// Get Simple Search Page Height
		const pageHeightForSimple = document.body.clientHeight;

		// Get Difference 
		const pageDifference = (pageHeightForBing - pageHeightForSimple);
		const footCopy = generateDescriptiveCopy(pageHeightForBing, pageHeightForSimple, pageDifference ); 
		document.querySelector('.ss-footer__title').innerHTML = footCopy[0];
		document.querySelector('.ss-footer__description').innerHTML = footCopy[1];
	}
}

// when closing simple search (either thru click or toggle!)
function closeSimpleSearch() {

	document.querySelector('html').classList.remove('ss--on');
	document.querySelector('html').classList.add('ss--off');

	if (document.querySelector('#rcnt')) {
		document.querySelector('#rcnt').style.height = 'auto';
	}

	if (document.querySelector('#b_content')) {
		document.querySelector('#b_content').style.height = 'auto';
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

// when toggle changes
chrome.storage.onChanged.addListener(function(changes, namespace) {
	for (key in changes) {
		if (key === 'toggle') {
			var toggle = changes[key]['newValue'];

			if (toggle) {
				if (!loaded) {
					loadSimpleSearch();
				}
				openSimpleSearch();
			} else {
				closeSimpleSearch();
			}
		}
	}
});

// Add event listener for when user presses esc
document.addEventListener('keydown', e => {
	if(e.key === "Escape") {
		if (document.querySelector('html').classList.contains('ss--on')) {
			closeSimpleSearch();
		}
	}
})

// Add event listener for subsequent Bing searches
if (whereAmI.includes('bing')) {
	document.addEventListener('search', () => {
		const url = window.location.href;

		const checkForNewURL = setInterval(() => {
			if (url !== window.location.href) {
				loaded = false;
				clearInterval(checkForNewURL);
				window.location.reload();
			}
		}, 20);
	});
}

// onStart
onStart();
