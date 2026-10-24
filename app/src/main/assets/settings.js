(function(){
function g(k,d){try{var v=localStorage.getItem(k);return v===null?d:v}catch(e){return d}}
function s(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function $(i){return document.getElementById(i)}
var MAIL='';
try{var H=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){if(g('fx','1')==='0')return Promise.resolve();return H.apply(this,arguments)}}catch(e){}
try{var OS=OscillatorNode.prototype.start,OP=OscillatorNode.prototype.stop;OscillatorNode.prototype.start=function(){if(g('fx','1')==='0')return;return OS.apply(this,arguments)};OscillatorNode.prototype.stop=function(){try{return OP.apply(this,arguments)}catch(e){}}}catch(e){}
var NV=navigator.vibrate;
try{navigator.vibrate=function(p){if(g('vb','1')==='0'||!NV)return false;return NV.call(navigator,p)}}catch(e){}
document.addEventListener('click',function(e){var b=e.target&&e.target.closest&&e.target.closest('button,.sw,.sl');if(b&&g('vb','1')!=='0'&&NV)try{NV.call(navigator,12)}catch(x){}},true);
var st=document.createElement('style');
st.textContent='html.lt{filter:invert(1) hue-rotate(180deg)}html.lt img{filter:invert(1) hue-rotate(180deg)}.sg{color:#f0c14b;font-size:20px;margin:24px 4px 6px}.sw{position:relative;width:58px;height:32px;border-radius:16px;background:#1b2740;border:1.5px solid #8a6a2a;flex:none;transition:.2s}.sw::after{content:"";position:absolute;top:3px;left:3px;width:22px;height:22px;border-radius:50%;background:#8a97ad;transition:.2s}.sw.on{background:#a87a14;border-color:#ffd24a}.sw.on::after{left:29px;background:#fff3b0}.sgm{display:flex;gap:8px}.sl{flex:1;text-align:center;padding:10px 0;border:1.5px solid #8a6a2a;border-radius:20px;color:#e8c866;font-size:15px}.sl.on{background:linear-gradient(#ffdf7a,#c9921a);color:#1a1405;font-weight:700}html body #ov .cd button{padding:8px 18px!important;font-size:14px!important;margin:0 0 0 0!important;flex:none}html body #ov .cd>span{flex:1;margin-left:10px}html body #ov select,html body #ov textarea{width:100%;box-sizing:border-box;background:#05070d;border:1px solid #d4a437;border-radius:22px;color:#f6e3a6;padding:12px 16px;font-size:16px;margin:4px 0 8px}';
document.documentElement.appendChild(st);
if(g('dk','1')==='0')document.documentElement.classList.add('lt');
function applyLang(l){document.documentElement.setAttribute('lang',l);var b=document.querySelector('[data-lang="'+l+'"]');if(b)try{b.click()}catch(e){}}
document.addEventListener('DOMContentLoaded',function(){var l=g('lang','');if(l)setTimeout(function(){applyLang(l)},700)});
function ov(t,h){var o=$('ov');if(o)o.remove();var d=document.createElement('div');d.id='ov';d.innerHTML='<button class="bk" id="ovb">رجوع ←</button><h2>'+t+'</h2>'+h;document.body.appendChild(d);$('ovb').onclick=function(){d.remove()};return d}
function sub(t,h){var d=ov(t,h);$('ovb').onclick=showSettings;return d}
function row(l,c){return '<div class="cd"><span>'+l+'</span>'+c+'</div>'}
function swt(k){return '<div class="sw'+(g(k,'1')==='1'?' on':'')+'" data-k="'+k+'"></div>'}
function html(){return '<div class="sg">الصوت والتنبيهات</div>'+row('المؤثرات الصوتية',swt('fx'))+row('الاهتزاز عند الضغط على الأزرار',swt('vb'))+
'<div class="sg">المظهر واللغة</div>'+row('الوضع الداكن',swt('dk'))+'<div class="cd" style="display:block"><div style="margin-bottom:12px">لغة التطبيق</div><div class="sgm">'+[['ar','العربية'],['en','English'],['fr','Français']].map(function(x){return '<div class="sl'+(g('lang','ar')===x[0]?' on':'')+'" data-l="'+x[0]+'">'+x[1]+'</div>'}).join('')+'</div></div>'+
'<div class="sg">البيانات</div>'+row('مسح البيانات المحفوظة','<button id="zc">مسح</button>')+row('النسخ الاحتياطي والاستعادة','<button id="zb">فتح</button>')+
'<div class="sg">المعلومات والدعم</div>'+row('سياسة الخصوصية وشروط الاستخدام','<button id="zp">عرض</button>')+row('تقييم التطبيق','<button id="zr">قيّم</button>')+row('مشاركة التطبيق','<button id="zs">شارك</button>')+row('تواصل مع المطور / إبلاغ عن مشكلة','<button id="zm">راسلنا</button>')+
'<div class="nt" style="text-align:center;margin-top:26px">Hawaji v2.0</div>'}
function showSettings(){var d=ov('الإعدادات',html());
[].forEach.call(d.querySelectorAll('.sw'),function(e){e.onclick=function(){var k=e.getAttribute('data-k'),on=!e.classList.contains('on');e.classList.toggle('on',on);s(k,on?'1':'0');if(k==='dk')document.documentElement.classList.toggle('lt',!on)}});
[].forEach.call(d.querySelectorAll('.sl'),function(e){e.onclick=function(){var l=e.getAttribute('data-l');s('lang',l);[].forEach.call(d.querySelectorAll('.sl'),function(x){x.classList.toggle('on',x===e)});applyLang(l)}});
var c=$('zc'),arm=false;
c.onclick=function(){if(!arm){arm=true;c.textContent='اضغط للتأكيد';return}var keep={fx:1,vb:1,dk:1,lang:1};try{Object.keys(localStorage).forEach(function(k){if(!keep[k])localStorage.removeItem(k)})}catch(e){}arm=false;c.textContent='تم المسح ✓'};
$('zb').onclick=backup;$('zp').onclick=privacy;$('zr').onclick=rate;$('zs').onclick=share;$('zm').onclick=contact}
function backup(){sub('النسخ الاحتياطي','<div class="nt">«نسخ بياناتي» ينشئ نصاً يحوي مهامك وأوزانك وبقية بياناتك، احفظه في ملاحظات أو أرسله لنفسك. ولاستعادتها الصق النص هنا واضغط «استعادة».</div><textarea id="zt" rows="8"></textarea><button id="z1">نسخ بياناتي</button> <button id="z2">استعادة من النص</button><div class="nt" id="zn"></div>');
$('z1').onclick=function(){var o={};try{Object.keys(localStorage).forEach(function(k){o[k]=localStorage.getItem(k)})}catch(e){}var t=JSON.stringify(o);$('zt').value=t;var ok=false;try{if(window.HShare&&HShare.copy){HShare.copy(t);ok=true}}catch(e){}$('zn').textContent=ok?'تم نسخ بياناتك إلى الحافظة':'حدّد النص أعلاه وانسخه يدوياً'};
$('z2').onclick=function(){try{var o=JSON.parse($('zt').value);if(!o||typeof o!=='object')throw 0;Object.keys(o).forEach(function(k){localStorage.setItem(k,String(o[k]))});$('zn').textContent='تمت الاستعادة، أعد فتح التطبيق'}catch(e){$('zn').textContent='النص غير صالح'}}}
function privacy(){sub('الخصوصية والشروط','<div class="cd" style="display:block;line-height:2;font-size:16px"><b style="color:#f0c14b">سياسة الخصوصية</b><br>• يعمل Hawaji على هاتفك، وتُحفظ مهامك وأوزانك وإعداداتك على جهازك فقط.<br>• لا يرسل التطبيق بياناتك الشخصية إلى أي خادم.<br>• الموقع يُستخدم محلياً لحساب القبلة والمواقيت فقط.<br>• القرآن الكريم يحمّل نصوص السور من الإنترنت (alquran.cloud) عند فتحه.<br><br><b style="color:#f0c14b">شروط الاستخدام</b><br>• التطبيق مجاني للاستخدام الشخصي.<br>• المواقيت والقبلة حسابات تقريبية، فاعتمد تقويم مسجدك المحلي عند الحاجة.<br>• الأدوات الصحية والمالية للاسترشاد ولا تغني عن الطبيب أو المختص.</div>')}
function rate(){sub('تقييم التطبيق','<div class="big" id="zst" style="font-size:54px;letter-spacing:6px"></div><div class="nt" id="zrm" style="text-align:center"></div>');
var r=parseInt(g('rate','0'))||0;
function dr(){$('zst').innerHTML=[1,2,3,4,5].map(function(i){return '<span data-i="'+i+'">'+(i<=r?'★':'☆')+'</span>'}).join('');[].forEach.call($('zst').children,function(e){e.onclick=function(){r=+e.getAttribute('data-i');s('rate',r);dr()}});$('zrm').textContent=r?'شكراً لتقييمك: '+r+' من 5':'اضغط على النجوم'}dr()}
function share(){var t='جرّب تطبيق Hawaji: مواقيت الصلاة، القبلة، المسبحة، الحاسبة وأدوات كثيرة في مكان واحد.';try{if(window.HShare){HShare.share(t);return}}catch(e){}try{navigator.share({text:t})}catch(e){}}
function contact(){sub('التواصل مع المطور','<select id="zk"><option>اقتراح</option><option>ملاحظة</option><option>إبلاغ عن مشكلة</option></select><textarea id="zx" rows="7" placeholder="اكتب رسالتك هنا"></textarea><button id="zg">إرسال</button><div class="nt" id="zq"></div>');
$('zg').onclick=function(){var m=$('zx').value.trim();if(!m){$('zq').textContent='اكتب رسالتك أولاً';return}
var sj='Hawaji - '+$('zk').value,bd=m+'\n\n(Hawaji v2.0 '+((navigator.userAgent.match(/Android [\d.]+/)||[''])[0])+')';
if(MAIL){location.href='mailto:'+MAIL+'?subject='+encodeURIComponent(sj)+'&body='+encodeURIComponent(bd)}else{try{HShare.share(sj+'\n\n'+bd)}catch(e){$('zq').textContent='لم يُضبط بريد المطور بعد'}}}}
var iv=setInterval(function(){var b=document.querySelector('#gn button[data-t="set"]');if(!b)return;clearInterval(iv);b.addEventListener('click',function(){setTimeout(function(){var o=$('ov'),h=o&&o.querySelector('h2');if(h&&h.textContent.trim()==='الإعدادات')showSettings()},0)})},300);
})();
