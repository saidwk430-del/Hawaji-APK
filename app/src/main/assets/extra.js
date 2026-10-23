(function(){
function L(a,e,f){return lang=='ar'?a:lang=='fr'?f:e;}
function BK(){return L('← رجوع','← Back','← Retour');}
function $(i){return document.getElementById(i);}
function out(id,s){var e=$(id);if(e)e.textContent=s;}
function gj(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v==null?d:v;}catch(e){return d;}}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
function hm(h){var m=Math.round(h*60);return ('0'+(Math.floor(m/60)%24)).slice(-2)+':'+('0'+(m%60)).slice(-2);}

var st=document.createElement('style');
st.textContent='.sg{display:grid;grid-template-columns:repeat(9,1fr);gap:1px;background:#b8923a;border:2px solid #b8923a;direction:ltr;max-width:420px;margin:auto}'+
'.sc{background:#171717;color:#fff;aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:18px;cursor:pointer}'+
'.sc.g{color:#ffe14d;font-weight:700}.sc.s{background:#3a3320}.sc.x{color:#ff6b6b}'+
'.pad{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;max-width:420px;margin:12px auto}.pad .btn{margin:0}';
document.head.appendChild(st);

/* ---------- السودوكو ---------- */
var SD={s:null,p:null,g:null,sel:-1};
function canPlace(b,i,v){var r=Math.floor(i/9),c=i%9,br=r-r%3,bc=c-c%3,k,y,x;
  for(k=0;k<9;k++){if(b[r*9+k]===v||b[k*9+c]===v)return false;}
  for(y=0;y<3;y++)for(x=0;x<3;x++)if(b[(br+y)*9+bc+x]===v)return false;
  return true;}
function fillBoard(b,i){if(i===81)return true;if(b[i])return fillBoard(b,i+1);
  var nums=shuffle([1,2,3,4,5,6,7,8,9]);
  for(var k=0;k<9;k++){if(canPlace(b,i,nums[k])){b[i]=nums[k];if(fillBoard(b,i+1))return true;b[i]=0;}}
  return false;}
function countSol(b,i,lim){if(i===81)return 1;if(b[i])return countSol(b,i+1,lim);
  var n=0;for(var v=1;v<=9;v++){if(canPlace(b,i,v)){b[i]=v;n+=countSol(b,i+1,lim-n);b[i]=0;if(n>=lim)break;}}
  return n;}
function sdNew(){
  var full=[];for(var z=0;z<81;z++)full.push(0);
  fillBoard(full,0);
  var pz=full.slice(),idx=[];for(var q=0;q<81;q++)idx.push(q);shuffle(idx);
  var rem=0;
  for(var k=0;k<81&&rem<46;k++){var i=idx[k],keep=pz[i];pz[i]=0;
    if(countSol(pz.slice(),0,2)===1)rem++;else pz[i]=keep;}
  SD.s=full;SD.p=pz;SD.g=pz.map(function(v){return v!==0;});SD.sel=-1;
}
function sdDraw(){var h='';
  for(var i=0;i<81;i++){var v=SD.p[i],c='sc';
    if(SD.g[i])c+=' g';if(i===SD.sel)c+=' s';if(v&&v!==SD.s[i])c+=' x';
    h+='<div class="'+c+'" data-i="'+i+'">'+(v||'')+'</div>';}
  $('sdG').innerHTML=h;}
function sdPress(v){
  if(SD.sel<0||SD.g[SD.sel])return;
  SD.p[SD.sel]=v;sdDraw();
  var done=SD.p.every(function(x,i){return x===SD.s[i];});
  out('sdO',done?L('أحسنت! اكتمل الحل','Well done! Solved','Bravo ! Résolu'):'');
}
function sdCheck(){
  var wrong=SD.p.some(function(x,i){return x&&x!==SD.s[i];});
  out('sdO',wrong?L('توجد أخطاء (باللون الأحمر)','There are mistakes (red)','Il y a des erreurs (rouge)'):L('حتى الآن صحيح','So far so good','Jusqu\'ici correct'));
}
function sdHtml(){return '<div id="sdG" class="sg"></div><div class="pad" id="sdP"></div>'+
  '<div class="row"><button class="btn" id="sdN">'+L('لعبة جديدة','New game','Nouvelle partie')+'</button><button class="btn g" id="sdC">'+L('تحقق','Check','Vérifier')+'</button></div>'+
  '<div class="out" id="sdO"></div>';}
function sdInit(){
  if(!SD.p)sdNew();
  var h='';for(var v=1;v<=9;v++)h+='<button class="btn g" data-v="'+v+'">'+v+'</button>';
  h+='<button class="btn g" data-v="0">×</button>';
  $('sdP').innerHTML=h;
  $('sdP').onclick=function(e){var v=e.target.getAttribute('data-v');if(v!==null)sdPress(+v);};
  $('sdG').onclick=function(e){var i=e.target.getAttribute('data-i');if(i!==null){SD.sel=+i;sdDraw();}};
  $('sdN').onclick=function(){sdNew();sdDraw();out('sdO','');};
  $('sdC').onclick=sdCheck;
  sdDraw();
}

/* ---------- الموقع ---------- */
function getLoc(force,cb){
  var s=gj('hw_loc',null);
  if(s&&!force){cb(s);return;}
  if(!navigator.geolocation){cb(s);return;}
  navigator.geolocation.getCurrentPosition(function(p){
    var o={lat:p.coords.latitude,lon:p.coords.longitude};
    localStorage.setItem('hw_loc',JSON.stringify(o));cb(o);
  },function(){cb(s);},{timeout:20000,maximumAge:600000,enableHighAccuracy:false});
}

/* ---------- مواقيت الصلاة التلقائية ---------- */
function solar(d){
  var jd=d.getTime()/86400000+2440587.5,D=jd-2451545.0;
  var g=((357.529+0.98560028*D)%360)*Math.PI/180,q=(280.459+0.98564736*D)%360;
  var Lr=(q+1.915*Math.sin(g)+0.020*Math.sin(2*g))*Math.PI/180;
  var e=(23.439-0.00000036*D)*Math.PI/180;
  var ra=Math.atan2(Math.cos(e)*Math.sin(Lr),Math.cos(Lr));
  var dec=Math.asin(Math.sin(e)*Math.sin(Lr));
  var eq=q-ra*180/Math.PI;eq=((eq%360)+540)%360-180;
  return {dec:dec,eqt:eq/15};
}
function ptimes(lat,lon,date){
  var noon=Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),12);
  var s=solar(new Date(noon)),phi=lat*Math.PI/180,dec=s.dec,tz=-date.getTimezoneOffset()/60;
  var dh=12-lon/15+s.eqt;
  function ha(alt){var x=(Math.sin(alt*Math.PI/180)-Math.sin(phi)*Math.sin(dec))/(Math.cos(phi)*Math.cos(dec));
    x=Math.max(-1,Math.min(1,x));return Math.acos(x)*180/Math.PI/15;}
  var asrAlt=Math.atan(1/(1+Math.tan(Math.abs(phi-dec))))*180/Math.PI;
  var r=[dh-ha(-18),dh,dh+ha(asrAlt),dh+ha(-0.833),dh+ha(-17)];
  return r.map(function(h){return (((h+tz)%24)+24)%24;});
}
function pn(){return [L('الفجر','Fajr','Fajr'),L('الظهر','Dhuhr','Dhuhr'),L('العصر','Asr','Asr'),L('المغرب','Maghrib','Maghreb'),L('العشاء','Isha','Isha')];}
function paHtml(){return '<div class="out" id="paO" style="white-space:pre-line"></div>'+
  '<button class="btn" id="paG">'+L('تحديث الموقع والمواقيت','Update location & times','Mettre à jour position et horaires')+'</button>'+
  '<div class="note">'+L('يحتاج إذن الموقع مرة واحدة، ثم يعمل دون إنترنت','Needs location permission once, then works offline','Autorisation de localisation requise une fois, puis hors ligne')+'</div>';}
