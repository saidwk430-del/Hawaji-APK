(function(){
var SETS=[
  ['الرئيسية','صحتي','إسلاميات','الإعدادات'],
  ['Home','Health','Islamic','Settings'],
  ['Accueil','Santé','Islamique','Réglages']
];
var navEl=null,items=[];
function txt(el){return (el.textContent||'').replace(/\s+/g,' ').trim();}
function findNav(){
  var best=null,bl=1e9;
  var all=document.body.querySelectorAll('*');
  for(var i=0;i<all.length;i++){
    var el=all[i],t=txt(el);
    if(t.length>300||t.length===0)continue;
    for(var s=0;s<SETS.length;s++){
      var ok=SETS[s].every(function(l){return t.indexOf(l)>-1;});
      if(ok&&t.length<bl){best=el;bl=t.length;}
    }
  }
  return best;
}
function findItems(nav,labels){
  return labels.map(function(l){
    var f=null;
    nav.querySelectorAll('*').forEach(function(el){if(txt(el)===l)f=el;});
    return f;
  });
}
function hide(nav){
  var h=nav;
  while(h.parentNode&&h.parentNode!==document.body&&txt(h.parentNode)===txt(nav))h=h.parentNode;
  h.style.display='none';
}
function inject(nav){
  var t=document.getElementById('t_qhub');
  if(!t||document.getElementById('qh_nav'))return;
  var set=null;
  SETS.forEach(function(s){if(!set&&s.every(function(l){return txt(nav).indexOf(l)>-1;}))set=s;});
  if(!set)return;
  items=findItems(nav,set);
  var box=document.createElement('div');
  box.id='qh_nav';
  box.style.cssText='display:flex;justify-content:space-around;gap:6px;margin-top:18px;padding:8px;border:1px solid #c9a24a;border-radius:18px;background:#0b0b0b';
  set.forEach(function(label,i){
    var b=document.createElement('button');
    b.className='btn g';
    b.style.cssText='flex:1;font-size:13px;padding:10px 4px';
    b.textContent=label;
    b.onclick=function(){if(items[i])items[i].click();};
    box.appendChild(b);
  });
  t.appendChild(box);
}
function tick(){
  var nav=(navEl&&document.body.contains(navEl))?navEl:findNav();
  if(!nav)return;
  navEl=nav;
  hide(nav);
  inject(nav);
}
setInterval(tick,800);
})();
