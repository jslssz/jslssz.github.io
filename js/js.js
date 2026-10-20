//可选搜索源：key 即 li 的 class
var ENGINES = {
	bing:   { url: 'https://www.bing.com/search',   name: 'q', label: '必 应' },
	google: { url: 'https://www.google.com/search', name: 'q', label: '谷 歌' }
};
var currentEngine = 'bing';

//当前引擎固定在首个 li（收起状态只显示它），其余引擎作为可切换项，避免列表里出现重复项
function renderEngines(){
	var $ul = $('.engine-select ul').empty();

	$ul.append($('<li>').addClass('engine-current ' + currentEngine).text(ENGINES[currentEngine].label));
	for (var k in ENGINES){
		if (k !== currentEngine){
			$ul.append($('<li>').addClass(k).text(ENGINES[k].label));
		}
	}

	$('.search form').attr('action', ENGINES[currentEngine].url);
	$('#search-input').attr('name', ENGINES[currentEngine].name);
}

$('.engine-select ul')
	.on('click','li',function(){
		var $li = $(this);
		for (var k in ENGINES){
			if ($li.hasClass(k)){
				currentEngine = k;
				renderEngines();
				$('.engine-select ul').css('height','46px');
				return;
			}
		}
	})
	.hover(function(){
		$(this).css('height','auto');
	},function(){
		$(this).css('height','46px');
	});

renderEngines();

//清空输入框内容
$('.search-clear').click(function(){
	cls();
	$(this).css('display','none');
});
function cls(){
	var t = document.getElementsByTagName("INPUT");
	for (var i=0; i<t.length; i++){
		if (t[i].type=='text'){
			t[i].value="";
		}
	}
}

//清空按钮的显示和隐藏
function if_btn(){
	var btn_obj = document.getElementById("search-input");
	var cls_btn = document.getElementById("search-clear");
	var times;

	if(!btn_obj || !cls_btn){
		return false;/*元素不存在则不绑定*/
	}

	btn_obj.onfocus = function(){
		times = setInterval(function(){
			cls_btn.style.display = btn_obj.value ? "block" : "none";
		},200);
	};
	btn_obj.onblur = function(){
		clearInterval(times);
	};
}
if_btn();
