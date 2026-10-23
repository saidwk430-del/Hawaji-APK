(function(){
function L(a,e,f){return lang=='ar'?a:lang=='fr'?f:e;}
function BK(){return L('← رجوع','← Back','← Retour');}
function $(i){return document.getElementById(i);}
function out(id,s){var e=$(id);if(e)e.textContent=s;}
function gv(id){var v=parseFloat($(id).value);return isNaN(v)?0:v;}
function gi(id){var v=parseInt($(id).value,10);return isNaN(v)||v<0?0:v;}
function ck(id){return $(id).checked?1:0;}
function bad(){return L('أدخل أرقاماً صحيحة','Enter valid numbers','Entrez des nombres valides');}

/* ---------- حاسبة الميراث (نموذج مبسّط) ---------- */
function inheritance(p){
  var ch=p.s+p.d,fx={},sum=0,R,units,k,rec,rs,sp;
  function add(key,v){fx[key]=(fx[key]||0)+v;sum+=v;}
  if(p.h)add('h',ch?1/4:1/2);
  if(p.w)add('w',ch?1/8:1/4);
  if(p.m)add('m',ch?1/6:1/3);
  if(p.f&&(p.s>0||p.d>0))add('f',1/6);
  if(p.s==0&&p.d>0)add('d',p.d==1?1/2:2/3);
  if(sum>1){for(k in fx)fx[k]/=sum;sum=1;R=0;}
  else R=1-sum;
  if(R>0){
    if(p.s>0){
      units=2*p.s+p.d;
      fx.s=(fx.s||0)+R*2*p.s/units;
      fx.d=(fx.d||0)+R*p.d/units;
    }else if(p.f){
      fx.f=(fx.f||0)+R;
    }else{
      rec=['m','d'];rs=0;
      rec.forEach(function(r){rs+=fx[r]||0;});
      if(rs>0){rec.forEach(function(r){if(fx[r])fx[r]+=R*fx[r]/rs;});}
      else{sp=p.h?'h':p.w?'w':null;if(sp)fx[sp]+=R;}
    }
  }
  return fx;
}
function ihHtml(){
  var cb=function(id,n){return '<label><input type="checkbox" id="'+id+'" style="width:auto"> '+n+'</label>';};
  var nm=function(id,n){return '<label>'+n+'</label><input id="'+id+'" inputmode="numeric" value="0">';};
  return cb('ihH',L('الزوج حي','Husband alive','Mari vivant'))+
    nm('ihW',L('عدد الزوجات','Number of wives','Nombre d\'épouses'))+
    nm('ihS',L('عدد الأبناء الذكور','Number of sons','Nombre de fils'))+
    nm('ihD',L('عدد البنات','Number of daughters','Nombre de filles'))+
    cb('ihF',L('الأب حي','Father alive','Père vivant'))+
    cb('ihM',L('الأم حية','Mother alive','Mère vivante'))+
    '<label>'+L('قيمة التركة (اختياري)','Estate value (optional)','Valeur de la succession (facultatif)')+'</label>'+
    '<input id="ihE" inputmode="decimal" value="">'+
    '<button class="btn" id="ihG">'+L('احسب','Calculate','Calculer')+'</button>'+
    '<div class="out" id="ihO" style="white-space:pre-line;font-size:16px"></div>';
}
function inhCalc(){
  var p={h:ck('ihH'),w:gi('ihW'),s:gi('ihS'),d:gi('ihD'),f:ck('ihF'),m:ck('ihM'),e:gv('ihE')};
  if(p.h&&p.w){out('ihO',L('لا يجتمع الزوج والزوجة','Husband and wife cannot both be selected','Mari et épouse ne peuvent pas être réunis'));return;}
  if(!(p.h||p.w||p.s||p.d||p.f||p.m)){out('ihO',bad());return;}
  var res=inheritance(p),lines=[];
  var G=[
    {k:'h',n:L('الزوج','Husband','Mari'),c:p.h},
    {k:'w',n:L('الزوجات','Wives','Épouses'),c:p.w},
    {k:'m',n:L('الأم','Mother','Mère'),c:p.m},
    {k:'f',n:L('الأب','Father','Père'),c:p.f},
    {k:'s',n:L('الأبناء','Sons','Fils'),c:p.s},
    {k:'d',n:L('البنات','Daughters','Filles'),c:p.d}
  ];
  G.forEach(function(g){
    if(!g.c||!res[g.k])return;
    var per=res[g.k]/g.c;
    lines.push(g.n+' ('+g.c+'): '+(per*100).toFixed(2)+'%'+(p.e>0?' = '+(per*p.e).toFixed(2):''));
  });
  lines.push(L('ملاحظة: نموذج مبسّط يشمل الورثة المذكورين فقط، ولا يشمل الإخوة والأجداد وغيرهم. راجع عالماً مختصاً قبل الاعتماد عليه.',
    'Simplified model: only the heirs listed are included; siblings, grandparents and others are not. Consult a qualified scholar before relying on it.',
    'Modèle simplifié : seuls les héritiers indiqués sont pris en compte. Consultez un savant qualifié avant de vous y fier.'));
  out('ihO',lines.join('\n'));
}
function ihInit(){$('ihG').onclick=inhCalc;}

/* ---------- مزامنة تذكير الأدوية مع الإشعارات ---------- */
var lastMeds=null;
setInterval(function(){
  var cur=localStorage.getItem('hw_meds')||'[]';
  if(cur!==lastMeds){
    lastMeds=cur;
    try{if(window.Android&&Android.syncMeds)Android.syncMeds(cur,lang);}catch(e){}
  }
},2000);

/* ---------- تسجيل الأداة ---------- */
var EXTRA=[
  {g:'g_rel',id:'ih',name:function(){return L('حاسبة الميراث','Inheritance calculator','Calcul d\'héritage');},html:ihHtml,init:ihInit}
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
var _prev2=setLang;
setLang=function(l){_prev2(l);ensure();};
ensure();
})();
