var w2 = {};
function insertJs(w){
	var div;
	if (w.document.getElementById('chrome-extend-proxy')){
		div = w.document.getElementById('chrome-extend-proxy');
	} else {
		div = w.document.createElement('div');
		div.id = "chrome-extend-proxy";
		w.document.body.appendChild(div);
	}
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.innerHTML = "var chromeData={};"
	+"for (var j in window) {"
		+"if (window.hasOwnProperty(j)) {"
		+"chromeData[j] = '';"
		+"}"
	+"};"
	+"document.getElementById('chrome-extend-proxy').setAttribute('data-proxy', JSON.stringify(chromeData));";
	w.document.body.appendChild(script);
	return div;
}
function getWindow(w){
	var proxy = w.document.getElementById('chrome-extend-proxy').getAttribute('data-proxy');
	if (proxy != 0){
		proxy = JSON.parse(proxy);
	}
	return proxy;
}
insertJs(window);
w2 = getWindow(window);
chrome.extension.sendRequest(w2);
div = null;