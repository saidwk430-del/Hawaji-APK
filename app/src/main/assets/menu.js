(function(){
function init(){
var tiles=[].slice.call(document.querySelectorAll('.tile'));
if(!tiles.length||document.getElementById('mn'))return;
var host=tiles[0].parentElement;
function orig(k){for(var i=0;i<tiles.length;i++){var t=tiles[i];if(t.getAttribute('data-tool')===k||t.textContent.indexOf(k)>-1)return t}}
function go(k){return function(){var t=orig(k);if(t)t.click();}}
function sp(){var f=document.createElement('div');f.className='tile';f.textContent='الرياضة';f.style.display='none';document.body.appendChild(f);f.click();f.remove();}
var st=document.createElement('style');
st.textContent='#mn{padding:6px 14px 30px}#mn h3{color:#ffe08a;font-size:18px;margin:18px 4px 10px;padding-bottom:6px;border-bottom:1px solid #8a6a2a;text-align:center}#mn .g{display:grid;grid-template-columns:1fr 1fr;gap:12px}#mn button{background:linear-gradient(145deg,#2c2c2c,#121212 50%,#1f1f1f);border:2px solid #c9a24a;border-radius:16px;color:#f2d27a;font-size:16px;font-weight:600;min-height:62px;padding:10px}#mn button:active{transform:scale(.97)}#ov{position:fixed;top:0;left:0;right:0;bottom:0;z-index:9998;overflow:auto;background:#0b0b0b;color:#f2d27a;padding:14px;direction:rtl;font-family:system-ui,sans-serif}#ov h2{color:#ffe08a;margin:10px 0}#ov input{width:100%;box-sizing:border-box;padding:10px;margin:4px 0 8px;background:#131313;color:#f5e6b0;border:1px solid #8a6a2a;border-radius:12px;font-size:16px}#ov button{padding:10px 14px;border-radius:12px;border:1px solid #ffe9a0;background:linear-gradient(#ffe27a,#c9921a);color:#111;font-weight:700;font-size:15px;margin:4px 0}#ov .bk{background:#1a1a1a;color:#e0b84f;border-color:#8a6a2a}#ov .r{color:#ffe27a;line-height:2;font-size:17px}#ov .big{font-size:80px;text-align:center;color:#ffe27a;margin:20px 0}';
document.head.appendChild(st);
function ov(title,html,mount){var d=document.createElement('div');d.id='ov';d.innerHTML='<button class="bk" id="ovb">رجوع ←</button><h2>'+title+'</h2>'+html;document.body.appendChild(d);document.getElementById('ovb').onclick=function(){d.remove()};if(mount)mount(function(i){return document.getElementById(i)});}
function tasbih(){ov('المسبحة','<div class="big" id="n">0</div><button id="a" style="width:100%;height:90px;font-size:22px">سبّح</button><button class="bk" id="z">تصفير</button>',function($){var c=0;$('a').onclick=function(){c++;$('n').textContent=c;if(navigator.vibrate)navigator.vibrate(c%33==0?200:20)};$('z').onclick=function(){c=0;$('n').textContent=0}})}
function adhkar(){ov('الأذكار','<div class="r">سبحان الله وبحمده (100 مرة)<br>سبحان الله العظيم<br>لا إله إلا الله وحده لا شريك له<br>أستغفر الله وأتوب إليه<br>لا حول ولا قوة إلا بالله<br>اللهم صلّ وسلّم على نبينا محمد<br>حسبي الله لا إله إلا هو عليه توكلت</div>')}
function qibla(){ov('القبلة','<div class="r">خط العرض<input id="la" type="number" value="36.75"> خط الطول<input id="lo" type="number" value="3.06"></div><button id="gp">موقعي الحالي</button> <button id="go">احسب</button><div class="r" id="o"></div>',function($){function calc(){var p=parseFloat($('la').value)*Math.PI/180,l=parseFloat($('lo').value)*Math.PI/180,k=21.4225*Math.PI/180,m=39.8262*Math.PI/180,d=m-l,b=Math.atan2(Math.sin(d)*Math.cos(k),Math.cos(p)*Math.sin(k)-Math.sin(p)*Math.cos(k)*Math.cos(d));b=(b*180/Math.PI+360)%360;$('o').innerHTML='اتجاه القبلة: '+b.toFixed(1)+'° من الشمال نحو الشرق (باتجاه عقارب الساعة)<br>وجّه البوصلة إلى هذه الدرجة'}$('go').onclick=calc;$('gp').onclick=function(){if(!navigator.geolocation){$('o').textContent='الموقع غير متاح';return}navigator.geolocation.getCurrentPosition(function(p){$('la').value=p.coords.latitude.toFixed(4);$('lo').value=p.coords.longitude.toFixed(4);calc()},function(){$('o').textContent='تعذّر تحديد الموقع، أدخل الإحداثيات يدوياً'})};calc()})}
function zakat(){ov('حاسبة الزكاة','<div class="r">مجموع المال الذي حال عليه الحول<input id="m" type="number"> قيمة النصاب (ما يعادل 85 غرام ذهب)<input id="ns" type="number"></div><button id="c">احسب</button><div class="r" id="o"></div>',function($){$('c').onclick=function(){var m=parseFloat($('m').value),n=parseFloat($('ns').value);if(!m||!n)return;$('o').innerHTML=m>=n?'الزكاة الواجبة: '+(m*0.025).toFixed(2):'المال لم يبلغ النصاب، فلا زكاة عليه'}})}
var groups=[
['الدين والعبادة',[['الصلاة وغيرها',go('الدين')],['المسبحة',tasbih],['الأذكار',adhkar],['القبلة',qibla],['حاسبة الزكاة',zakat]]],
['الرياضة',[['مؤشر كتلة الجسم',sp],['نبضات القلب',sp],['السرعة والوتيرة',sp],['السعرات المحروقة',sp],['مؤقت التمارين',sp]]],
['الأدوات',[['الحاسبة',go('calc')],['النسبة المئوية',go('pct')],['تحويل الوحدات',go('conv')]]],
['الوقت والمهام',[['المؤقت',go('timer')],['المهام',go('todo')],['القرعة',go('draw')]]],
['المزيد',[['المال',go('المال')],['الدراسة والعمل',go('الدراسة')],['الحياة اليومية',go('الحياة')],['الترفيه',go('الترفيه')]]]
];
var m=document.createElement('div');m.id='mn';
groups.forEach(function(g){var h=document.createElement('h3');h.textContent=g[0];m.appendChild(h);var d=document.createElement('div');d.className='g';g[1].forEach(function(b){var e=document.createElement('button');e.textContent=b[0];e.onclick=b[1];d.appendChild(e)});m.appendChild(d)});
host.style.display='none';host.parentNode.insertBefore(m,host);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(init,300)});else setTimeout(init,300);
})();
