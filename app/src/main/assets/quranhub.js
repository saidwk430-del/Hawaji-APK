(function(){
function L(a,e,f){return lang=='ar'?a:lang=='fr'?f:e;}
function $(i){return document.getElementById(i);}
var NAMES=['الفاتحة','البقرة','آل عمران','النساء','المائدة','الأنعام','الأعراف','الأنفال','التوبة','يونس','هود','يوسف','الرعد','إبراهيم','الحجر','النحل','الإسراء','الكهف','مريم','طه','الأنبياء','الحج','المؤمنون','النور','الفرقان','الشعراء','النمل','القصص','العنكبوت','الروم','لقمان','السجدة','الأحزاب','سبإ','فاطر','يس','الصافات','ص','الزمر','غافر','فصلت','الشورى','الزخرف','الدخان','الجاثية','الأحقاف','محمد','الفتح','الحجرات','ق','الذاريات','الطور','النجم','القمر','الرحمن','الواقعة','الحديد','المجادلة','الحشر','الممتحنة','الصف','الجمعة','المنافقون','التغابن','الطلاق','التحريم','الملك','القلم','الحاقة','المعارج','نوح','الجن','المزمل','المدثر','القيامة','الإنسان','المرسلات','النبأ','النازعات','عبس','التكوير','الانفطار','المطففين','الانشقاق','البروج','الطارق','الأعلى','الغاشية','الفجر','البلد','الشمس','الليل','الضحى','الشرح','التين','العلق','القدر','البينة','الزلزلة','العاديات','القارعة','التكاثر','العصر','الهمزة','الفيل','قريش','الماعون','الكوثر','الكافرون','النصر','المسد','الإخلاص','الفلق','الناس'];
var R={cur:-1,playing:false,rep:0,avail:{},tab:'pdf',pdfN:0,pdfT:0,busy:false};
var HTML='<button class="back" id="qh_back"></button><h2 id="qh_title"></h2><div class="note" id="qh_reader"></div>'+
'<div class="row" id="qh_tabs"><button class="btn" id="qh_tp"></button><button class="btn g" id="qh_ta"></button></div>'+
'<div id="qh_pdf"><div class="note" id="qh_msg"></div><div class="row"><button class="btn g" id="qh_pick"></button></div>'+
'<img id="qh_img" style="width:100%;background:#fff;border-radius:8px;transition:opacity .2s">'+
'<div class="row"><button class="btn g" id="qh_prev"></button><button class="btn" id="qh_next"></button></div>'+
'<div class="big" id="qh_num"></div></div>'+
'<div id="qh_list_wrap" style="display:none"><div class="note" id="qh_note"></div><div id="qh_list" style="max-height:60vh;overflow-y:auto"></div></div>'+
'<div id="qh_player" style="display:none"><button class="back" id="qh_plBack"></button><div class="out" id="qh_name"></div>'+
'<input type="range" id="qh_seek" min="0" max="1000" value="0" style="width:100%;margin:12px 0">'+
'<div class="row"><span class="note" id="qh_t1">00:00</span><span class="note" id="qh_t2">00:00</span></div>'+
'<div class="row"><button class="btn g" id="qh_rep"></button></div>'+
'<div class="row"><button class="btn g" id="qh_prevS"></button><button class="btn" id="qh_play"></button><button class="btn g" id="qh_nextS"></button></div></div>';

function tf(ms){ms=ms>0?ms:0;var s=Math.floor(ms/1000);return ('0'+Math.floor(s/60)).slice(-2)+':'+('0'+(s%60)).slice(-2);}
function show2(id,v){var e=$(id);if(e)e.style.display=v;}

function labels(){
  $('qh_title').textContent=L('القرآن الكريم','Holy Quran','Le Saint Coran');
  $('qh_reader').textContent=L('القارئ: ماهر المعيقلي','Reciter: Maher Al-Muaiqly','Récitant : Maher Al-Muaiqly');
  $('qh_back').textContent=L('← رجوع','← Back','← Retour');
  $('qh_tp').textContent=L('المصحف','Mushaf','Mushaf');
  $('qh_ta').textContent=L('السور','Surahs','Sourates');
  $('qh_pick').textContent=L('اختيار ملف المصحف','Choose Quran file','Choisir le fichier');
  $('qh_prev').textContent=L('◀ السابق','◀ Previous','◀ Précédent');
  $('qh_next').textContent=L('التالي ▶','Next ▶','Suivant ▶');
  $('qh_plBack').textContent=L('← السور','← Surahs','← Sourates');
  $('qh_prevS').textContent='⏮';$('qh_nextS').textContent='⏭';
}

function showView(v){
  show2('qh_tabs',v=='player'?'none':'flex');
  show2('qh_pdf',v=='pdf'?'block':'none');
  show2('qh_list_wrap',v=='list'?'block':'none');
  show2('qh_player',v=='player'?'block':'none');
  $('qh_tp').className=v=='pdf'?'btn':'btn g';
  $('qh_ta').className=v=='list'?'btn':'btn g';
}
function openTab(t){
  R.tab=t;
  if(t=='pdf'){showView('pdf');HPdf.init(parseInt(localStorage.getItem('hq_last')||'0',10));}
  else{showView('list');renderList();}
}

/* المصحف (PDF) */
window.hQuranPage=function(n,total,data){
  R.pdfN=n;R.pdfT=total;R.busy=false;
  var im=$('qh_img');if(im){im.src=data;im.style.opacity=1;}
  if($('qh_msg'))$('qh_msg').textContent='';
  if($('qh_pick'))$('qh_pick').style.display='none';
  if($('qh_num'))$('qh_num').textContent=(n+1)+' / '+total;
  localStorage.setItem('hq_last',String(n));
};
window.hQuranNone=function(){
  R.busy=false;R.pdfT=0;
  var im=$('qh_img');if(im)im.removeAttribute('src');
  if($('qh_num'))$('qh_num').textContent='';
  if($('qh_msg'))$('qh_msg').textContent=L('اختر ملف almadinah-qadim.pdf من التنزيلات','Select almadinah-qadim.pdf from Downloads','Sélectionnez almadinah-qadim.pdf dans Téléchargements');
  if($('qh_pick'))$('qh_pick').style.display='inline-block';
};
function goPage(n){
  if(R.busy||!R.pdfT||n<0||n>=R.pdfT)return;
  R.busy=true;$('qh_img').style.opacity=.4;HPdf.page(n);
}

/* السور */
function refresh(){
  try{var a=JSON.parse(HAudio.list()||'[]');R.avail={};a.forEach(function(k){R.avail[k]=true;});}
  catch(e){R.avail={};}
}
function renderList(){
  refresh();
  var h='',i,c=0;
  for(i=1;i<=114;i++){
    var ok=!!R.avail[i];if(ok)c++;
    h+='<div class="item" data-n="'+i+'" style="cursor:'+(ok?'pointer':'default')+';'+(i==R.cur?'color:#ffe27a;font-weight:700;':'')+(ok?'':'opacity:.35')+'"><span>'+i+'. '+NAMES[i-1]+'</span></div>';
  }
  $('qh_list').innerHTML=h;
  $('qh_note').textContent=c?L('السور المتوفرة: ','Available: ','Disponibles : ')+c+' / 114':
    L('لا توجد سور. اضغط الزر مرة أخرى أو امنح إذن الوصول للصوت','No surahs found. Tap again or grant audio access','Aucune sourate. Accordez l\'accès audio'); 
}
function nextAvail(from,dir){
  var i=from;
  for(var k=0;k<114;k++){
    i+=dir;
    if(i>114){if(R.rep==2)i=1;else return -1;}
    if(i<1){if(R.rep==2)i=114;else return -1;}
    if(R.avail[i])return i;
  }
  return -1;
}
function updPlayer(){
  if(R.cur<0)return;
  $('qh_name').textContent=L('سورة ','Surah ','Sourate ')+NAMES[R.cur-1]+' ('+R.cur+')';
  $('qh_play').textContent=R.playing?'⏸':'▶';
  $('qh_rep').textContent=[L('تكرار: إيقاف','Repeat: off','Répéter : non'),L('تكرار: سورة','Repeat: surah','Répéter : sourate'),L('تكرار: الكل','Repeat: all','Répéter : tout')][R.rep];
}
function openPlayer(n){
  if(!R.avail[n])return;
  if(!HAudio.play(n)){
    $('qh_note').textContent=L('تعذّر تشغيل هذه السورة','Could not play this surah','Lecture impossible');
    showView('list');return;
  }
  R.cur=n;R.playing=true;showView('player');updPlayer();
}
function step(dir){var t=nextAvail(R.cur,dir);if(t>0)openPlayer(t);}
window.hMqEnd=function(n){
  if(R.rep==1){openPlayer(n);return;}
  var t=nextAvail(n,1);
  if(t>0)openPlayer(t);
  else{R.playing=false;updPlayer();}
};
function tick(){
  if(R.cur<0)return;
  var d=HAudio.dur(),p=HAudio.pos();
  if(d>0){
    var s=$('qh_seek');
    if(s&&document.activeElement!==s)s.value=Math.round(p/d*1000);
    $('qh_t1').textContent=tf(p);$('qh_t2').textContent=tf(d);
  }
}

function bind(){
  $('qh_back').onclick=function(){if(typeof show==='function')show('m_g_rel');};
  $('qh_tp').onclick=function(){openTab('pdf');};
  $('qh_ta').onclick=function(){openTab('list');};
  $('qh_pick').onclick=function(){HPdf.pick();};
  $('qh_next').onclick=function(){goPage(R.pdfN+1);};
  $('qh_prev').onclick=function(){goPage(R.pdfN-1);};
  $('qh_list').onclick=function(e){
    var el=e.target.closest?e.target.closest('[data-n]'):null;if(!el)return;
    var n=+el.getAttribute('data-n');if(R.avail[n])openPlayer(n);
  };
  $('qh_plBack').onclick=function(){openTab('list');};
  $('qh_play').onclick=function(){
    if(R.cur<0)return;
    if(R.playing){HAudio.pause();R.playing=false;}else{HAudio.resume();R.playing=true;}
    updPlayer();
  };
  $('qh_nextS').onclick=function(){step(1);};
  $('qh_prevS').onclick=function(){step(-1);};
  $('qh_rep').onclick=function(){R.rep=(R.rep+1)%3;updPlayer();};
  $('qh_seek').oninput=function(){var d=HAudio.dur();if(d>0)HAudio.seek(Math.round(+this.value/1000*d));};
  setInterval(tick,500);
}

function build(){
  ['go_mq','go_quran'].forEach(function(id){var e=$(id);if(e)e.style.display='none';});
  var m=$('m_g_rel'),grid=m?m.querySelector('.grid'):null;
  if(grid&&!$('go_qhub')){
    var b=document.createElement('button');b.className='tile';b.id='go_qhub';
    grid.insertBefore(b,grid.firstChild);
  }
  if($('go_qhub')){
    $('go_qhub').textContent=L('القرآن الكريم','Holy Quran','Le Saint Coran');
    $('go_qhub').onclick=function(){openHub();};
  }
  if(!$('t_qhub')){
    var p=document.createElement('div');p.id='t_qhub';p.className='panel';p.innerHTML=HTML;
    document.querySelector('main').appendChild(p);
    bind();
  }
  labels();
}

function openHub(){
  var t=$('t_qhub');
  if(t&&t.classList.contains('on')&&R.cur>=0)return;
  document.querySelectorAll('#ov,.ov').forEach(function(e){if(e.parentNode)e.parentNode.removeChild(e);});
  build();
  if(typeof show==='function')show('t_qhub');
  window.scrollTo(0,0);
  if(window.HAudio&&HAudio.ask)HAudio.ask();
  if(R.cur>=0&&R.playing){showView('player');updPlayer();}
  else openTab(R.tab);
}

/* اعتراض النقر على أي زر باسم "القرآن الكريم" من أي قائمة */
var NAMES3=['القرآن الكريم','Holy Quran','Le Saint Coran'];
document.addEventListener('click',function(e){
  var t=e.target;
  for(var i=0;i<5&&t&&t.nodeType===1&&t!==document.body;i++){
    var tx=(t.textContent||'').trim();
    if(NAMES3.indexOf(tx)>=0){
      e.preventDefault();e.stopPropagation();openHub();return;
    }
    t=t.parentNode;
  }
},true);

var _qh=setLang;
setLang=function(l){_qh(l);build();};
build();
})();
