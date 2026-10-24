(function(){
function $(i){return document.getElementById(i)}
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){}}
function num(i){return parseFloat($(i).value)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function fx(n,d){return isFinite(n)?parseFloat(n.toFixed(d==null?2:d)).toString():'—'}
function cd(l,v){return '<div class="cd"><span>'+l+'</span><b>'+v+'</b></div>'}
function ov(t,h,m){var o=$('ov');if(o)o.remove();var d=document.createElement('div');d.id='ov';d.innerHTML='<button class="bk" id="ovb">رجوع ←</button><h2>'+t+'</h2>'+h;document.body.appendChild(d);$('ovb').onclick=function(){d.remove()};if(m)m()}
function cp(s){try{if(window.HShare&&HShare.copy){HShare.copy(s);return}}catch(e){}try{navigator.clipboard.writeText(s)}catch(e){}}
function beep(f){try{var c=new (window.AudioContext||window.webkitAudioContext)(),o=c.createOscillator();o.frequency.value=f||880;o.connect(c.destination);o.start();setTimeout(function(){try{o.stop();c.close()}catch(e){}},600)}catch(e){}}
var st=document.createElement('style');
st.textContent='#ov .kp{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:12px}html body #ov .kp button{padding:16px 0!important;font-size:22px!important;margin:0!important;border-radius:20px!important}#cx{background:#05070d;border:1.5px solid #d4a437;border-radius:20px;padding:14px 18px;min-height:34px;text-align:left;direction:ltr;font-size:30px;color:#ffd24a;word-break:break-all}#cy{text-align:left;direction:ltr;color:#b89a4a;font-size:16px;min-height:22px;margin-bottom:8px}#ov .lb{display:block;margin:10px 4px 0;color:#e8c866;font-size:15px}html body #ov .sm{padding:6px 14px!important;font-size:14px!important;margin:0!important}';
document.documentElement.appendChild(st);

function getLoc(cb){var d={la:36.75,lo:3.06,src:'الجزائر العاصمة (افتراضي)'};
try{var s=JSON.parse(ls('loc')||'null');if(s)d={la:s.la,lo:s.lo,src:'آخر موقع محفوظ'}}catch(e){}
if(!navigator.geolocation){cb(d);return}
var done=false,t=setTimeout(function(){if(!done){done=true;cb(d)}},9000);
navigator.geolocation.getCurrentPosition(function(p){if(done)return;done=true;clearTimeout(t);var r={la:p.coords.latitude,lo:p.coords.longitude};ls('loc',JSON.stringify(r));cb({la:r.la,lo:r.lo,src:'موقعك الحالي'})},function(){if(done)return;done=true;clearTimeout(t);cb(d)},{timeout:8000,maximumAge:600000})}

function prayer(){ov('مواقيت الصلاة','<div class="nt" id="ls">جاري تحديد موقعك...</div><div class="r" id="o"></div>',function(){getLoc(function(l){if(!$('o'))return;$('ls').textContent='الموقع: '+l.src;
function f(h){if(isNaN(h))return '--';h=(h%24+24)%24;var m=Math.round(h*60);return ('0'+Math.floor(m/60)%24).slice(-2)+':'+('0'+m%60).slice(-2)}
var la=l.la,lo=l.lo,r=Math.PI/180,d=new Date(),N=Math.floor((d-new Date(d.getFullYear(),0,0))/864e5),tz=-d.getTimezoneOffset()/60,B=2*Math.PI*(N-81)/364,E=9.87*Math.sin(2*B)-7.53*Math.cos(B)-1.5*Math.sin(B),D=23.45*Math.sin(2*Math.PI*(284+N)/365)*r,noon=12+tz-lo/15-E/60,p=la*r;
function ha(a){return Math.acos((Math.sin(a*r)-Math.sin(p)*Math.sin(D))/(Math.cos(p)*Math.cos(D)))*180/Math.PI/15}
var aa=Math.atan(1/(1+Math.tan(Math.abs(p-D))))/r;
$('o').innerHTML='الفجر: '+f(noon-ha(-18))+'<br>الشروق: '+f(noon-ha(-0.833))+'<br>الظهر: '+f(noon+0.02)+'<br>العصر: '+f(noon+ha(aa))+'<br>المغرب: '+f(noon+ha(-0.833))+'<br>العشاء: '+f(noon+ha(-17))+'<br><small>حساب تقريبي دون إنترنت، قد يختلف دقيقة أو دقيقتين</small>'})})}

function qibla(){ov('اتجاه القبلة','<div class="nt" id="ls">جاري تحديد موقعك...</div><div class="r" id="o"></div>',function(){getLoc(function(l){if(!$('o'))return;$('ls').textContent='الموقع: '+l.src;
var p=l.la*Math.PI/180,g=l.lo*Math.PI/180,k=21.4225*Math.PI/180,m=39.8262*Math.PI/180,d=m-g,b=Math.atan2(Math.sin(d)*Math.cos(k),Math.cos(p)*Math.sin(k)-Math.sin(p)*Math.cos(k)*Math.cos(d));b=(b*180/Math.PI+360)%360;
$('o').innerHTML='اتجاه القبلة: '+b.toFixed(1)+'° من الشمال نحو الشرق'})})}

function calc(){ov('الآلة الحاسبة','<div id="cx">0</div><div id="cy"></div><div class="kp" id="kp"></div>',function(){
var ex='',ks=['C','⌫','%','÷','7','8','9','×','4','5','6','−','1','2','3','+','0','.','(',')'],kp=$('kp');
ks.forEach(function(k){var b=document.createElement('button');b.textContent=k;b.onclick=function(){press(k)};kp.appendChild(b)});
var eq=document.createElement('button');eq.textContent='=';eq.style.gridColumn='1/-1';eq.onclick=function(){press('=')};kp.appendChild(eq);
function show(){$('cx').textContent=ex||'0'}
function ev(){var s=ex.replace(/÷/g,'/').replace(/×/g,'*').replace(/−/g,'-').replace(/%/g,'/100');if(!/^[0-9+\-*\/.() ]+$/.test(s))return NaN;try{return Function('"use strict";return ('+s+')')()}catch(e){return NaN}}
function press(k){if(k==='C'){ex='';$('cy').textContent=''}else if(k==='⌫')ex=ex.slice(0,-1);else if(k==='='){var r=ev();if(isFinite(r)){$('cy').textContent=ex+' =';ex=String(parseFloat(r.toFixed(10)))}else{$('cy').textContent='خطأ في العملية'}}else ex+=k;show()}
})}

function pct(){ov('النسبة المئوية','<span class="lb">القيمة الأولى (X)</span><input id="pa" type="number" inputmode="decimal"><span class="lb">القيمة الثانية (Y)</span><input id="pb" type="number" inputmode="decimal"><button id="pc">احسب</button><div id="pr"></div>',function(){$('pc').onclick=function(){var a=num('pa'),b=num('pb');if(isNaN(a)||isNaN(b)){$('pr').innerHTML='<div class="nt">أدخل القيمتين</div>';return}$('pr').innerHTML=cd(fx(a)+'% من '+fx(b),fx(a*b/100,4))+cd(fx(a)+' من '+fx(b)+' كنسبة',fx(a/b*100,4)+'%')+cd('التغيّر من '+fx(a)+' إلى '+fx(b),fx((b-a)/a*100,4)+'%')}})}

var U={'الطول':[['متر',1],['كيلومتر',1000],['سنتيمتر',.01],['ميليمتر',.001],['ميل',1609.344],['ياردة',.9144],['قدم',.3048],['بوصة',.0254]],'الوزن':[['كيلوغرام',1],['غرام',.001],['طن',1000],['رطل',.45359237],['أونصة',.028349523]],'الحجم':[['لتر',1],['ميليلتر',.001],['متر مكعب',1000],['غالون أمريكي',3.785411784],['كوب',.2365882365]],'السرعة':[['متر/ثانية',1],['كم/ساعة',1/3.6],['ميل/ساعة',.44704],['عقدة',.514444]],'المساحة':[['متر مربع',1],['كيلومتر مربع',1e6],['هكتار',1e4],['فدان',4046.8564224],['قدم مربع',.09290304]],'الحرارة':[['مئوية °C',0],['فهرنهايت °F',0],['كلفن K',0]]};
function conv(){var cats=Object.keys(U);ov('تحويل الوحدات','<select id="vc">'+cats.map(function(c){return '<option>'+c+'</option>'}).join('')+'</select><input id="vv" type="number" inputmode="decimal" placeholder="القيمة"><select id="vf"></select><select id="vt"></select><div id="vr"></div>',function(){
function fill(){var u=U[$('vc').value],o=u.map(function(x,i){return '<option value="'+i+'">'+x[0]+'</option>'}).join('');$('vf').innerHTML=o;$('vt').innerHTML=o;$('vt').value=u.length>1?1:0;run()}
function run(){var c=$('vc').value,u=U[c],v=num('vv');if(isNaN(v)){$('vr').innerHTML='';return}var f=+$('vf').value,t=+$('vt').value,r;
if(c==='الحرارة'){var k=f===0?v+273.15:f===1?(v-32)*5/9+273.15:v;r=t===0?k-273.15:t===1?(k-273.15)*9/5+32:k}else r=v*u[f][1]/u[t][1];
$('vr').innerHTML=cd(fx(v,6)+' '+u[f][0],fx(r,6)+' '+u[t][0])}
$('vc').onchange=fill;['vv','vf','vt'].forEach(function(i){$(i).oninput=run;$(i).onchange=run});fill()})}

function timer(){ov('المؤقت','<div class="big" id="tm">05:00</div><span class="lb">الدقائق</span><input id="tmm" type="number" value="5" inputmode="numeric"><span class="lb">الثواني</span><input id="tms" type="number" value="0" inputmode="numeric"><button id="ta">ابدأ</button> <button class="bk" id="tr">إعادة</button>',function(){
var end=0,left=0,run=false,iv=null;
function fmt(s){s=Math.max(0,Math.ceil(s));return ('0'+Math.floor(s/60)).slice(-2)+':'+('0'+s%60).slice(-2)}
function setL(){left=(num('tmm')||0)*60+(num('tms')||0);$('tm').textContent=fmt(left)}
function tick(){if(!$('tm')){clearInterval(iv);return}var r=(end-Date.now())/1000;if(r<=0){clearInterval(iv);run=false;left=0;$('tm').textContent='00:00';$('ta').textContent='ابدأ';beep();if(navigator.vibrate)navigator.vibrate([300,150,300,150,300]);return}$('tm').textContent=fmt(r)}
$('ta').onclick=function(){if(run){left=(end-Date.now())/1000;run=false;clearInterval(iv);$('ta').textContent='متابعة';return}if(left<=0)setL();if(left<=0)return;end=Date.now()+left*1000;run=true;$('ta').textContent='إيقاف مؤقت';clearInterval(iv);iv=setInterval(tick,250);tick()};
$('tr').onclick=function(){clearInterval(iv);run=false;$('ta').textContent='ابدأ';setL()};
$('tmm').oninput=$('tms').oninput=function(){if(!run){$('ta').textContent='ابدأ';setL()}};
setL()})}

function todo(){ov('المهام','<input id="ti" placeholder="مهمة جديدة"><button id="tb">إضافة</button><div id="tl"></div>',function(){
var a=[];try{a=JSON.parse(ls('td')||'[]')}catch(e){}
function save(){ls('td',JSON.stringify(a))}
function rd(){var l=$('tl');l.innerHTML='';if(!a.length){l.innerHTML='<div class="nt">لا توجد مهام</div>';return}
a.forEach(function(x,i){var r=document.createElement('div');r.className='cd';var s=document.createElement('span');s.textContent=(x.d?'✓ ':'○ ')+x.t;s.style.flex='1';if(x.d){s.style.opacity='.55';s.style.textDecoration='line-through'}s.onclick=function(){x.d=!x.d;save();rd()};var b=document.createElement('button');b.textContent='حذف';b.className='sm';b.onclick=function(){a.splice(i,1);save();rd()};r.appendChild(s);r.appendChild(b);l.appendChild(r)})}
$('tb').onclick=function(){var v=$('ti').value.trim();if(!v)return;a.push({t:v,d:false});$('ti').value='';save();rd()};
$('ti').onkeydown=function(e){if(e.key==='Enter')$('tb').click()};
rd()})}

function draw(){ov('القرعة','<span class="lb">الأسماء (اسم في كل سطر)</span><textarea id="dn" rows="6"></textarea><span class="lb">عدد الفائزين</span><input id="dw" type="number" value="1" inputmode="numeric"><button id="dg">اسحب</button><div id="dr"></div>',function(){
$('dn').value=ls('dn')||'';
$('dg').onclick=function(){var n=$('dn').value.split('\n').map(function(x){return x.trim()}).filter(Boolean);ls('dn',$('dn').value);if(!n.length){$('dr').innerHTML='<div class="nt">اكتب الأسماء أولاً</div>';return}
var w=Math.max(1,Math.min(n.length,parseInt($('dw').value)||1)),c=0,t=setInterval(function(){if(!$('dr')){clearInterval(t);return}
$('dr').innerHTML='<div class="big" style="font-size:36px">'+esc(n[Math.floor(Math.random()*n.length)])+'</div>';
if(++c>12){clearInterval(t);var p=n.slice();for(var i=p.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),q=p[i];p[i]=p[j];p[j]=q}
$('dr').innerHTML=p.slice(0,w).map(function(x,i){return cd('الفائز '+(i+1),esc(x))}).join('');if(navigator.vibrate)navigator.vibrate(200)}},90)}})}

