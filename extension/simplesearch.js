// Make Markup Label
const markupLabel = document.createElement('p');
markupLabel.classList.add('ss-label');
markupLabel.innerHTML = 'Results cleaned up by <a class="ss-label__link" href="https://themarkup.org" target="_blank">The Markup</a>';

// Make close button
const closeButton = document.createElement('div');
closeButton.classList.add('ss-close');
closeButton.innerHTML = '<p class="ss-close__label">View Original Results</p><svg version="1.1" class="ss-close__button" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 1024 1024" xml:space="preserve"><path d="M91.6 91.6l840.8 840.8M932.4 91.6L91.6 932.4"/></svg>';
closeButton.addEventListener('click', function(e) {
	console.log('clicked');

	// Figure out how Maddy swapped out simple results for old ones
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
explanation.id = '_ss_footer';
explanation.innerHTML = "<h3>Did you know? 41% of the first page of Google search results is taken up by Google products.</h3> That's why we, at The Markup, built this browser extension. You can learn more about this and our investigation into Google Search results on themarkup.org";

// Make box
const viewbox = document.createElement('div');
viewbox.id = '_ss_box';
viewbox.appendChild(controls);
viewbox.appendChild(results);
viewbox.appendChild(explanation);

const blur = document.createElement('blur');

function showPopup() {
	console.log('show popup');
	var y = document.getElementsByClassName("rc");
	if (y.length > 0) {
		//document.scrollingElement.scrollTop = 0;

		document.getElementById('center_col').insertBefore(viewbox, document.getElementById('center_col').firstChild);

		for (var i = 0; i < y.length; i++) {
  			var ttl = y[i].getElementsByClassName('r')[0].getElementsByTagName('a')[0];
  			var link = ttl.href;
  			var rel = ttl.rel;
  			var cont = ttl.getElementsByTagName('h3')[0].innerText;

  			var title = "<a href='" + link + "' rel='" + rel + "'><h3>" + cont + "</h3></a>";
  			var desc = y[i].getElementsByClassName('st')[0].innerHTML;

  			var cite = y[i].getElementsByTagName('cite')[0].innerText;
  			

  			if (cont != "" && desc != "") {
  				results.innerHTML += "<div class='_ss_result'>" + 
  				"<sub>" + cite + "</sub><br/>" + title + desc + "<br/></div>";
  			}
  		} 
	
		// Position modal window
		//viewbox.style.left = "50%";
		//viewbox.style.top = "50%";
		//viewbox.style.transform = "translate(-50%, -50%)";

		// blur the results
		//document.getElementById('rcnt').style.display = 'none';
		document.getElementById('rhs').style.display = 'none';
		document.getElementById('res').style.display = 'none';
		document.getElementById('bres').style.display = 'none';
		document.getElementById('brs').style.display = 'none';
		//document.body.style.overflow = 'hidden';
	}
}

showPopup();