var w1 = {}, w2 = {}, result = [];
for (var i in window) {
	if (window.hasOwnProperty(i)) {
		w1[i] = "";
	}
}
chrome.tabs.executeScript(null, {file: "variable.js"}, function(){
	var bgpg = chrome.extension.getBackgroundPage();
	w2 = bgpg.w2;
	for (var k in w1){
		delete w2[k];
	}
	for (var p in w2){
		result.push(p);
	}
	document.getElementById("output").innerHTML = result.length + "个全局变量<br/>" + result.join("<br/>");
});