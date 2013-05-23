var chromeAppCms = {};
chromeAppCms.formEvent = {
	elements: {
		formContainer: null,
		formText: null,
		formHref: null,
		formSrc: null,
		formAlt: null,
		inputText: null,
		inputHref: null,
		inputSrc: null,
		inputAlt: null
	},
	cache: {
		type: 'text',
		elem: null
	},
	init: function(){
		var formContainer = document.createElement("div");
		formContainer.id = "chrome-expand-dialog";
		formContainer.style.display = "none";
		formContainer.innerHTML= '<table class="chrome-expand-dialog-table">'
			+'<tr class="chrome-expand-text" style="display:none"><th>text：</th><td><textarea class="chrome-expand-input" id="chrome-expand-dialog-text"></textarea></td></tr>'
			+'<tr class="chrome-expand-href" style="display:none"><th>href：</th><td><input class="chrome-expand-input" id="chrome-expand-dialog-href" type="text" /></td></tr>'
			+'<tr class="chrome-expand-src" style="display:none"><th>src：</th><td><input class="chrome-expand-input" id="chrome-expand-dialog-src" type="text" /></td></tr>'
			+'<tr class="chrome-expand-alt" style="display:none"><th>alt：</th><td><input class="chrome-expand-input" id="chrome-expand-dialog-alt" type="text" /></td></tr>'
			+'<tr><th></th><td class="chrome-expand-button"><a id="chrome-expand-dialog-submit" href="###">确定</a><a id="chrome-expand-dialog-cancel" href="###">取消</a></td></tr>'
			+'</table>';
		document.body.appendChild(formContainer);
		this.elements.formContainer = $(formContainer);
		this.elements.formText = $(formContainer).find('.chrome-expand-text');
		this.elements.formHref = $(formContainer).find('.chrome-expand-href');
		this.elements.formSrc = $(formContainer).find('.chrome-expand-src');
		this.elements.formAlt = $(formContainer).find('.chrome-expand-alt');
		this.elements.inputText = $('#chrome-expand-dialog-text');
		this.elements.inputHref = $('#chrome-expand-dialog-href');
		this.elements.inputSrc = $('#chrome-expand-dialog-src');
		this.elements.inputAlt = $('#chrome-expand-dialog-alt');
		$('#chrome-expand-dialog-cancel').click(function(){
			chromeAppCms.formEvent.hideForm();
		});
		$('#chrome-expand-dialog-submit').click(function(){
			chromeAppCms.formEvent.submitForm();
		});
		var textarea = this.elements.inputText.get(0);
		var eleHeight = this.elements.inputText.height();
		$('#chrome-expand-dialog-text').on('focus', function(){
			chromeAppCms.formEvent.autoHeight(textarea, eleHeight);
		});
		$('#chrome-expand-dialog-text').on('input', function(){
			chromeAppCms.formEvent.autoHeight(textarea, eleHeight);
		});
	},
	hideForm: function(){
		this.elements.inputText.val("");
		this.elements.inputHref.val("");
		this.elements.inputSrc.val("");
		this.elements.inputAlt.val("");
		this.elements.formText.hide();
		this.elements.formHref.hide();
		this.elements.formSrc.hide();
		this.elements.formAlt.hide();
		this.elements.formContainer.hide();
		this.elements.formContainer.css({left:"-300px",top:"-300px"});
		this.elements.inputText.height("36px");
		this.cache.type = 'text';
		this.cache.elem = null;
	},
	submitForm: function(){
		var type = this.cache.type;
		var elem = this.cache.elem;
		var text = this.elements.inputText.val();
		var href = this.elements.inputHref.val();
		var src = this.elements.inputSrc.val();
		var alt = this.elements.inputAlt.val();
		if (!elem){ return; }
		if (type == 'img'){
			if (src != ""){
				elem.src = src;
			}
			if (alt != ""){
				elem.alt = alt;
			}
			if (href != ""){
				if ($(elem).parents('a').length > 0){
					$(elem).parents('a').attr('href',href);
				} else {
					$(elem).wrap('<a href="'+href+'" target="_blank"></a>');
				}
			}
		} else if (type == 'a'){
			if (text != ""){
				if ($(elem).find('img').length>0){
					var children = elem.childNodes;
					for (var i =0,len = children.length; i<len; i++){
						if (children[i].nodeType == 3){
							children[i].textContent = text;
							break;
						}
					}
				} else {
					text = text.replace(/\n/g, "<br/>");
					elem.innerHTML = text;
				}
			}
			if (href != ""){
				elem.href = href;
			}
		} else if (type == 'text'){
			if (text != ""){
				var children = elem.childNodes;
				for (var i =0,len = children.length; i<len; i++){
					if (children[i].nodeType == 3){
						children[i].textContent = text;
						break;
					}
				}
			}
			if (href != ""){
				if ($(elem).parents('a').length > 0){
					$(elem).parents('a').attr('href',href);
				}
			}
		}
		this.hideForm();
		chromeAppCms.dataSave();
	},
	showForm: function(type, attr){
		if ((attr.left+320)>document.body.clientWidth){
			attr.left = document.body.clientWidth-320;
		}
		this.elements.formContainer.css({left:attr.left,top:attr.top+attr.height}).show();
		if (type == 'img'){
			this.elements.formHref.show();
			this.elements.formSrc.show();
			this.elements.formAlt.show();
			if ($(this.cache.elem).parents('a').length>0){
				this.elements.inputHref.val($(this.cache.elem).parents('a').attr('href'));
			}
			this.elements.inputSrc.val(this.cache.elem.src);
			this.elements.inputAlt.val(this.cache.elem.alt);
		} else if (type == 'a'){
			var children = this.cache.elem.childNodes;
			for (var i =0,len = children.length; i<len; i++){
				if (children[i].nodeType == 3 && children[i].textContent == this.cache.elem.textContent){
					this.elements.formText.show();
					this.elements.inputText.val(this.cache.elem.text);
					break;
				}
			}
			this.elements.formHref.show();
			this.elements.inputHref.val(this.cache.elem.href);
		} else if (type == 'text'){
			this.elements.formText.show();
			if ($(this.cache.elem).parents('a').length>0){
				this.elements.formHref.show();
				this.elements.inputHref.val($(this.cache.elem).parents('a').attr('href'));
			}
			var children = this.cache.elem.childNodes;
			for (var i =0,len = children.length; i<len; i++){
				if (children[i].nodeType == 3){
					this.elements.inputText.val(children[i].textContent);
					break;
				}
			}
		}
	},
	autoHeight: function(obj, height){
		var scrollHeight = obj.scrollHeight;
		if (height && scrollHeight < height){ return false; }
		$(obj).height(scrollHeight);
	}
}
chromeAppCms.editEvent = function(e){
	if (e.button != 0){
		return;
	}
	e.stopPropagation();
	var target = e.target;
	var attr = {
		left: $(target).offset().left,
		top: $(target).offset().top,
		width: $(target).width(),
		height: $(target).height()
	}
	if (target.nodeName.toLocaleLowerCase() == 'img'){
		if ($(target).parents('a').length > 0){
			$(target).parents('a')[0].onclick = function(){ return false; }
		}
		chromeAppCms.formEvent.cache.type = 'img';
		chromeAppCms.formEvent.cache.elem = target;
		chromeAppCms.formEvent.showForm('img',attr);
	} else if (target.nodeName.toLocaleLowerCase() == 'a'){
		if (target.parentNode.className != "chrome-expand-button"){
			e.preventDefault();
			target.onclick = function(){ return false; }
			chromeAppCms.formEvent.cache.type = 'a';
			chromeAppCms.formEvent.cache.elem = target;
			chromeAppCms.formEvent.showForm('a',attr);
		}
	} else if (target.childNodes.length>0){
		if ($(target).parents('a').length > 0){
			$(target).parents('a')[0].onclick = function(){ return false; }
		}
		var children = target.childNodes;
		for (var i =0,len = children.length; i<len; i++){
			if (children[i].nodeType == 3 && $.trim(children[i].textContent) != ""){
				e.preventDefault();
				chromeAppCms.formEvent.cache.type = 'text';
				chromeAppCms.formEvent.cache.elem = target;
				chromeAppCms.formEvent.showForm('text',attr);
				break;
			}
		}
	}
}
chromeAppCms.normalEvent = function(e){
	if (e.button != 0){
		return;
	}
	var target = e.target;
	if (target.nodeName.toLocaleLowerCase() == 'a'){
		target.onclick = null;
	} else {
		if ($(target).parents('a').length > 0){
			$(target).parents('a')[0].onclick = null;
		}
	}
}
chromeAppCms.dataSave = function(){
	if (!document.getElementById('page')){
		return;
	}
	var title = document.title;
	var pageData = document.getElementById('page').innerHTML;
	//localStorage.setItem('data', pageData);
	chrome.extension.sendMessage({type:'data', title:title, data:pageData});
}
if ($('#tpl_content').length>0 || window.frames['iframe_view']){
	chrome.extension.onMessage.addListener(function(req){
		//console.log(req);
		if (req.type == 'output'){
			var textarea = $('#tpl_content')[0] || window.frames['iframe_view'].document.getElementById('tpl_content');
			if (!textarea){ return; }
			var frame_value = textarea.value;
			frame_value = frame_value.replace(/(\<\!\-\-cmsbegin\-\-\>)[\s\S]*(\<\!\-\-cmsfinish\-\-\>)/g, '$1<section id="page">'+req.data+'</section>$2');
			textarea.value = frame_value;
			alert('已将内容注入，请发布');
			chrome.extension.sendMessage({type:'clear'});
		}
	});
	if (window.frames['iframe_view']){
		$('#iframe_view').on('load', function(){
			var urlObj = window.frames['iframe_view'].document.getElementById('url');
			if (!urlObj){ return; }
			chrome.extension.sendMessage({type:'init',id:'test_url',value:urlObj.value});
		});
	} else {
		var urlObj = $('#url')[0];
		if (urlObj){
			chrome.extension.sendMessage({type:'init',id:'test_url',value:urlObj.value});
		}
	}
} else {
	chrome.extension.onMessage.addListener(function(req){
		//console.log(req);
		if (req.type == 'edit'){
			if (req.value == true){
				$('#page').unbind('mousedown',chromeAppCms.normalEvent);
				$('#page').bind('mousedown',chromeAppCms.editEvent);
			} else {
				$('#page').unbind('mousedown',chromeAppCms.editEvent);
				$('#page').bind('mousedown',chromeAppCms.normalEvent);
				chromeAppCms.formEvent.hideForm();
			}
		} else if (req.type == 'save'){
			chromeAppCms.dataSave();
		} else if (req.type == 'output'){
			$('#page').html(req.data);
			alert('已更新内容');
		}
	});
	chromeAppCms.formEvent.init();
	chrome.extension.sendMessage({type:'init',id:'status'});
}
/*
chrome.extension.onMessage.addListener(function(req){
	if (req.type == 'post'){
		var data = dataAppend(unsafeWindow.pt.getJSONData(), req.data);
		//var data = req.data;
		data.id = unsafeWindow.$('#sid').val();
		data.pid = unsafeWindow.$('#pid').val();
		data = JSON.stringify(data);
		unsafeWindow.$.ajax({
			type: 'POST',
			url: '?m=Job&a=SimpleEditor&ajaxFunc=checkStat',
			data: {content: data},
			success: function(msg){
				msg = JSON.parse(msg);
				if (msg[0] == 1){
					chrome.extension.sendMessage({type:'complete', id:req.id});
					unsafeWindow.$("#ldlContentArea").val(data);
					unsafeWindow.$("#submitForm").submit();
				} else {
					alert(msg[1]);
				}
			}
		});
	}
});
*/