function paShow(loc){
  if(!loc){out('paO',L('فعّل الموقع واضغط التحديث','Enable location and press update','Activez la localisation puis mettez à jour'));return;}
  var now=new Date(),tms=ptimes(loc.lat,loc.lon,now),nowH=now.getHours()+now.getMinutes()/60,names=pn(),txt='',next=-1,d,i;
  for(i=0;i<5;i++)txt+=names[i]+': '+hm(tms[i])+'\n';
  for(i=0;i<5;i++){if(tms[i]>nowH){next=i;break;}}
  if(next<0){next=0;d=tms[0]+24-nowH;}else d=tms[next]-nowH;
  txt+=L('الصلاة القادمة: ','Next: ','Prochaine : ')+names[next]+' - '+L('بعد ','in ','dans ')+Math.floor(d)+'h '+Math.round((d%1)*60)+'m';
  out('paO',txt);
}
function paInit(){
  $('paG').onclick=function(){getLoc(true,paShow);};
  getLoc(false,paShow);
}

/* ---------- القبلة ---------- */
var QB={bearing:null,heading:null,on:false};
function qbHtml(){return '<div id="qbA" style="font-size:90px;text-align:center;transition:transform .3s linear;line-height:1.2">↑</div>'+
  '<div class="out" id="qbO" style="white-space:pre-line"></div>'+
  '<button class="btn" id="qbG">'+L('تحديد الموقع','Locate','Localiser')+'</button>'+
  '<div class="note">'+L('ضع الهاتف أفقياً، والسهم يشير إلى القبلة','Hold the phone flat; the arrow points to Qibla','Tenez le téléphone à plat ; la flèche indique la Qibla')+'</div>';}
