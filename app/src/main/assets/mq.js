(function(){
function L(a,e,f){return lang=='ar'?a:lang=='fr'?f:e;}
function $(i){return document.getElementById(i);}
var NAMES=['الفاتحة','البقرة','آل عمران','النساء','المائدة','الأنعام','الأعراف','الأنفال','التوبة','يونس','هود','يوسف','الرعد','إبراهيم','الحجر','النحل','الإسراء','الكهف','مريم','طه','الأنبياء','الحج','المؤمنون','النور','الفرقان','الشعراء','النمل','القصص','العنكبوت','الروم','لقمان','السجدة','الأحزاب','سبإ','فاطر','يس','الصافات','ص','الزمر','غافر','فصلت','الشورى','الزخرف','الدخان','الجاثية','الأحقاف','محمد','الفتح','الحجرات','ق','الذاريات','الطور','النجم','القمر','الرحمن','الواقعة','الحديد','المجادلة','الحشر','الممتحنة','الصف','الجمعة','المنافقون','التغابن','الطلاق','التحريم','الملك','القلم','الحاقة','المعارج','نوح','الجن','المزمل','المدثر','القيامة','الإنسان','المرسلات','النبأ','النازعات','عبس','التكوير','الانفطار','المطففين','الانشقاق','البروج','الطارق','الأعلى','الغاشية','الفجر','البلد','الشمس','الليل','الضحى','الشرح','التين','العلق','القدر','البينة','الزلزلة','العاديات','القارعة','التكاثر','العصر','الهمزة','الفيل','قريش','الماعون','الكوثر','الكافرون','النصر','المسد','الإخلاص','الفلق','الناس'];
var M={cur:-1,playing:false,rep:0,avail:{}};
function refresh(){try{var a=JSON.parse(HAudio.list()||'[]');M.avail={};a.forEach(function(n){M.avail[n]=true;});}catch(e){M.avail={};}}
function info(){
  if(M.cur<0)$('mqInfo').textContent=L('اختر سورة للتشغيل','Choose a surah to play','Choisissez une sourate');
  else $('mqInfo').textContent='سورة '+NAMES[M.cur-1]+' ('+M.cur+') · '+(M.playing?L('يعمل','Playing','En cours'):L('متوقف','Paused','Pause'));
  $('mqPlay').textContent=M.playing?L('إيقاف','Pause','Pause'):L('تشغيل','Play','Lecture');
  $('mqRep').textContent=[L('تكرار: إيقاف','Repeat: off','Répéter : non'),L('تكرار: سورة','Repeat: surah','Répéter : sourate'),L('تكرار: الكل','Repeat: all','Répéter : tout')][M.rep];
}
function draw(){
  var h='',i;
  for(i=1;i<=114;i++){
    var ok=!!M.avail[i];
    h+='<div class="item" data-p="'+(ok?i:'')+'" style="'+(i==M.cur?'color:#ffe27a;font-weight:700;':'')+(ok?'':'opacity:.4')+'"><span>'+i+'. '+NAMES[i-1]+'</span></div>';
  }
  $('mqL').innerHTML=h;
}
function nextAvail(from,dir){
  var i=from;
  for(var k=0;k<114;k++){
    i+=dir;
    if(i>114){if(M.rep==2)i=1;else return -1;}
    if(i<1){if(M.rep==2)i=114;else return -1;}
    if(M.avail[i])return i;
  }
  return -1;
}
function play(n){
  if(!M.avail[n])return;
  if(HAudio.play(n)){M.cur=n;M.playing=true;}else{M.playing=false;}
  info();draw();
}
function toggle(){
  if(M.cur<0){var f=nextAvail(0,1);if(f>0)play(f);return;}
  if(M.playing){HAudio.pause();M.playing=false;}else{HAudio.resume();M.playing=true;}
  info();
}
function step(dir){var t=nextAvail(M.cur<0?0:M.cur,dir);if(t>0)play(t);}
window.hMqEnd=function(n){
  if(M.rep==1){play(n);return;}
  var t=nextAvail(n,1);
  if(t>0)play(t);else{M.playing=false;info();}
};
window.hMqScan=function(){refresh();draw();info();};
function labels(){
  $('bt_mq').textContent=L('← رجوع','← Back','← Retour');
  $('mqT').textContent=L('القرآن الكريم','Holy Quran','Le Saint Coran');$('mqR').textContent=L('القارئ: ماهر المعيقلي','Reciter: Maher Al-Muaiqly','Récitant : Maher Al-Muaiqly');
  $('mqPick').textContent=L('اختيار مجلد السور','Choose surahs folder','Choisir le dossier');
  $('mqPrev').textContent='⏮';$('mqNext').textContent='⏭';
}
function ensure(){
  var m=$('m_g_rel');if(!m)return;
  var grid=m.querySelector('.grid');if(!grid)return;
  if(!$('go_mq')){var b=document.createElement('button');b.className='tile';b.id='go_mq';grid.appendChild(b);}
  $('go_mq').textContent=L('القرآن الكريم','Holy Quran','Le Saint Coran');
  $('go_mq').onclick=function(){show('t_mq');refresh();draw();info();};
  if(!$('t_mq')){
    var p=document.createElement('div');p.id='t_mq';p.className='panel';
    p.innerHTML='<button class="back" id="bt_mq"></button><h2 id="mqT"></h2><div class="note" id="mqR"></div>'+
      '<div class="row"><button class="btn g" id="mqPick"></button></div>'+
      '<div class="out" id="mqInfo"></div>'+
      '<div class="row"><button class="btn g" id="mqPrev"></button><button class="btn" id="mqPlay"></button><button class="btn g" id="mqNext"></button></div>'+
      '<div class="row"><button class="btn g" id="mqRep"></button></div>'+
      '<div id="mqL" style="max-height:55vh;overflow-y:auto"></div>';
    document.querySelector('main').appendChild(p);
    $('bt_mq').onclick=function(){show('m_g_rel');};
    $('mqPick').onclick=function(){HAudio.pick();};
    $('mqPlay').onclick=toggle;
    $('mqPrev').onclick=function(){step(-1);};
    $('mqNext').onclick=function(){step(1);};
    $('mqRep').onclick=function(){M.rep=(M.rep+1)%3;info();};
    $('mqL').onclick=function(e){
      var el=e.target.closest?e.target.closest('[data-p]'):null;if(!el)return;
      var n=+el.getAttribute('data-p');if(n)play(n);
    };
  }
  labels();info();
}
var _prevMq=setLang;
setLang=function(l){_prevMq(l);ensure();};
ensure();
})();
(function(){
function addIslamic(){
  var sec=document.querySelectorAll('#m_g_rel, [id^="m_"]');
  var grid=null;
  document.querySelectorAll('.grid').forEach(function(g){
    if(g.querySelector('#go_qb')||g.querySelector('[id="go_pa"]')||g.querySelector('[id="go_dh"]'))grid=g;
  });
  if(!grid)grid=document.querySelector('#m_g_rel .grid');
  if(!grid||document.getElementById('go_mq2'))return;
  var b=document.createElement('button');b.className='tile';b.id='go_mq2';
  b.textContent='القرآن بصوت ماهر';
  b.onclick=function(){show('t_mq');if(window.hMqScan)hMqScan();};
  grid.appendChild(b);
}
setTimeout(addIslamic,300);
var _p=window.setLang;
})();
