var getWindow = function(w){
	var div = w.document.createElement('div');
	div.setAttribute('onclick', 'return window;');
	var unsafeWindow = div.onclick();
	return unsafeWindow;
}
var unsafeWindow;
if (window.frames['right']){
	unsafeWindow = getWindow(window.frames['right']);
} else {
	unsafeWindow = getWindow(window);
}
if (unsafeWindow.pt){
	if (confirm('确定要为此统计列表更新文档么？')){
		var w1 = {
			type: 'save',
			name: unsafeWindow.$('#sid').val(),
			data: unsafeWindow.pt.getJSONData(),
			title: unsafeWindow.$('.log-area-header>div').eq(0).text().substring(15)
		}
		chrome.extension.sendMessage(w1);
	}
} else {
	alert('请在log平台使用此功能');
}
