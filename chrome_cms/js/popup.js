var bgpg = chrome.extension.getBackgroundPage();
var w2 = bgpg.w2;
if (w2.title != ""){
	$('#list').append('<li><a id="output" href="###">'+w2.title+'</a></li>');
}
editFlag = w2.status || false;
if (editFlag == true){
	$('#open').text("关闭编辑模式");
}
chrome.extension.onMessage.addListener(function(req){
	if (req.type == 'popup'){
		bgpg = chrome.extension.getBackgroundPage().w2;
		if (w2.title != ""){
			if ($('#output').length>0){
				$('#output').text(w2.title);
			} else {
				$('#list').append('<li><a id="output" href="###">'+w2.title+'</a></li>');
			}
		}
	}
});
$('#test').on('mousedown', function(){
	if (w2.test_url != ""){
		var href = w2.test_url.replace(/lvyou\.baidu\.com/,'db-testing-wiki09.db01.baidu.com:8086');
		$('#test').attr('href',href);
	}
});
$('#save').click(function(){
	chrome.extension.sendMessage({type:'save'});
});
$('#clear').click(function(){
	$('#list').empty();
	chrome.extension.sendMessage({type:'clear'});
});
$('#list').on("click", "a", function(e){
	if (confirm('你确定要将页面"'+event.target.innerHTML+'"的内容注入当前专题么？请谨慎！')){
		$('#list').empty();
		chrome.extension.sendMessage({type:'output'});
	}
});
$('#open').click(function(){
	if (editFlag == false){
		editFlag = true;
		chrome.extension.sendMessage({type:'edit',id:'status',value:true});
		$('#open').text("关闭编辑模式");
	} else {
		editFlag = false;
		chrome.extension.sendMessage({type:'edit',id:'status',value:false});
		$('#open').text("开启编辑模式");
	}
});