function age(){ov('حاسبة العمر','<span class="lb">تاريخ الميلاد</span><input id="ab" type="date"><button id="ac">احسب</button><div id="ar"></div>',function(){$('ac').onclick=function(){var v=$('ab').value;if(!v)return;var b=new Date(v),n=new Date();if(b>n){$('ar').innerHTML='<div class="nt">التاريخ في المستقبل</div>';return}
var y=n.getFullYear()-b.getFullYear(),m=n.getMonth()-b.getMonth(),d=n.getDate()-b.getDate();if(d<0){m--;d+=new Date(n.getFullYear(),n.getMonth(),0).getDate()}if(m<0){y--;m+=12}
var td=new Date(n.getFullYear(),n.getMonth(),n.getDate()),nb=new Date(n.getFullYear(),b.getMonth(),b.getDate());if(nb<td)nb.setFullYear(n.getFullYear()+1);
$('ar').innerHTML=cd('عمرك',y+' سنة، '+m+' شهر، '+d+' يوم')+cd('إجمالي الأيام',Math.floor((n-b)/864e5))+cd('عيد ميلادك القادم بعد',Math.round((nb-td)/864e5)+' يوم')}})}

function ddiff(){ov('الفرق بين تاريخين','<span class="lb">من</span><input id="d1" type="date"><span class="lb">إلى</span><input id="d2" type="date"><button id="dc">احسب</button><div id="dx"></div>',function(){$('dc').onclick=function(){var a=new Date($('d1').value),b=new Date($('d2').value);if(isNaN(a)||isNaN(b))return;var n=Math.round(Math.abs(b-a)/864e5);$('dx').innerHTML=cd('عدد الأيام',n)+cd('أسابيع',fx(n/7,1))+cd('أشهر تقريباً',fx(n/30.44,1))}})}

