(function(){
function L(a,e,f){return lang=='ar'?a:lang=='fr'?f:e;}
function $(i){return document.getElementById(i);}
var Q={n:0,total:0,busy:false};
window.hQuranPage=function(n,total,data){
  Q.n=n;Q.total=total;Q.busy=false;
  $('qImg').src=data;$('qImg').style.opacity=1;$('qMsg').textContent='';
  $('qNum').textContent=(n+1)+' / '+total;
  localStorage.setItem('hq_last',String(n));
};
window.hQuranNone=function(){
  Q.busy=false;Q.total=0;$('qImg').removeAttribute('src');$('qNum').textContent='';
  $('qMsg').textContent=L('اضغط "اختيار الملف" واختر almadinah-qadim.pdf من التنزيلات','Press "Choose file" and select almadinah-qadim.pdf from Downloads','Appuyez sur "Choisir le fichier" et sélectionnez almadinah-qadim.pdf');
};
function go(n){
  if(Q.busy||!Q.total||n<0||n>=Q.total)return;
  Q.busy=true;$('qImg').style.opacity=.4;HPdf.page(n);
}
function labels(){
  $('bt_quran').textContent=L('← رجوع','← Back','← Retour');
  $('qPick').textContent=L('اختيار الملف','Choose file','Choisir le fichier');
  $('qNext').textContent=L('التالي','Next','Suivant');
  $('qPrev').textContent=L('السابق','Previous','Précédent');
  $('qT').textContent=L('المصحف الشريف','Holy Quran','Le Saint Coran');
  $('go_quran').textContent=L('المصحف الشريف','Holy Quran','Le Saint Coran');
}
function ensure(){
  var m=$('m_g_rel');if(!m)return;
  var grid=m.querySelector('.grid');if(!grid)return;
  if(!$('go_quran')){var b=document.createElement('button');b.className='tile';b.id='go_quran';grid.appendChild(b);}
  if(!$('t_quran')){
    var p=document.createElement('div');p.id='t_quran';p.className='panel';
    p.innerHTML='<button class="back" id="bt_quran"></button><h2 id="qT"></h2>'+
      '<div class="row"><button class="btn g" id="qPick"></button></div>'+
      '<div class="note" id="qMsg"></div>'+
      '<img id="qImg" style="width:100%;border-radius:8px;background:#fff;transition:opacity .2s">'+
      '<div class="row"><button class="btn" id="qNext"></button><button class="btn g" id="qPrev"></button></div>'+
      '<div class="big" id="qNum"></div>';
    document.querySelector('main').appendChild(p);
    $('bt_quran').onclick=function(){show('m_g_rel');};
    $('qPick').onclick=function(){HPdf.pick();};
    $('qNext').onclick=function(){go(Q.n+1);};
    $('qPrev').onclick=function(){go(Q.n-1);};
  }
  $('go_quran').onclick=function(){
    show('t_quran');
    HPdf.init(parseInt(localStorage.getItem('hq_last')||'0',10));
  };
  labels();
}
var _prevQ=setLang;
setLang=function(l){_prevQ(l);ensure();};
ensure();
})();
