(function(){
var st=document.createElement('style');
st.textContent='.cd{display:flex;justify-content:space-between;align-items:center;background:#151e30;border:1px solid #26334d;border-radius:16px;padding:16px 18px;margin:10px 0;font-size:18px;color:#e6edf7}.cd b{color:#fbbf24;font-size:21px;direction:ltr;unicode-bidi:plaintext}.nt{color:#8a97ad;font-size:14px;margin:10px 4px;line-height:1.8}#cp{width:270px;height:270px;margin:22px auto 8px}#cp svg{width:100%;height:100%}#cs{text-align:center;font-size:17px;color:#e6edf7;margin:6px 0 24px}#cs.ok{color:#34d399;font-weight:700}';
document.head.appendChild(st);
var bear=0,hd=null,was=false;
function plain(s){var d=document.createElement('div');d.innerHTML=s;return d.textContent.trim()}
function compass(o){
if(document.getElementById('cp'))return;
var c=document.createElement('div');c.id='cp';
var t='';for(var i=0;i<360;i+=30){t+='<line x1="0" y1="-95" x2="0" y2="'+(i%90?-88:-82)+'" stroke="#4b5b7a" stroke-width="2" transform="rotate('+i+')"/>'}
c.innerHTML='<svg viewBox="-110 -110 220 220"><polygon points="-9,-108 9,-108 0,-92" fill="#f87171"/><g id="dl"><circle r="95" fill="#151e30" stroke="#26334d" stroke-width="3"/>'+t+'<g fill="#e6edf7" font-size="16" text-anchor="middle" font-family="sans-serif"><text x="0" y="-62" fill="#f87171">N</text><text x="68" y="6">E</text><text x="0" y="74">S</text><text x="-68" y="6">W</text></g><g id="ar" transform="rotate(0)"><line x1="0" y1="0" x2="0" y2="-62" stroke="#fbbf24" stroke-width="5" stroke-linecap="round"/><rect x="-11" y="-84" width="22" height="22" rx="3" fill="#fbbf24"/><rect x="-11" y="-78" width="22" height="5" fill="#0a1020"/></g><circle r="6" fill="#fbbf24"/></g></svg>';
var s=document.createElement('div');s.id='cs';s.textContent='حرّك الهاتف على شكل 8 لمعايرة البوصلة';
o.parentNode.insertBefore(c,o.nextSibling);o.parentNode.insertBefore(s,c.nextSibling);
}
function draw(){
var d=document.getElementById('dl');if(!d)return;
d.setAttribute('transform','rotate('+(hd==null?0:-hd)+')');
document.getElementById('ar').setAttribute('transform','rotate('+bear+')');
var s=document.getElementById('cs');if(hd==null)return;
var diff=((bear-hd)%360+360)%360,ok=diff<=5||diff>=355;
s.className=ok?'ok':'';s.textContent=ok?'أنت باتجاه القبلة ✓':'اتجاه هاتفك: '+Math.round(hd)+'°';
if(ok&&!was&&navigator.vibrate)navigator.vibrate(150);was=ok;
}
function ori(e){
if(!document.getElementById('dl'))return;
var h;
if(e.webkitCompassHeading!=null)h=e.webkitCompassHeading;
else if(e.alpha!=null&&(e.absolute||e.type==='deviceorientationabsolute'))h=(360-e.alpha)%360;
else return;
hd=h;draw();
}
window.addEventListener('deviceorientationabsolute',ori,true);
window.addEventListener('deviceorientation',ori,true);
function card(l,v){return '<div class="cd"><span>'+l+'</span><b>'+v+'</b></div>'}
new MutationObserver(function(){
var ov=document.getElementById('ov');if(!ov)return;
var h=ov.querySelector('h2'),o=document.getElementById('o');
if(!h||!o||h.textContent.indexOf('القرآن')>-1)return;
if(o.dataset.s===o.innerHTML)return;
var raw=o.innerHTML,out='';
if(h.textContent.indexOf('القبلة')>-1){
var m=plain(raw).match(/([\d.]+)\s*°/);
if(!m)return;
bear=parseFloat(m[1]);was=false;
out=card('اتجاه القبلة',bear.toFixed(1)+'°')+'<div class="nt">وجّه الهاتف حتى يتطابق السهم الذهبي مع العلامة الحمراء أعلى البوصلة</div>';
o.innerHTML=out;o.dataset.s=o.innerHTML;
compass(o);draw();return;
}
raw.split(/<br\s*\/?>/i).forEach(function(line){
if(!line.trim())return;
if(/<small/i.test(line)){out+='<div class="nt">'+plain(line)+'</div>';return}
var t=plain(line),i=t.indexOf(':');
out+=i>0?card(t.slice(0,i).trim(),t.slice(i+1).trim()):card(t,'');
});
o.innerHTML=out;o.dataset.s=o.innerHTML;
}).observe(document.body,{childList:true,subtree:true});
})();
