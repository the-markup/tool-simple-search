// Make close button
var clear = document.getElementsByClassName('clear-button')[0];
const closeButton = clear.cloneNode(true);
console.log(closeButton);
closeButton.removeAttribute('jsaction');
closeButton.removeAttribute('jscontroller');
closeButton.removeAttribute('jsname');
closeButton.removeAttribute('data-ved');
closeButton.setAttribute('aria-label', ' Close');
closeButton.id = '_ss_closebtn';
closeButton.onclick = "document.getElementById('_ss_header').style.display = 'none';";

// Make header
const controls = document.createElement('div');
controls.id = '_ss_header';
controls.appendChild(closeButton);
controls.appendChild(document.createTextNode('Simple Search'));

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

		// add listener for control buttons
		window.addEventListener("click", function(e) {
			if (e.target.id != closeButton.id) {
				return;
			}
    		document.getElementById(viewbox.id).style.display = 'none';
    		document.getElementById('rhs').style.display = '';
			document.getElementById('res').style.display = '';
			document.getElementById('bres').style.display = '';
			document.getElementById('brs').style.display = '';
		});
	}
}

showPopup();