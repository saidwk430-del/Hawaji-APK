(function(){
var IC={home:'<path d="M3 11l9-8 9 8v10a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z"/>',heart:'<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',book:'<path d="M2 4h7a3 3 0 013 3v13a2 2 0 00-2-2H2zM22 4h-7a3 3 0 00-3 3v13a2 2 0 012-2h8z"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>'};
function ic(n){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+IC[n]+'</svg>'}
var mq='<g opacity=".6" fill="#0a0904" stroke="#d4a437" stroke-opacity=".55" stroke-width="2"><path d="M300 1700V1580A120 120 0 0 1 540 1580V1700Z"/><path d="M420 1460V1425"/><path d="M222 1700V1500L236 1455L250 1500V1700Z"/><path d="M590 1700V1500L604 1455L618 1500V1700Z"/><path d="M150 1700V1640A50 50 0 0 1 250 1640V1700Z"/><path d="M590 1700V1640A50 50 0 0 1 690 1640V1700Z"/><path d="M60 1700H780"/></g><path d="M405 1700V1665A15 15 0 0 1 435 1665V1700Z" fill="#f5b942"/><path d="M470 1380A34 34 0 1 0 470 1448A27 27 0 1 1 470 1380Z" fill="#e8b73a" opacity=".85"/>';
var svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 1870" preserveAspectRatio="xMidYMax slice"><defs><radialGradient id="a" cx=".5" cy=".12" r=".7"><stop offset="0" stop-color="#2a2008"/><stop offset="1" stop-color="#03050a"/></radialGradient><linearGradient id="l" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a6420" stop-opacity="0"/><stop offset=".5" stop-color="#ffd978"/><stop offset="1" stop-color="#8a6420" stop-opacity="0"/></linearGradient></defs><rect width="840" height="1870" fill="url(#a)"/><g fill="none" stroke="url(#l)" stroke-width="2" opacity=".7"><path d="M-40 330C180 300 420 150 760 -30"/><path d="M-40 380C200 340 440 200 820 20"/><path d="M-40 430C220 380 470 260 860 80" opacity=".5"/><path d="M880 1500C700 1450 520 1380 300 1300"/></g><g fill="#ffd978" opacity=".7"><circle cx="120" cy="900" r="1.6"/><circle cx="700" cy="700" r="1.4"/><circle cx="560" cy="1200" r="1.8"/><circle cx="90" cy="1300" r="1.4"/><circle cx="760" cy="1100" r="1.6"/></g>'+mq+'</svg>';
var BG='url("data:image/svg+xml,'+encodeURIComponent(svg)+'")';
var CSS='html body{background:#03050a '+BG+' center/cover no-repeat fixed!important;color:#f6e3a6;padding-bottom:120px!important}'+
'html body header{background:transparent!important;border-bottom:1px solid #6e5320!important;box-shadow:none!important}'+
'html body #mn{position:relative;padding:4px 16px 30px}'+
'html body #mn h3{color:#f0c14b!important;font-size:24px;margin:22px 4px 6px;display:flex;align-items:center;gap:12px}'+
'html body #mn h3 svg{stroke:#e8b73a!important;width:34px;height:34px}'+
'html body #mn hr{display:none}'+
'.orn{height:18px;margin:0 0 14px;position:relative;text-align:center;color:#e8b73a;font-size:17px;line-height:18px}'+
'.orn::before{content:"";position:absolute;left:0;right:0;top:50%;height:1px;background:linear-gradient(90deg,transparent 0,#c9a24a 35%,transparent 35.5%,transparent 64.5%,#c9a24a 65%,transparent 100%)}'+
'.orn span{position:relative}'+
'html body #mn .g{gap:16px;margin-top:6px}'+
'html body #mn .g button{position:relative;background:linear-gradient(145deg,#0e1424,#05070d)!important;border:1.5px solid #d4a437!important;border-radius:22px;color:#f6e3a6;height:118px;font-size:17px;box-shadow:0 0 14px rgba(212,164,55,.35),inset 0 0 20px rgba(212,164,55,.1)}'+
'html body #mn .g button svg{stroke:#e8b73a!important;box-sizing:content-box;width:26px;height:26px;padding:11px;border:2px solid #c9a24a;border-radius:50%;background:radial-gradient(#1c1606,#06080e)}'+
'html body #mn .g button::after{content:"\\2039";position:absolute;left:16px;top:50%;margin-top:-18px;font-size:34px;color:#e8b73a;line-height:1}'+
'html body #mn .g button:last-child:nth-child(odd){grid-column:1/-1}'+
'#gn{position:fixed;left:12px;right:12px;bottom:14px;height:74px;z-index:10000;display:flex;direction:rtl;align-items:center;padding:0 8px;background:rgba(4,7,13,.94);border:1.5px solid #c9a24a;border-radius:40px;box-shadow:0 0 18px rgba(212,164,55,.4)}'+
'#gn button{flex:1;height:58px;margin:0 3px;border:0;border-radius:30px;background:transparent;color:#e8c866;font-size:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px}'+
'#gn button svg{width:26px;height:26px}'+
'#gn button.on{background:linear-gradient(#ffdf7a,#c9921a);color:#1a1405;font-weight:700}'+
'html body #ov{background:#03050a '+BG+' center/cover no-repeat!important;padding:14px 16px 130px!important;color:#f6e3a6!important}'+
'html body #ov h2{font-size:34px;color:#f0c14b!important;margin:14px 6px 22px;position:relative;padding-bottom:16px}'+
'html body #ov h2::after{content:"";position:absolute;right:0;left:0;bottom:0;height:2px;background:linear-gradient(90deg,transparent,#e8b73a,transparent)}'+
'html body #ov button{background:linear-gradient(#ffdf7a,#c9921a);color:#1a1405;border:1px solid #ffe9a0;border-radius:30px;padding:12px 22px;font-weight:700;font-size:16px;margin:6px 0}'+
'html body #ov button.bk{background:rgba(0,0,0,.45)!important;border:1.5px solid #d4a437!important;color:#f0c14b!important;padding:10px 20px}'+
'html body #ov input{background:#05070d;border:1px solid #d4a437;border-radius:28px;color:#f6e3a6;padding:14px 20px}'+
'html body #ov .cd{background:linear-gradient(145deg,#0e1424,#05070d);border:1.5px solid #d4a437;box-shadow:0 0 12px rgba(212,164,55,.3);color:#f6e3a6;border-radius:20px}'+
'html body #ov .cd b{color:#ffd24a}'+
'html body #ov .sr{background:#07090f;border:1px solid #c9a24a;color:#f6e3a6;border-radius:16px;text-align:right}'+
'html body #ov .big{color:#ffd24a;text-shadow:0 0 14px rgba(255,200,80,.4)}'+
'html body #ov .nt{color:#b89a4a}'+
'#cp circle[r="95"]{fill:#05070d;stroke:#d4a437}#cp line{stroke:#8a6a2a}'+
'.dk{display:flex;align-items:center;gap:14px;background:linear-gradient(145deg,#0e1424,#05070d);border:1.5px solid #d4a437;border-radius:20px;padding:16px 14px;margin:12px 0;box-shadow:0 0 12px rgba(212,164,55,.3);font-size:19px;color:#f6e3a6}'+
'.dk i{flex:none;width:44px;height:44px;line-height:44px;text-align:center;font-style:normal;font-weight:700;font-size:22px;color:#ffd24a;border:2px solid #d4a437;border-radius:12px}'+
'.dk span{flex:1}.dk::after{content:"\\2726";color:#c9a24a;font-size:30px}';
var cur='home',prev='home';
function mark(){[].forEach.call(document.querySelectorAll('#gn button'),function(b){b.className=b.getAttribute('data-t')===cur?'on':''})}
function secs(){var m=document.getElementById('mn'),out=[],c=null;[].forEach.call(m.children,function(e){if(e.tagName==='H3'){c={t:e.textContent,els:[e]};out.push(c)}else if(c&&e.tagName!=='HR')c.els.push(e)});return out}
function filter(t){secs().forEach(function(s){var ok=t==='home'||(t==='health'&&s.t.indexOf('الصحة')>-1)||(t==='islam'&&s.t.indexOf('الصلاة')>-1);s.els.forEach(function(e){e.style.display=ok?'':'none'})})}
function settings(){var d=document.createElement('div');d.id='ov';
d.innerHTML='<button class="bk" id="ovb">رجوع ←</button><h2>الإعدادات</h2><div class="cd"><span>صوت النسر</span><button id="s1">تشغيل</button></div><div class="cd"><span>البيانات المحفوظة</span><button id="s2">مسح</button></div><div class="cd"><span>Hawaji</span><b>v2.0</b></div>';
document.body.appendChild(d);
document.getElementById('ovb').onclick=function(){d.remove()};
document.getElementById('s1').onclick=function(){try{new Audio('eagle.wav').play()}catch(e){}};
var s2=document.getElementById('s2'),arm=false;
s2.onclick=function(){if(!arm){arm=true;s2.textContent='اضغط للتأكيد';return}
try{Object.keys(localStorage).forEach(function(k){if(/^(wl|wMon|wTue|wWed|wThu|wFri|wSat|wSun)/.test(k))localStorage.removeItem(k)})}catch(e){}
arm=false;s2.textContent='تم المسح ✓'}}
function tab(t){var o=document.getElementById('ov');if(o)o.remove();
var bs=document.querySelectorAll('.back');for(var i=0;i<bs.length;i++){if(bs[i].offsetParent!==null){bs[i].click();break}}
if(t==='set'){if(cur!=='set')prev=cur;cur='set';mark();settings();return}
cur=t;prev=t;filter(t);mark();window.scrollTo(0,0)}
function init(){
var st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);
[].forEach.call(document.querySelectorAll('#mn h3'),function(h){if(!h.nextSibling||h.nextSibling.className!=='orn')h.insertAdjacentHTML('afterend','<div class="orn"><span>❖</span></div>')});
var n=document.createElement('div');n.id='gn';
[['home','الرئيسية','home'],['health','صحتي','heart'],['islam','إسلاميات','book'],['set','الإعدادات','gear']].forEach(function(x){var b=document.createElement('button');b.setAttribute('data-t',x[0]);b.innerHTML=ic(x[2])+'<span>'+x[1]+'</span>';b.onclick=function(){tab(x[0])};n.appendChild(b)});
document.body.appendChild(n);mark();
new MutationObserver(function(){
var ov=document.getElementById('ov');
if(!ov&&cur==='set'){cur=prev;mark()}
if(ov){var h=ov.querySelector('h2');
if(h&&h.textContent.indexOf('الأذكار')>-1){var r=ov.querySelector('.r');
if(r&&!r.getAttribute('data-n')){r.setAttribute('data-n','1');var o='';
r.innerHTML.split(/<br\s*\/?>/i).forEach(function(x,i){if(x.trim())o+='<div class="dk"><i>'+(i+1)+'</i><span>'+x+'</span></div>'});r.innerHTML=o}}}
}).observe(document.body,{childList:true,subtree:true});
}
var k=0,t=setInterval(function(){if(document.getElementById('mn')||++k>60){clearInterval(t);if(document.getElementById('mn'))init()}},200);
})();