function pass(){ov('مولّد كلمة المرور','<span class="lb">الطول</span><input id="pl" type="number" value="14" inputmode="numeric"><select id="pk"><option value="1">أحرف وأرقام ورموز</option><option value="0">أحرف وأرقام فقط</option></select><button id="pg">توليد</button><div id="pw"></div>',function(){
function gen(){var L=Math.max(6,Math.min(64,parseInt($('pl').value)||14)),cs='abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'+($('pk').value==='1'?'!@#$%^&*-_?':''),a=new Uint32Array(L);crypto.getRandomValues(a);var s='';for(var i=0;i<L;i++)s+=cs[a[i]%cs.length];$('pw').innerHTML=cd('كلمة المرور',esc(s))+'<button id="pcp">نسخ</button>';$('pcp').onclick=function(){cp(s);$('pcp').textContent='تم النسخ ✓'}}
$('pg').onclick=gen;gen()})}

function coin(){ov('قلب العملة','<div class="big" id="cr">؟</div><button id="cg" style="width:100%;height:70px;font-size:20px">اقلب</button>',function(){$('cg').onclick=function(){var c=0,t=setInterval(function(){if(!$('cr')){clearInterval(t);return}$('cr').textContent=Math.random()<.5?'وجه':'كتابة';if(++c>10){clearInterval(t);if(navigator.vibrate)navigator.vibrate(80)}},80)}})}

