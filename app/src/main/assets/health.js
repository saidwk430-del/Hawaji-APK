(function(){
var H={
ar:{health:'الصحة',hw:'عداد الماء',hsteps:'عداد الخطوات',bmi:'مؤشر الكتلة (BMI)',cal:'السعرات الحرارية',sleep:'متتبع النوم',med:'تذكير الأدوية',ex:'مؤقت التمارين',glass:'كوب (250 مل)',goal:'الهدف',save:'حفظ',weight:'الوزن (كغ)',height:'الطول (سم)',age:'العمر',gender:'الجنس',male:'ذكر',female:'أنثى',activity:'مستوى النشاط',act1:'قليل الحركة',act2:'نشاط خفيف',act3:'نشاط متوسط',act4:'نشاط عالٍ',maint:'للحفاظ على وزنك',lose:'لإنقاص نصف كغ أسبوعياً',under:'نقص في الوزن',normal:'وزن طبيعي',over:'زيادة في الوزن',obese:'سمنة',bed:'وقت النوم',wake:'وقت الاستيقاظ',hours:'مدة النوم',mname:'اسم الدواء',mtime:'الوقت',noMeds:'لا توجد أدوية محفوظة',work:'وقت العمل (ثانية)',rest:'وقت الراحة (ثانية)',rounds:'عدد الجولات',wl:'عمل',rl:'راحة',finished:'انتهى التمرين!',hint:'التذكير يظهر داخل التطبيق عند فتحه، وليس إشعاراً خارجياً.',del:'حذف',steps:'عدد الخطوات اليوم',invalid:'أدخل أرقاماً صحيحة'},
en:{health:'Health',hw:'Water counter',hsteps:'Step counter',bmi:'BMI calculator',cal:'Calorie calculator',sleep:'Sleep tracker',med:'Medication reminder',ex:'Exercise timer',glass:'glass (250 ml)',goal:'Goal',save:'Save',weight:'Weight (kg)',height:'Height (cm)',age:'Age',gender:'Gender',male:'Male',female:'Female',activity:'Activity level',act1:'Sedentary',act2:'Light activity',act3:'Moderate activity',act4:'Very active',maint:'To maintain weight',lose:'To lose 0.5 kg per week',under:'Underweight',normal:'Normal weight',over:'Overweight',obese:'Obese',bed:'Bedtime',wake:'Wake-up time',hours:'Sleep duration',mname:'Medication name',mtime:'Time',noMeds:'No medications saved',work:'Work time (seconds)',rest:'Rest time (seconds)',rounds:'Rounds',wl:'Work',rl:'Rest',finished:'Workout finished!',hint:'Reminders show inside the app when you open it, not as external notifications.',del:'Delete',steps:'Steps today',invalid:'Enter valid numbers'},
fr:{health:"Santé",hw:"Compteur d'eau",hsteps:"Compteur de pas",bmi:"Calculateur IMC",cal:"Calories",sleep:"Suivi du sommeil",med:"Rappel médicaments",ex:"Minuteur d'exercice",glass:"verre (250 ml)",goal:"Objectif",save:"Enregistrer",weight:"Poids (kg)",height:"Taille (cm)",age:"Âge",gender:"Sexe",male:"Homme",female:"Femme",activity:"Niveau d'activité",act1:"Sédentaire",act2:"Activité légère",act3:"Activité modérée",act4:"Très actif",maint:"Pour maintenir votre poids",lose:"Pour perdre 0,5 kg par semaine",under:"Insuffisance pondérale",normal:"Poids normal",over:"Surpoids",obese:"Obésité",bed:"Heure du coucher",wake:"Heure du réveil",hours:"Durée du sommeil",mname:"Nom du médicament",mtime:"Heure",noMeds:"Aucun médicament enregistré",work:"Temps d'effort (secondes)",rest:"Temps de repos (secondes)",rounds:"Séries",wl:"Effort",rl:"Repos",finished:"Entraînement terminé !",hint:"Les rappels s'affichent dans l'application à son ouverture, pas en notification externe.",del:"Supprimer",steps:"Pas aujourd'hui",invalid:"Entrez des nombres valides"}
};
['ar','en','fr'].forEach(function(l){Object.assign(T[l],H[l]);});

var st=document.createElement('style');
st.textContent='.multi{white-space:pre-line}';
document.head.appendChild(st);

var main=document.querySelector('main'),home=document.getElementById('home');
var ht=document.createElement('button');ht.className='tile';ht.dataset.tool='health';
home.appendChild(ht);ht.onclick=function(){show('hMenu');};

var TOOLS=[['hw','p_hw'],['hsteps','p_hs'],['bmi','p_bm'],['cal','p_ca'],['sleep','p_sl'],['med','p_md'],['ex','p_ex']];
var menu='<div id="hMenu" class="panel"><button class="back" data-hb="home"></button><h2 data-k="health"></h2><div class="grid">';
TOOLS.TOOLS.forEachion(x){menu+='<button class="tile" data-tool="'+x[0]+'" data-go="'+x[1]+'"></button>';});
menu+='</div></div>';

var P={};
P.p_hw='<div id="p_hw" class="panel"><button class="back" data-hb="hMenu"></button><h2 data-k="hw"></h2><div class="big" id="hwN">0</div><div class="note" id="hwG"></div><div class="row"><button class="btn" id="hwP">+1</button><button class="btn g" id="hwM">-1</button></div></div>';
P.p_hs='<div id="p_hs" class="panel"><button class="back" data-hb="hMenu"></button><h2 data-k="hsteps"></h2><div class="row"><input id="hsIn" inputmode="numeric"><button class="btn" id="hsSave" data-k="save"></button></div><div class="out" id="hsOut"></div></div>';
P.p_bm='<div id="p_bm" class="panel"><button class="back" data-hb="hMenu"></button><h2 data-k="bmi"></h2><label data-k="weight"></label><input id="bmW" inputmode="decimal"><label data-k="height"></label><input id="bmH" inputmode="decimal"><button class="btn" id="bmGo" data-k="go"></button><div class="out multi" id="bmOut"></div></div>';
P.p_ca='<div id="p_ca" class="panel"><button class="back" data-hb="hMenu"></button><h2 data-k="cal"></h2><label data-k="age"></label><input id="caA" inputmode="numeric"><label data-k="gender"></label><select id="caG"><option value="m" data-k="male"></option><option value="f" data-k="female"></option></select><label data-k="height"></label><input id="caH" inputmode="decimal"><label data-k="weight"></label><input id="caW" inputmode="decimal"><label data-k="activity"></label><select id="caAct"><option value="0" data-k="act1"></option><option value="1" data-k="act2"></option><option value="2" data-k="act3"></option><option value="3" data-k="act4"></option></select><button class="btn" id="caGo" data-k="go"></button><div class="out multi" id="caOut"></div></div>';
P.p_sl='<div id="p_sl" class="panel"><button class="back" data-hb="hMenu"></button><h2 data-k="sleep"></h2><label data-k="bed"></label><input id="slB" type="time"><label data-k="wake"></label><input id="slW" type="time"><button class="btn" id="slGo" data-k="go"></button><div class="out" id="slOut"></div></div>';
P.p_md='<div id="p_md" class="panel"><button class="back" data-hb="hMenu"></button><h2 data-k="med"></h2><label data-k="mname"></label><input id="mName"><label data-k="mtime"></label><input id="mTime" type="time"><button class="btn" id="mAdd" data-k="add"></button><div id="mdList"></div><div class="note" data-k="hint"></div></div>';
P.p_ex='<div id="p_ex" class="panel"><button class="back" data-hb="hMenu"></button><h2 data-k="ex"></h2><label data-k="work"></label><input id="exW" inputmode="numeric" value="30"><label data-k="rest"></label><input id="exR" inputmode="numeric" value="10"><label data-k="rounds"></label><input id="exN" inputmode="numeric" value="3"><div class="row"><button class="btn" id="exBtn" data-k="start"></button><button class="btn g" id="exRst" data-k="reset"></button></div><div class="big" id="exDisp">00:00</div><div class="note" id="exPh"></div></div>';

main.insertAdjacentHTML('beforeend',menu+P.p_hw+P.p_hs+P.p_bm+P.p_ca+P.p_sl+P.p_md+P.p_ex);

document.querySelectorAll('[data-go]').forEach(function(b){b.onclick=function(){show(b.dataset.go);};});
document.querySelectorAll('[data-hb]').forEach(function(b){b.onclick=function(){show(b.dataset.hb==='home'?null:b.dataset.hb);};});

function dk(){var d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();}
function gi(k,def){var v=localStorage.getItem(k);return v===null?def:parseInt(v,10);}
function num(id){return parseFloat(document.getElementById(id).value);}
function out(id,s){document.getElementById(id).textContent=s;}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}