function qbDraw(){
  if(QB.bearing==null||!$('qbA'))return;
  var rot=QB.heading==null?QB.bearing:QB.bearing-QB.heading;
  $('qbA').style.transform='rotate('+rot+'deg)';
  out('qbO',L('اتجاه القبلة: ','Qibla bearing: ','Direction Qibla : ')+Math.round(QB.bearing)+'°'+
    (QB.heading==null?'\n'+L('البوصلة غير متاحة في هذا الجهاز','Compass not available on this device','Boussole indisponible'):''));
}
function qbCalc(loc){
  if(!loc){out('qbO',L('فعّل الموقع واضغط تحديد','Enable location and press Locate','Activez la localisation puis appuyez sur Localiser'));return;}
  var f1=loc.lat*Math.PI/180,f2=21.4225*Math.PI/180,dl=(39.8262-loc.lon)*Math.PI/180;
  var th=Math.atan2(Math.sin(dl),Math.cos(f1)*Math.tan(f2)-Math.sin(f1)*Math.cos(dl));
  QB.bearing=((th*180/Math.PI)+360)%360;qbDraw();
}
function qbOrient(e){
  var h=null;
  if(typeof e.webkitCompassHeading==='number')h=e.webkitCompassHeading;
  else if(e.alpha!=null)h=(360-e.alpha)%360;
  if(h!=null){QB.heading=h;qbDraw();}
}
function qbInit(){
  $('qbG').onclick=function(){getLoc(true,qbCalc);};
  if(!QB.on){QB.on=true;
    window.addEventListener('deviceorientationabsolute',qbOrient,true);
    window.addEventListener('deviceorientation',qbOrient,true);}
  getLoc(false,qbCalc);
}

/* ---------- تسجيل الأدوات الجديدة ---------- */
var EXTRA=[
  {g:'g_rel',id:'pa',name:function(){return L('المواقيت التلقائية','Auto prayer times','Horaires automatiques');},html:paHtml,init:paInit},
  {g:'g_rel',id:'qb',name:function(){return L('القبلة','Qibla','Qibla');},html:qbHtml,init:qbInit},
  {g:'g_fun',id:'sd',name:function(){return L('سودوكو','Sudoku','Sudoku');},html:sdHtml,init:sdInit}
];
function ensure(){
  EXTRA.forEach(function(x){
    var m=$('m_'+x.g);if(!m)return;
    var grid=m.querySelector('.grid');if(!grid)return;
    if(!$('go_'+x.id)){var b=document.createElement('button');b.className='tile';b.id='go_'+x.id;grid.appendChild(b);}
    $('go_'+x.id).textContent=x.name();
    $('go_'+x.id).onclick=function(){show('t_'+x.id);};
    var p=$('t_'+x.id);
    if(!p){p=document.createElement('div');p.id='t_'+x.id;p.className='panel';document.querySelector('main').appendChild(p);}
    p.innerHTML='<button class="back" id="bt_'+x.id+'">'+BK()+'</button><h2>'+x.name()+'</h2>'+x.html();
    $('bt_'+x.id).onclick=function(){show('m_'+x.g);};
    x.init();
  });
}
var _prev=setLang;
setLang=function(l){_prev(l);ensure();};
ensure();
})();
