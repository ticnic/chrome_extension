var w2;
chrome.extension.onRequest.addListener(function(req){
	w2 = req;
});
/*
function showFirekylinData() {
	return function(info, tab) {
	chrome.tabs.executeScript(
		null, {
			code: "document.cookie='LITE_DEBUG=model;expires='+new(Date)(+new(Date)+1000).toGMTString();location.reload()"
		});
	};
}
chrome.contextMenus.create({
	"title": "\u67e5\u770b\u6570\u636e",
	//查看数据
	"type": "normal",
	"contexts": ["all"],
	"onclick": showFirekylinData()
});
*/