function sw(){ov('ساعة التوقيت','<div class="big" id="sd" style="font-size:56px;direction:ltr">00:00.0</div><button id="s1">ابدأ</button> <button class="bk" id="s2">دورة</button> <button class="bk" id="s3">تصفير</button><div id="sl"></div>',function(){
var t0=0,acc=0,run=false,iv=null,laps=[];
function el(){return acc+(run?Date.now()-t0:0)}
function fmt(ms){var s=ms/1000,m=Math.floor(s/60);return ('0'+m).slice(-2)+':'+('0'+Math.floor(s%60)).slice(-2)+'.'+Math.floor(ms%1000/100)}
function upd(){if(!$('sd')){clearInterval(iv);return}$('sd').textContent=fmt(el())}
$('s1').onclick=function(){if(run){acc=el();run=false;clearInterval(iv);$('s1').textContent='متابعة'}else{t0=Date.now();run=true;iv=setInterval(upd,100);$('s1').textContent='إيقاف'}upd()};
$('s2').onclick=function(){if(!run&&!acc)return;laps.unshift(fmt(el()));$('sl').innerHTML=laps.map(function(x,i){return cd('الدورة '+(laps.length-i),x)}).join('')};
$('s3').onclick=function(){clearInterval(iv);run=false;acc=0;laps=[];$('s1').textContent='ابدأ';$('sl').innerHTML='';upd()}})}