// الماء
function waterShow(){var n=gi('hw_w_'+dk(),0);out('hwN',n);out('hwG',t('goal')+': 8 '+t('glass')+' · '+(n*250)+' ml');}
document.getElementById('hwP').onclick=function(){var k='hw_w_'+dk();localStorage.setItem(k,gi(k,0)+1);waterShow();};
document.getElementById('hwM').onclick=function(){var k='hw_w_'+dk();localStorage.setItem(k,Math.max(0,gi(k,0)-1));waterShow();};

// الخطوات
function stepsShow(){out('hsOut',t('steps')+': '+gi('hw_s_'+dk(),0)+' / 8000');}
document.getElementById('hsSave').onclick=function(){
  var v=parseInt(document.getElementById('hsIn').value,10);
  if(isNaN(v)||v<0){out('hsOut',t('invalid'));return;}
  localStorage.setItem('hw_s_'+dk(),v);stepsShow();
};

// مؤشر الكتلة
document.getElementById('bmGo').onclick=function(){
  var w=num('bmW'),h=num('bmH')/100;
  if(!(w>0&&h>0)){out('bmOut',t('invalid'));return;}
  var b=w/(h*h),c=b<18.5?t('under'):b<25?t('normal'):b<30?t('over'):t('obese');
  out('bmOut',b.toFixed(1)+' - '+c);
};

