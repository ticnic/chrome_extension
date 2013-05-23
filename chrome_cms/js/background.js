var w2 = {
	status: false,
	title: "",
	test_url: ""
};
chrome.extension.onMessage.addListener(function(req){
	if (req.type == 'edit'){
		w2[req.id] = req.value;
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.sendMessage(tab.id, {type:'edit',value:w2[req.id]}, function(response){});
		});
	} else if (req.type == 'init'){
		if (req.id == 'status'){
			chrome.tabs.getSelected(null, function(tab) {
				chrome.tabs.sendMessage(tab.id, {type:'edit',value:w2[req.id]}, function(response){});
				chrome.tabs.insertCSS(tab.id, {file: "css/reset.css"});
			});
		} else if (req.id == 'test_url'){
			w2.test_url = req.value;
		}
	} else if (req.type == 'save'){
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.sendMessage(tab.id, {type:'save'},function(response){});
		});
	} else if (req.type == 'data'){
		localStorage.setItem('data', req.data);
		w2.title = req.title;
		chrome.extension.sendMessage({type:'popup'});
	} else if (req.type == 'output'){
		var cms_data = localStorage.getItem('data');
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.sendMessage(tab.id, {type:'output', data:cms_data},function(response){});
		});
	} else if (req.type == 'clear'){
		localStorage.removeItem('data');
		w2.title = "";
	}
});
/*
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.create({
		url:chrome.extension.getURL('pm.html')
	});
});
*/