function cdn(){ov('العدّ التنازلي','<span class="lb">اسم المناسبة</span><input id="kn" placeholder="مثال: العيد"><span class="lb">التاريخ</span><input id="kd" type="date"><button id="kg">ابدأ</button><div id="kr"></div>',function(){
var iv;$('kg').onclick=function(){var v=$('kd').value;if(!v)return;var tg=new Date(v+'T00:00:00');
function u(){if(!$('kr')){clearInterval(iv);return}var ms=tg-new Date();if(ms<=0){$('kr').innerHTML=cd(esc($('kn').value||'المناسبة'),'حان الموعد 🎉');clearInterval(iv);return}var s=Math.floor(ms/1000);$('kr').innerHTML=cd('الأيام',Math.floor(s/86400))+cd('الساعات',Math.floor(s%86400/3600))+cd('الدقائق',Math.floor(s%3600/60))+cd('الثواني',s%60)}
clearInterval(iv);u();iv=setInterval(u,1000)}})}

function disc(){ov('حاسبة الخصم','<span class="lb">السعر الأصلي</span><input id="ep" type="number" inputmode="decimal"><span class="lb">نسبة الخصم %</span><input id="ed" type="number" inputmode="decimal"><button id="ec">احسب</button><div id="er"></div>',function(){$('ec').onclick=function(){var p=num('ep'),d=num('ed');if(isNaN(p)||isNaN(d)){$('er').innerHTML='<div class="nt">أدخل القيمتين</div>';return}$('er').innerHTML=cd('السعر بعد الخصم',fx(p-p*d/100))+cd('قيمة التوفير',fx(p*d/100))}})}

function tax(){ov('حاسبة الضريبة (TVA)','<span class="lb">المبلغ</span><input id="xa" type="number" inputmode="decimal"><span class="lb">نسبة الضريبة %</span><input id="xt" type="number" value="19" inputmode="decimal"><select id="xm"><option value="0">المبلغ بدون ضريبة، أضف الضريبة</option><option value="1">المبلغ شامل الضريبة، استخرجها</option></select><button id="xc">احسب</button><div id="xr"></div>',function(){$('xc').onclick=function(){var a=num('xa'),t=num('xt');if(isNaN(a)||isNaN(t)){$('xr').innerHTML='<div class="nt">أدخل القيمتين</div>';return}
if($('xm').value==='0'){var x=a*t/100;$('xr').innerHTML=cd('الضريبة',fx(x))+cd('الإجمالي',fx(a+x))}else{var b=a/(1+t/100);$('xr').innerHTML=cd('المبلغ بدون ضريبة',fx(b))+cd('الضريبة',fx(a-b))}}})}

