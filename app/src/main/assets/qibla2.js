(function(){
function L(a,e,f){return lang=='ar'?a:lang=='fr'?f:e;}
function $(i){return document.getElementById(i);}
var H=null,B=null,asked=false;
function calc(lat,lon){
  var f1=lat*Math.PI/180,f2=21.4225*Math.PI/180,dl=(39.8262-lon)*Math.PI/180;
  var th=Math.atan2(Math.sin(dl),Math.cos(f1)*Math.tan(f2)-Math.sin(f1)*Math.cos(dl));
  return ((th*180/Math.PI)+360)%360;
}
function loadLoc(){
  try{var s=JSON.parse(localStorage.getItem('hw_loc'));if(s&&s.lat!=null){B=calc(s.lat,s.lon);return;}}catch(e){}
  if(asked||!navigator.geolocation)return;
  asked=true;
  navigator.geolocation.getCurrentPosition(function(p){
    localStorage.setItem('hw_loc',JSON.stringify({lat:p.coords.latitude,lon:p.coords.longitude}));
    B=calc(p.coords.latitude,p.coords.longitude);draw();
  },function(){},{timeout:20000,maximumAge:600000});
}
function ori(e){
  var h=null;
  if(typeof e.webkitCompassHeading==='number')h=e.webkitCompassHeading;
  else if(e.alpha!=null)h=(360-e.alpha)%360;
  if(h!=null){H=h;draw();}
}
window.addEventListener('deviceorientationabsolute',ori,true);
window.addEventListener('deviceorientation',ori,true);
function ticks(){
  var s='',i,big;
  for(i=0;i<360;i+=5){big=(i%30===0);
    s+='<line x1="0" y1="-96" x2="0" y2="'+(big?-84:-90)+'" stroke="#8a6a2a" stroke-width="'+(big?2:1)+'" transform="rotate('+i+')"/>';}
  return s;
}
function svg(){
  return '<svg viewBox="-110 -110 220 220" width="250" height="250" style="display:block;margin:10px auto">'+
  '<polygon points="-9,-108 9,-108 0,-92" fill="#ff5a4a"/>'+
  '<g class="cqDial"><circle r="100" fill="#0e0e0e" stroke="#c9a24a" stroke-width="3"/>'+
  '<circle r="78" fill="none" stroke="#5a4418" stroke-width="1"/>'+ticks()+
  '<g fill="#ffe08a" font-size="18" font-weight="700" text-anchor="middle" font-family="sans-serif">'+
  '<text x="0" y="-58" fill="#ff5a4a">N</text><text x="62" y="6">E</text><text x="0" y="70">S</text><text x="-62" y="6">W</text></g>'+
  '<g class="cqNeedle"><line x1="0" y1="0" x2="0" y2="-64" stroke="#ffe27a" stroke-width="4" stroke-linecap="round"/>'+
  '<rect x="-9" y="-80" width="18" height="18" rx="3" fill="#111" stroke="#ffe27a" stroke-width="2"/></g>'+
  '<circle r="6" fill="#ffe27a"/></g></svg>';
}
function msg(){
  if(B==null)return L('فعّل الموقع لتحديد القبلة','Enable location to find Qibla','Activez la localisation pour la Qibla');
  if(H==null)return L('البوصلة غير متاحة على هذا الجهاز','Compass not available on this device','Boussole indisponible');
  var d=((B-H)%360+360)%360;
  if(d<=5||d>=355)return L('أنت باتجاه القبلة ✓','You are facing the Qibla ✓','Vous êtes face à la Qibla ✓');
  return L('أدر الهاتف حتى يصل السهم الذهبي إلى الأعلى','Turn the phone until the gold needle reaches the top','Tournez le téléphone jusqu\'à ce que l\'aiguille atteigne le haut');
}
function draw(){
  var i,ds=document.querySelectorAll('.cqDial'),ns=document.querySelectorAll('.cqNeedle'),gs=document.querySelectorAll('.cqDeg'),ms=document.querySelectorAll('.cqMsg');
  for(i=0;i<ds.length;i++)ds[i].setAttribute('transform','rotate('+(H==null?0:-H)+')');
  for(i=0;i<ns.length;i++)ns[i].setAttribute('transform','rotate('+(B==null?0:B)+')');
  var t=msg();
  for(i=0;i<gs.length;i++)gs[i].textContent=B==null?'—':Math.round(B)+'°';
  for(i=0;i<ms.length;i++)ms[i].textContent=t;
}
function ins(before){
  var d=document.createElement('div');d.className='cqWrap';
  d.innerHTML=svg()+'<div class="big cqDeg"></div><div class="note cqMsg"></div>';
  before.parentNode.insertBefore(d,before);
}
function sync(){
  var ov=$('ov'),h=ov?ov.querySelector('h2'):null,o=$('o');
  if(h&&o&&h.textContent.indexOf('القبلة')>-1){
    var m=o.textContent.match(/([\d.]+)\s*°/);
    if(m)B=parseFloat(m[1]);
    if(!o.parentNode.querySelector('.cqDial'))ins(o);
    if($('cp'))$('cp').style.display='none';
    if($('cs'))$('cs').style.display='none';
    draw();return;
  }
  var qo=$('qbO');
  if(!qo)return;
  if($('qbA'))$('qbA').style.display='none';
  if(!qo.parentNode.querySelector('.cqDial'))ins(qo);
  if(B==null)loadLoc();
  draw();
}
setInterval(sync,500);
})();
