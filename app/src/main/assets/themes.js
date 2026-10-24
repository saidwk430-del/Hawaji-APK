(function(){
function g(k,d){try{var v=localStorage.getItem(k);return v===null?d:v}catch(e){return d}}
function s(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function $(i){return document.getElementById(i)}
var T=[['0','ذهبي ملكي',0,''],['1','أخضر زمردي',120,'th1'],['2','أزرق ليلي',190,'th2'],['3','وردي ياقوتي',300,'th3']];
function find(id){return T.filter(function(x){return x[0]===id})[0]||T[0]}
function apply(id){var h=document.documentElement;['th1','th2','th3'].forEach(function(c){h.classList.remove(c)});var t=find(id);if(t[3])h.classList.add(t[3])}
apply(g('theme','0'));
var st=document.createElement('style');
st.textContent='html *,html *::before,html *::after{-webkit-user-select:none!important;user-select:none!important;-webkit-touch-callout:none!important;-webkit-tap-highlight-color:transparent}html input,html textarea{-webkit-user-select:text!important;user-select:text!important}::selection{background:transparent}'+
'html.th1{filter:hue-rotate(120deg)}html.th2{filter:hue-rotate(190deg)}html.th3{filter:hue-rotate(300deg)}html.lt.th1{filter:invert(1) hue-rotate(300deg)}html.lt.th2{filter:invert(1) hue-rotate(10deg)}html.lt.th3{filter:invert(1) hue-rotate(120deg)}html.th1 #splash{filter:hue-rotate(-120deg)}html.th2 #splash{filter:hue-rotate(-190deg)}html.th3 #splash{filter:hue-rotate(-300deg)}'+
'.sx{flex:none;width:34px;height:34px;border-radius:50%;background:linear-gradient(#ffe27a,#c9921a);border:2px solid #fff3b0}html body #ov .cd.tc.on{border-color:#ffd24a;box-shadow:0 0 18px rgba(255,210,74,.6)}';
document.documentElement.appendChild(st);
document.addEventListener('contextmenu',function(e){e.preventDefault()},true);
function page(){
var o=$('ov');if(o)o.remove();
var d=document.createElement('div');d.id='ov';
d.innerHTML='<button class="bk" id="ovb">رجوع ←</button><h2>مظهر التطبيق</h2><div id="tl"></div><div class="nt">يُحفظ اختيارك ويُطبَّق على كل صفحات التطبيق.</div>';
document.body.appendChild(d);
$('ovb').onclick=function(){var b=document.querySelector('#gn button[data-t="set"]');if(b)b.click();else d.remove()};
draw();
}
function draw(){
var cur=find(g('theme','0'))[2],l=$('tl');if(!l)return;
l.innerHTML=T.map(function(t){return '<div class="cd tc'+(t[0]===g('theme','0')?' on':'')+'" data-i="'+t[0]+'"><span>'+(t[0]===g('theme','0')?'✓ ':'')+t[1]+'</span><i class="sx" style="filter:hue-rotate('+(t[2]-cur)+'deg)"></i></div>'}).join('');
[].forEach.call(l.querySelectorAll('.tc'),function(e){e.onclick=function(){var id=e.getAttribute('data-i');s('theme',id);apply(id);draw()}});
}
new MutationObserver(function(){
var o=$('ov');if(!o||$('thr'))return;
var h=o.querySelector('h2');if(!h||h.textContent.trim()!=='الإعدادات')return;
var gs=o.querySelectorAll('.sg'),tg=null;
[].forEach.call(gs,function(x){if(x.textContent.trim()==='البيانات')tg=x});
if(!tg)return;
tg.insertAdjacentHTML('beforebegin','<div class="cd" id="thr"><span>مظهر التطبيق</span><button id="thb">تغيير</button></div>');
$('thb').onclick=page;
}).observe(document.documentElement,{childList:true,subtree:true});
})();