function bmr(){ov('احتياج السعرات','<select id="mg"><option value="5">ذكر</option><option value="-161">أنثى</option></select><span class="lb">الوزن (كغ)</span><input id="mw" type="number" inputmode="decimal"><span class="lb">الطول (سم)</span><input id="mh" type="number" inputmode="decimal"><span class="lb">العمر</span><input id="ma" type="number" inputmode="numeric"><select id="mt"><option value="1.2">قليل الحركة</option><option value="1.375">نشاط خفيف (1-3 أيام رياضة)</option><option value="1.55">نشاط متوسط (3-5 أيام)</option><option value="1.725">نشاط عالٍ (6-7 أيام)</option></select><button id="mc">احسب</button><div id="mr"></div>',function(){$('mc').onclick=function(){var w=num('mw'),h=num('mh'),a=num('ma');if(isNaN(w)||isNaN(h)||isNaN(a)){$('mr').innerHTML='<div class="nt">أدخل الوزن والطول والعمر</div>';return}var b=10*w+6.25*h-5*a+parseFloat($('mg').value),t=b*parseFloat($('mt').value);$('mr').innerHTML=cd('معدل الحرق الأساسي',fx(b,0)+' سعرة')+cd('احتياجك اليومي',fx(t,0)+' سعرة')+'<div class="nt">الأرقام تقديرية (معادلة Mifflin-St Jeor) ولا تغني عن استشارة مختص تغذية.</div>'}})}

function hijri(){ov('التاريخ الهجري','<div id="hr"></div>',function(){var d=new Date(),h='—',m='—';
try{h=new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura',{day:'numeric',month:'long',year:'numeric'}).format(d)}catch(e){try{h=new Intl.DateTimeFormat('ar-SA',{day:'numeric',month:'long',year:'numeric'}).format(d)}catch(e2){}}
try{m=new Intl.DateTimeFormat('ar',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(d)}catch(e){}
$('hr').innerHTML=cd('التاريخ الهجري',h)+cd('التاريخ الميلادي',m)+'<div class="nt">التقويم الهجري هنا بحسب أم القرى، وقد يختلف يوماً عن الرؤية المحلية.</div>'})}

var IC={age:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/>',cal:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3"/>',coin:'<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5h4a1.5 1.5 0 010 3h-3a1.5 1.5 0 000 3h4"/>',sw:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6"/>',tag:'<path d="M20 12l-8 8-9-9V3h8z"/><circle cx="7.5" cy="7.5" r="1"/>',pct:'<path d="M19 5L5 19"/><circle cx="7" cy="7" r="2"/><circle cx="17" cy="17" r="2"/>',flame:'<path d="M12 2s5 5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3 1-6 1-9z"/>',moon:'<path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/>'};
var X={'الأدوات اليومية':[['حاسبة العمر','age',age],['الفرق بين تاريخين','cal',ddiff],['مولّد كلمة المرور','key',pass],['قلب العملة','coin',coin]],'الوقت والمهام':[['ساعة التوقيت','sw',sw],['العدّ التنازلي','cal',cdn]],'المال':[['حاسبة الخصم','tag',disc],['حاسبة الضريبة','pct',tax]],'الصحة واللياقة':[['احتياج السعرات','flame',bmr]],'الصلاة والعبادة':[['التاريخ الهجري','moon',hijri]]};
var MAP={'الآلة الحاسبة':calc,'النسبة المئوية':pct,'تحويل الوحدات':conv,'المؤقت':timer,'المهام':todo,'القرعة':draw,'اتجاه القبلة':qibla,'مواقيت الصلاة':prayer};
Object.keys(X).forEach(function(k){X[k].forEach(function(b){MAP[b[0]]=b[2]})});
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#mn .g button');if(!b)return;var s=b.querySelector('span'),f=s&&MAP[s.textContent.trim()];if(!f)return;e.stopImmediatePropagation();e.preventDefault();f()},true);
function inject(){var m=$('mn');if(!m)return false;var hs=m.querySelectorAll('h3');if(!hs.length)return false;
[].forEach.call(hs,function(h){var L=X[h.textContent.trim()];if(!L)return;var g=h.nextElementSibling;while(g&&!g.classList.contains('g'))g=g.nextElementSibling;if(!g||g.getAttribute('data-x'))return;g.setAttribute('data-x','1');
L.forEach(function(b){var e=document.createElement('button');e.innerHTML='<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+IC[b[1]]+'</svg><span>'+b[0]+'</span>';g.appendChild(e)})});return true}
var k=0,t=setInterval(function(){if(inject()||++k>80)clearInterval(t)},250);
})();
