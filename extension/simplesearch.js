// Make close button
const closeButton = document.createElement('button');
closeButton.id = '_ss_closebtn';
closeButton.onclick = "document.getElementById('_ss_header').style.display = 'none';";
closeButton.textContent = 'close';

// Make header
const controls = document.createElement('div');
controls.id = '_ss_header';
controls.appendChild(closeButton)
controls.appendChild(document.createTextNode('Simple Search'));
//controls.style.position = "fixed";
//controls.style.top = '0';
//controls.style.width = '100%';
//controls.style.height = '2em';
//controls.style.background = "#FF0";
//controls.style.border = '1px solid red';

// Make results box
const results = document.createElement('div');
results.id = '_ss_results';
//results.style.padding = "1em";
//results.style.border = "1px solid blue";
//results.style.paddingTop = '2em';
//results.style.maxWidth = '800px';
//results.style.maxHeight = '540px';
//results.style.overflow = "auto";

const explanation = document.createElement('div');
explanation.id = "_ss_explanation";
explanation.innerText = "Get back to the good old days where you just had ten blue links. This is by The Markup, a very cool non-profit news site. Like this? DONATE."
results.appendChild(explanation);

// Make modal box
const viewbox = document.createElement('div');
viewbox.id = '_ss_box';
viewbox.appendChild(controls);
viewbox.appendChild(results);

const blur = document.createElement('blur');

//viewbox.style.zIndex = "2147483647";
//viewbox.style.position = 'fixed';
//viewbox.style.border = "5px solid red";
//viewbox.style.background = "#FFF";
//viewbox.style.maxWidth = '800px';
//viewbox.style.maxHeight = '600px';
//viewbox.style.overflow = "hidden";

function showPopup() {
	var y = document.getElementsByClassName("rc");
	if (y.length > 0) {
		document.scrollingElement.scrollTop = 0;

		document.body.insertBefore(viewbox, document.body.firstChild);

		for (var i = 0; i < y.length; i++) {
  			var ttl = y[i].getElementsByClassName('r')[0].getElementsByTagName('a')[0];
  			var link = ttl.href;
  			var rel = ttl.rel;
  			var cont = ttl.getElementsByTagName('h3')[0].innerText;

  			var title = "<a href='" + link + "' rel='" + rel + "'><h3>" + cont + "</h3></a>";
  			var desc = y[i].getElementsByClassName('st')[0].innerHTML;

  			var cite = y[i].getElementsByTagName('cite')[0].innerText;
  			

  			if (cont != "" && desc != "") {
  				results.innerHTML += "<div class='ss_result' style='border:1px solid green; margin-bottom:.5em;'>" + 
  				"<sub>" + cite + "</sub><br/>" + title + "<br/>" + desc + "<br/></div>";
  			}
  		} 
	
		// Position modal window
		viewbox.style.left = "50%";
		viewbox.style.top = "50%";
		viewbox.style.transform = "translate(-50%, -50%)";

		// blur the results
		document.getElementById('rcnt').style.filter = 'blur(5px)';
		document.body.style.overflow = 'hidden';

		// add listener for control buttons
		window.addEventListener("click", function(e) {
			if (e.target.id != closeButton.id) {
				return;
			}
    		document.getElementById(viewbox.id).style.display = 'none';
    		document.getElementById('rcnt').style.filter = '';
    		document.body.style.overflow = '';
		});
	}
}

showPopup();