// السعرات
var ACT=[1.2,1.375,1.55,1.725];
document.getElementById('caGo').onclick=function(){
  var a=num('caA'),h=num('caH'),w=num('caW'),g=document.getElementById('caG').value,k=parseInt(document.getElementById('caAct').value,10);
  if(!(a>0&&h>0&&w>0)){out('caOut',t('invalid'));return;}
  var bmr=10*w+6.25*h-5*a+(g=='m'?5:-161),td=Math.round(bmr*ACT[k]);
  out('caOut','BMR: '+Math.round(bmr)+' kcal\n'+t('maint')+': '+td+' kcal\n'+t('lose')+': '+(td-500)+' kcal');
};

// النوم
document.getElementById('slGo').onclick=function(){
  var b=document.getElementById('slB').value,w=document.getElementById('slW').value;
  if(!b||!w){out('slOut',t('invalid'));return;}
  var bm=+b.split(':')[0]*60+ +b.split(':')[1],wm=+w.split(':')[0]*60+ +w.split(':')[1];
  var d=(wm-bm+1440)%1440;
  out('slOut',t('hours')+': '+Math.floor(d/60)+'h '+(d%60)+'m');
};

// الأدوية
function meds(){try{return JSON.parse(localStorage.getItem('hw_meds')||'[]');}catch(e){return [];}}
function medsSave(l){localStorage.setItem('hw_meds',JSON.stringify(l));}
function medsShow(){
  var l=meds().map(function(x,i){return {n:x.n,t:x.t,i:i};}).sort(function(a,b){return a.t<b.t?-1:a.t>b.t?1:0;});
  var el=document.getElementById('mdList');
  if(!l.length){el.innerHTML='<div class="note">'+t('noMeds')+'</div>';return;}
  el.innerHTML=l.map(function(x){return '<div class="item"><span>'+esc(x.t)+' - '+esc(x.n)+'</span><button class="btn g" onclick="medDel('+x.i+')">'+t('del')+'</button></div>';}).join('');
}
window.medDel=function(i){var l=meds();l.splice(i,1);medsSave(l);medsShow();};
document.getElementById('mAdd').onclick=function(){
  var n=document.getElementById('mName').value.trim(),tm=document.getElementById('mTime').value;
  if(!n||!tm)return;
  var l=meds();l.push({n:n,t:tm});medsSave(l);
  document.getElementById('mName').value='';medsShow();
};

// مؤقت التمارين
var EX={id:null,list:[],i:0,left:0};
function exFmt(s){return ('0'+Math.floor(s/60)).slice(-2)+':'+('0'+(s%60)).slice(-2);}
function exDraw(){
  out('exDisp',exFmt(EX.left));
  out('exPh',EX.list.length&&EX.i<EX.list.length?(EX.list[EX.i].p=='w'?t('wl'):t('rl')):'');
}
function exStop(){clearInterval(EX.id);EX.id=null;document.getElementById('exBtn').textContent=t('start');}
function exTick(){
  EX.left--;
  if(EX.left<=0){
    EX.i++;
    if(EX.i>=EX.list.length){
      exStop();out('exPh',t('finished'));
      if(navigator.vibrate)navigator.vibrate([400,200,400]);
      return;
    }
    EX.left=EX.list[EX.i].s;
    if(navigator.vibrate)navigator.vibrate(150);
  }
  exDraw();
}
document.getElementById('exBtn').onclick=function(){
  if(EX.id){exStop();return;}
  if(!EX.list.length||EX.i>=EX.list.length){
    var W=parseInt(num('exW'),10),R=parseInt(num('exR'),10),N=parseInt(num('exN'),10);
    if(!(W>0&&N>0)){out('exPh',t('invalid'));return;}
    if(!(R>0))R=0;
    EX.list=[];
    for(var r=0;r<N;r++){EX.list.push({p:'w',s:W});if(r<N-1&&R>0)EX.list.push({p:'r',s:R});}
    EX.i=0;EX.left=EX.list[0].s;
  }
  EX.id=setInterval(exTick,1000);
  document.getElementById('exBtn').textContent=t('pause');
  exDraw();
};
document.getElementById('exRst').onclick=function(){
  exStop();EX.list=[];EX.i=0;EX.left=0;out('exDisp','00:00');out('exPh','');
};

// تحديث النصوص عند تغيير اللغة
function hRefresh(){
  document.querySelectorAll('[data-hb]').forEach(function(b){b.textContent='← '+t('back');});
  waterShow();stepsShow();medsShow();
  if(EX.id||EX.list.length)exDraw();
}
var _sl=setLang;
setLang=function(l){_sl(l);hRefresh();};
hRefresh();
})();
