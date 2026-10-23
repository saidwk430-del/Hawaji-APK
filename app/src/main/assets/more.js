(function(){
var MAIN=document.querySelector('main');
var RD={};
var WD={ar:['كتاب','مدرسة','قلم','بيت','شمس','قمر','نهر','جبل'],en:['apple','house','river','tiger','pencil','ocean'],fr:['maison','livre','soleil','chat','fleur','arbre']};
var WG={w:'',g:[],m:0};
var DHIKR=['سبحان الله','الحمد لله','الله أكبر','لا إله إلا الله','أستغفر الله','اللهم صلِّ على محمد'];
var TT={b:['','','','','','','','',''],t:'X',over:false};
var PM={id:null,left:1500,work:true,n:0};
var CK={id:null,left:0};
var FC={i:0,s:false};

function L(a,e,f){return lang=='ar'?a:lang=='fr'?f:e;}
function BK(){return L('← رجوع','← Back','← Retour');}
function $(i){return document.getElementById(i);}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function gn(k,d){var v=localStorage.getItem(k);return v===null?d:parseFloat(v);}
function gj(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v==null?d:v;}catch(e){return d;}}
function sj(k,v){localStorage.setItem(k,JSON.stringify(v));}
function today(){var d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();}
function mon(){var d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1);}
function num(id){return parseFloat($(id).value);}
function gv(id){var v=parseFloat($(id).value);return isNaN(v)?0:v;}
function out(id,s){var e=$(id);if(e)e.textContent=s;}
function bad(){return L('أدخل أرقاماً صحيحة','Enter valid numbers','Entrez des nombres valides');}
function SAVE(){return L('حفظ','Save','Enregistrer');}
function GO(){return L('احسب','Calculate','Calculer');}
function ADD(){return L('إضافة','Add','Ajouter');}
function RESET(){return L('إعادة','Reset','Réinitialiser');}
function START(){return L('ابدأ','Start','Démarrer');}
function STOP(){return L('إيقاف','Stop','Arrêter');}
function DEL(){return L('حذف','Delete','Supprimer');}
function fmt(s){return ('0'+Math.floor(s/60)).slice(-2)+':'+('0'+(s%60)).slice(-2);}

window.del=function(key,i){var l=gj(key,[]);l.splice(i,1);sj(key,l);if(RD[key])RD[key]();};
window.tog=function(key,i){var l=gj(key,[]);l[i].d=!l[i].d;sj(key,l);if(RD[key])RD[key]();};

/* ---------- الدين والعبادات ---------- */
function dhKey(){return 'dh_'+$('dhS').value+'_'+today();}
function dhShow(){out('dhN',gn(dhKey(),0));}
function dhHtml(){var o='';DHIKR.forEach(function(d,i){o+='<option value="'+i+'">'+d+'</option>';});
  return '<select id="dhS">'+o+'</select><div class="big" id="dhN">0</div><div class="row"><button class="btn" id="dhP">+1</button><button class="btn g" id="dhR">'+RESET()+'</button></div>';}
function dhInit(){$('dhP').onclick=function(){var k=dhKey();localStorage.setItem(k,gn(k,0)+1);dhShow();};
  $('dhR').onclick=function(){localStorage.setItem(dhKey(),0);dhShow();};
  $('dhS').onchange=dhShow;dhShow();}

function PNM(){return [L('الفجر','Fajr','Fajr'),L('الظهر','Dhuhr','Dhuhr'),L('العصر','Asr','Asr'),L('المغرب','Maghrib','Maghreb'),L('العشاء','Isha','Isha')];}
function ptHtml(){var h='';PNM().forEach(function(n,i){h+='<label>'+n+'</label><input type="time" id="pt'+i+'">';});
  return h+'<button class="btn" id="ptG">'+SAVE()+'</button><div class="out" id="ptO" style="white-space:pre-line"></div><div class="note">'+L('أدخل المواقيت من مسجدك أو تطبيق موثوق لمدينتك','Enter times from your mosque or a trusted app for your city','Saisissez les horaires de votre mosquée ou d\'une appli fiable')+'</div>';}
function ptShow(){if(!$('ptO'))return;var now=new Date(),nm=now.getHours()*60+now.getMinutes(),names=PNM(),best=null,i;
  for(i=0;i<5;i++){var v=gj('pt_'+i,'');if(!v)continue;var p=v.split(':'),m=(+p[0])*60+(+p[1]);if(m>nm&&(best===null||m<best.m))best={i:i,m:m,v:v};}
  if(best===null){for(i=0;i<5;i++){var w=gj('pt_'+i,'');if(!w)continue;var q=w.split(':'),mm=(+q[0])*60+(+q[1]);if(best===null||mm<best.m)best={i:i,m:mm,v:w};}}
  if(best===null){out('ptO',L('لم تُدخل المواقيت بعد','No times entered yet','Aucun horaire saisi'));return;}
  var diff=best.m-nm;if(diff<0)diff+=1440;
  out('ptO',L('الصلاة القادمة: ','Next prayer: ','Prochaine prière : ')+names[best.i]+' ('+best.v+')\n'+L('بعد ','In ','Dans ')+Math.floor(diff/60)+'h '+(diff%60)+'m');}
function ptInit(){PNM().forEach(function(n,i){$('pt'+i).value=gj('pt_'+i,'')||'';});
  $('ptG').onclick=function(){PNM().forEach(function(n,i){sj('pt_'+i,$('pt'+i).value);});ptShow();};ptShow();}
setInterval(ptShow,30000);

function zkHtml(){var f=function(id,ph){return '<input id="'+id+'" inputmode="decimal" placeholder="'+ph+'">';};
  return f('zkC',L('النقود (المال)','Cash','Argent liquide'))+f('zkG',L('الذهب (غرام)','Gold (grams)','Or (grammes)'))+f('zkGP',L('سعر غرام الذهب','Gold price per gram','Prix du gramme d\'or'))+f('zkS',L('الفضة (غرام)','Silver (grams)','Argent (grammes)'))+f('zkSP',L('سعر غرام الفضة','Silver price per gram','Prix du gramme d\'argent'))+f('zkD',L('الديون عليك','Debts owed','Dettes'))+
  '<button class="btn" id="zkB">'+GO()+'</button><div class="out" id="zkO" style="white-space:pre-line"></div><div class="note">'+L('الحساب تقريبي على أساس نصاب الذهب (85غ)، ويُراجع مع عالم موثوق','Approximate, based on gold nisab (85g); check with a trusted scholar','Calcul indicatif, base nisab or (85 g) ; consultez un savant')+'</div>';}
function zkInit(){$('zkB').onclick=function(){var c=gv('zkC'),g=gv('zkG'),gp=gv('zkGP'),s=gv('zkS'),sp=gv('zkSP'),d=gv('zkD');
  var net=c+g*gp+s*sp-d,nis=85*gp,due=(gp>0&&net>=nis)?net*0.025:0;
  out('zkO',L('الصافي: ','Net: ','Net : ')+net.toFixed(2)+'\n'+L('نصاب الذهب: ','Gold nisab: ','Nisab or : ')+nis.toFixed(2)+'\n'+L('الزكاة المستحقة (2.5%): ','Zakat due (2.5%): ','Zakat due (2,5 %) : ')+due.toFixed(2));};}

function qpShow(){var p=gn('qp_page',1),d=gn('qp_pd',10),rem=604-p;
  out('qpO',L('نسبة الختمة: ','Progress: ','Progression : ')+((p/604)*100).toFixed(1)+'%\n'+L('متبقي: ','Remaining: ','Restant : ')+rem+' '+L('صفحة','pages','pages')+'\n'+L('الأيام المتبقية: ','Days left: ','Jours restants : ')+Math.ceil(rem/d));}
function qpHtml(){return '<label>'+L('الصفحة الحالية (من 604)','Current page (of 604)','Page actuelle (sur 604)')+'</label><input id="qpI" inputmode="numeric" value="'+gn('qp_page',1)+'"><label>'+L('صفحات يومياً','Pages per day','Pages par jour')+'</label><input id="qpD" inputmode="numeric" value="'+gn('qp_pd',10)+'"><button class="btn" id="qpG">'+SAVE()+'</button><div class="out" id="qpO" style="white-space:pre-line"></div>';}
function qpInit(){$('qpG').onclick=function(){var p=parseInt($('qpI').value,10),d=parseInt($('qpD').value,10);
  if(!(p>=1&&p<=604&&d>0)){out('qpO',bad());return;}localStorage.setItem('qp_page',p);localStorage.setItem('qp_pd',d);qpShow();};qpShow();}

/* ---------- المال ---------- */
function lgDraw(){var l=gj('mo_led',[]),inc=0,exp=0,h='';
  l.forEach(function(x){if(x.m!==mon())return;if(x.t=='i')inc+=x.a;else exp+=x.a;});
  out('lgS',L('دخل الشهر: ','Income this month: ','Revenus du mois : ')+inc+'\n'+L('مصروف الشهر: ','Expenses this month: ','Dépenses du mois : ')+exp+'\n'+L('الرصيد: ','Balance: ','Solde : ')+(inc-exp));
  l.map(function(x,i){return {x:x,i:i};}).reverse().slice(0,30).forEach(function(o){
    h+='<div class="item"><span>'+(o.x.t=='i'?'+':'-')+o.x.a+' '+esc(o.x.n)+' ('+o.x.d+')</span><button class="btn g" onclick="window.del(\'mo_led\','+o.i+')">'+DEL()+'</button></div>';});
  $('lgL').innerHTML=h;}
function lgHtml(){return '<select id="lgT"><option value="i">'+L('دخل','Income','Revenu')+'</option><option value="e">'+L('مصروف','Expense','Dépense')+'</option></select><input id="lgA" inputmode="decimal" placeholder="'+L('المبلغ','Amount','Montant')+'"><input id="lgN" placeholder="'+L('ملاحظة','Note','Note')+'"><button class="btn" id="lgG">'+ADD()+'</button><div class="out" id="lgS" style="white-space:pre-line"></div><div id="lgL"></div>';}
function lgInit(){RD.mo_led=lgDraw;$('lgG').onclick=function(){var a=num('lgA');if(!(a>0))return;var l=gj('mo_led',[]);
  l.push({t:$('lgT').value,a:a,n:$('lgN').value.trim(),m:mon(),d:today()});sj('mo_led',l);$('lgA').value='';$('lgN').value='';lgDraw();};lgDraw();}

function bdHtml(){return '<input id="bdI" inputmode="decimal" placeholder="'+L('الدخل الشهري','Monthly income','Revenu mensuel')+'"><button class="btn" id="bdG">'+GO()+'</button><div class="out" id="bdO" style="white-space:pre-line"></div>';}
function bdInit(){$('bdG').onclick=function(){var v=num('bdI');if(!(v>0)){out('bdO',bad());return;}
  out('bdO',L('الضروريات 50%: ','Needs 50%: ','Besoins 50 % : ')+(v*.5).toFixed(2)+'\n'+L('الرغبات 30%: ','Wants 30%: ','Envies 30 % : ')+(v*.3).toFixed(2)+'\n'+L('الادخار 20%: ','Savings 20%: ','Épargne 20 % : ')+(v*.2).toFixed(2));};}

function lnHtml(){return '<input id="lnP" inputmode="decimal" placeholder="'+L('المبلغ','Amount','Montant')+'"><input id="lnR" inputmode="decimal" placeholder="'+L('النسبة السنوية %','Annual rate %','Taux annuel %')+'"><input id="lnN" inputmode="numeric" placeholder="'+L('عدد الأشهر','Months','Mois')+'"><button class="btn" id="lnG">'+GO()+'</button><div class="out" id="lnO" style="white-space:pre-line"></div>';}
function lnInit(){$('lnG').onclick=function(){var P=num('lnP'),r=num('lnR')/1200,n=num('lnN');
  if(!(P>0&&n>0)||isNaN(r)){out('lnO',bad());return;}
  var m=r===0?P/n:P*r/(1-Math.pow(1+r,-n));
  out('lnO',L('القسط الشهري: ','Monthly payment: ','Mensualité : ')+m.toFixed(2)+'\n'+L('إجمالي المدفوع: ','Total paid: ','Total payé : ')+(m*n).toFixed(2)+'\n'+L('الفوائد: ','Interest: ','Intérêts : ')+(m*n-P).toFixed(2));};}

function txHtml(){return '<input id="txP" inputmode="decimal" placeholder="'+L('السعر','Price','Prix')+'"><input id="txD" inputmode="decimal" placeholder="'+L('الخصم %','Discount %','Remise %')+'"><input id="txT" inputmode="decimal" placeholder="'+L('الضريبة %','Tax %','Taxe %')+'"><button class="btn" id="txG">'+GO()+'</button><div class="out" id="txO" style="white-space:pre-line"></div>';}
function txInit(){$('txG').onclick=function(){var p=num('txP'),d=gv('txD'),x=gv('txT');if(!(p>=0)){out('txO',bad());return;}
  var af=p*(1-d/100),fin=af*(1+x/100);
  out('txO',L('قيمة الخصم: ','Discount: ','Remise : ')+(p-af).toFixed(2)+'\n'+L('الضريبة: ','Tax: ','Taxe : ')+(fin-af).toFixed(2)+'\n'+L('الإجمالي: ','Final total: ','Total final : ')+fin.toFixed(2));};}

function dbDraw(){var l=gj('db_list',[]),i1=0,o1=0,h='';
  l.forEach(function(x){if(x.t=='in')i1+=x.a;else o1+=x.a;});
  out('dbS',L('لي عند الناس: ','Owed to me: ','On me doit : ')+i1+'\n'+L('علي للناس: ','I owe: ','Je dois : ')+o1+'\n'+L('الصافي: ','Net: ','Net : ')+(i1-o1));
  l.forEach(function(x,i){h+='<div class="item"><span>'+(x.t=='in'?'↓':'↑')+' '+esc(x.n)+': '+x.a+'</span><button class="btn g" onclick="window.del(\'db_list\','+i+')">'+DEL()+'</button></div>';});
  $('dbL').innerHTML=h;}
function dbHtml(){return '<select id="dbT"><option value="in">'+L('له عندي','Owed to me','On me doit')+'</option><option value="out">'+L('عليّ له','I owe','Je dois')+'</option></select><input id="dbN" placeholder="'+L('الاسم','Name','Nom')+'"><input id="dbA" inputmode="decimal" placeholder="'+L('المبلغ','Amount','Montant')+'"><button class="btn" id="dbG">'+ADD()+'</button><div class="out" id="dbS" style="white-space:pre-line"></div><div id="dbL"></div>';}
function dbInit(){RD.db_list=dbDraw;$('dbG').onclick=function(){var a=num('dbA'),n=$('dbN').value.trim();if(!n||!(a>0))return;
  var l=gj('db_list',[]);l.push({t:$('dbT').value,n:n,a:a});sj('db_list',l);$('dbN').value='';$('dbA').value='';dbDraw();};dbDraw();}

/* ---------- الدراسة والعمل ---------- */
function pmDraw(){out('pmD',fmt(PM.left));out('pmL',PM.work?L('تركيز','Focus','Concentration'):L('راحة','Break','Pause'));
  out('pmC',L('جلسات مكتملة: ','Completed sessions: ','Sessions terminées : ')+PM.n);}
function pmTick(){PM.left--;if(PM.left<=0){if(PM.work)PM.n++;PM.work=!PM.work;PM.left=(PM.work?25:5)*60;if(navigator.vibrate)navigator.vibrate([300,150,300]);}pmDraw();}
function pmHtml(){return '<div class="note" id="pmL"></div><div class="big" id="pmD">25:00</div><div class="row"><button class="btn" id="pmB">'+START()+'</button><button class="btn g" id="pmR">'+RESET()+'</button></div><div class="note" id="pmC"></div>';}
function pmInit(){$('pmB').onclick=function(){if(PM.id){clearInterval(PM.id);PM.id=null;this.textContent=START();}else{PM.id=setInterval(pmTick,1000);this.textContent=STOP();}};
  $('pmR').onclick=function(){clearInterval(PM.id);PM.id=null;PM.work=true;PM.left=1500;$('pmB').textContent=START();pmDraw();};pmDraw();}

function gpRow(){return '<div class="row gpr"><select class="gg"><option value="4">A</option><option value="3">B</option><option value="2">C</option><option value="1">D</option><option value="0">F</option></select><input class="gc" inputmode="decimal" placeholder="'+L('الساعات','Credits','Crédits')+'"></div>';}
function gpHtml(){return '<div id="gpR">'+gpRow()+gpRow()+'</div><button class="btn g" id="gpA">+ '+ADD()+'</button><button class="btn" id="gpG">'+GO()+'</button><div class="out" id="gpO"></div>';}
function gpInit(){$('gpA').onclick=function(){$('gpR').insertAdjacentHTML('beforeend',gpRow());};
  $('gpG').onclick=function(){var pts=0,cr=0;document.querySelectorAll('.gpr').forEach(function(r){var c=parseFloat(r.querySelector('.gc').value),g=parseFloat(r.querySelector('.gg').value);if(c>0){pts+=g*c;cr+=c;}});
  if(!cr){out('gpO',bad());return;}out('gpO',L('المعدل: ','GPA: ','Moyenne : ')+(pts/cr).toFixed(2)+' / 4');};}

function ntDraw(){var h='';gj('nt_list',[]).forEach(function(x,i){h+='<div class="item"><span>'+esc(x.t).replace(/\n/g,'<br>')+'<br><small>'+x.d+'</small></span><button class="btn g" onclick="window.del(\'nt_list\','+i+')">'+DEL()+'</button></div>';});$('ntL').innerHTML=h;}
function ntHtml(){return '<textarea id="ntT" placeholder="'+L('اكتب ملاحظة...','Write a note...','Écrivez une note...')+'"></textarea><button class="btn" id="ntG">'+SAVE()+'</button><div id="ntL"></div>';}
function ntInit(){RD.nt_list=ntDraw;$('ntG').onclick=function(){var v=$('ntT').value.trim();if(!v)return;var l=gj('nt_list',[]);l.push({t:v,d:today()});sj('nt_list',l);$('ntT').value='';ntDraw();};ntDraw();}

function cdDraw(){var e=gj('cd_ev',null);if(!e){out('cdO','');out('cdE','');return;}
  var p=e.d.split('-');var target=new Date(+p[0],+p[1]-1,+p[2]),now=new Date();now.setHours(0,0,0,0);
  var days=Math.round((target-now)/86400000);
  out('cdO',days>0?days:0);out('cdE',e.n+' · '+(days>0?L('يوم متبقٍ','days left','jours restants'):days==0?L('اليوم!','Today!','Aujourd\'hui !'):L('انتهى','Passed','Passé')));}
function cdHtml(){return '<input id="cdN" placeholder="'+L('اسم الحدث','Event name','Nom de l\'événement')+'"><input id="cdD" type="date"><button class="btn" id="cdG">'+SAVE()+'</button><div class="big" id="cdO"></div><div class="note" id="cdE"></div>';}
function cdInit(){$('cdG').onclick=function(){var n=$('cdN').value.trim(),d=$('cdD').value;if(!d)return;sj('cd_ev',{n:n,d:d});cdDraw();};cdDraw();}

function shDraw(){var h='';gj('sh_list',[]).forEach(function(x,i){h+='<div class="item'+(x.d?' done':'')+'"><input type="checkbox" style="width:auto" '+(x.d?'checked':'')+' onchange="window.tog(\'sh_list\','+i+')"><span>'+esc(x.t)+'</span><button class="btn g" onclick="window.del(\'sh_list\','+i+')">'+DEL()+'</button></div>';});$('shL').innerHTML=h;}
function shHtml(){return '<div class="row"><input id="shI" placeholder="'+L('أضف منتجاً...','Add item...','Ajouter un article...')+'"><button class="btn" id="shG">'+ADD()+'</button></div><div id="shL"></div>';}
function shInit(){RD.sh_list=shDraw;$('shG').onclick=function(){var v=$('shI').value.trim();if(!v)return;var l=gj('sh_list',[]);l.push({t:v,d:false});sj('sh_list',l);$('shI').value='';shDraw();};shDraw();}

function fcDraw(){var l=gj('fc_cards',[]);
  if(!l.length){out('fcC',L('أضف بطاقة','Add a card','Ajoutez une carte'));out('fcT','');return;}
  if(FC.i>=l.length)FC.i=0;
  out('fcC',FC.s?l[FC.i].b:l[FC.i].f);out('fcT',(FC.i+1)+'/'+l.length+' · '+L('اضغط البطاقة لتقلبها','Tap the card to flip','Touchez la carte pour la retourner'));}
function fcHtml(){return '<input id="fcF" placeholder="'+L('الوجه الأمامي','Front','Recto')+'"><input id="fcB" placeholder="'+L('الوجه الخلفي','Back','Verso')+'"><button class="btn" id="fcA">'+ADD()+'</button><div id="fcC" class="out" style="min-height:120px;cursor:pointer"></div><div class="row"><button class="btn g" id="fcP">←</button><button class="btn" id="fcN">→</button></div><div class="note" id="fcT"></div>';}
function fcInit(){$('fcA').onclick=function(){var f=$('fcF').value.trim(),b=$('fcB').value.trim();if(!f||!b)return;var l=gj('fc_cards',[]);l.push({f:f,b:b});sj('fc_cards',l);$('fcF').value='';$('fcB').value='';fcDraw();};
  $('fcC').onclick=function(){FC.s=!FC.s;fcDraw();};
  $('fcN').onclick=function(){var n=gj('fc_cards',[]).length;if(n){FC.i=(FC.i+1)%n;FC.s=false;fcDraw();}};
  $('fcP').onclick=function(){var n=gj('fc_cards',[]).length;if(n){FC.i=(FC.i-1+n)%n;FC.s=false;fcDraw();}};fcDraw();}

/* ---------- الحياة اليومية ---------- */
function pwHtml(){return '<label>'+L('الطول','Length','Longueur')+'</label><input id="pwL" inputmode="numeric" value="16"><label><input type="checkbox" id="pwU" checked style="width:auto"> A-Z</label><label><input type="checkbox" id="pwLo" checked style="width:auto"> a-z</label><label><input type="checkbox" id="pwD" checked style="width:auto"> 0-9</label><label><input type="checkbox" id="pwS" checked style="width:auto"> !@#</label><button class="btn" id="pwG">'+L('توليد','Generate','Générer')+'</button><div class="out" id="pwO" style="font-family:monospace;word-break:break-all"></div>';}
function pwInit(){$('pwG').onclick=function(){var n=parseInt($('pwL').value,10),set='';
  if($('pwU').checked)set+='ABCDEFGHJKLMNPQRSTUVWXYZ';if($('pwLo').checked)set+='abcdefghijkmnopqrstuvwxyz';
  if($('pwD').checked)set+='23456789';if($('pwS').checked)set+='!@#$%&*?';
  if(!(n>=4)||!set){out('pwO',bad());return;}
  var r=new Uint32Array(n);crypto.getRandomValues(r);var p='';for(var i=0;i<n;i++)p+=set[r[i]%set.length];out('pwO',p);};}

function ckShow(){out('ckD',fmt(CK.left));}
function ckHtml(){return '<label>'+L('الدقائق','Minutes','Minutes')+'</label><input id="ckM" inputmode="numeric" value="10"><div class="big" id="ckD">00:00</div><div class="row"><button class="btn" id="ckB">'+START()+'</button><button class="btn g" id="ckR">'+RESET()+'</button></div>';}
function ckInit(){$('ckB').onclick=function(){var btn=this;
  if(CK.id){clearInterval(CK.id);CK.id=null;btn.textContent=START();return;}
  if(!CK.left)CK.left=Math.round(gv('ckM')*60);if(!(CK.left>0))return;
  btn.textContent=STOP();ckShow();
  CK.id=setInterval(function(){CK.left--;ckShow();if(CK.left<=0){clearInterval(CK.id);CK.id=null;var b=$('ckB');if(b)b.textContent=START();
    if(navigator.vibrate)navigator.vibrate([400,200,400]);alert(L('انتهى الوقت!','Time is up!','Temps écoulé !'));}},1000);};
  $('ckR').onclick=function(){clearInterval(CK.id);CK.id=null;CK.left=0;$('ckB').textContent=START();out('ckD','00:00');};}

function idHtml(){return '<select id="idS"><option value="m">'+L('ذكر','Male','Homme')+'</option><option value="f">'+L('أنثى','Female','Femme')+'</option></select><input id="idH" inputmode="decimal" placeholder="'+L('الطول (سم)','Height (cm)','Taille (cm)')+'"><button class="btn" id="idG">'+GO()+'</button><div class="out" id="idO" style="white-space:pre-line"></div>';}
function idInit(){$('idG').onclick=function(){var cm=num('idH');if(!(cm>0)){out('idO',bad());return;}
  var h=cm/100,inch=cm/2.54,ideal=$('idS').value=='m'?50+2.3*(inch-60):45.5+2.3*(inch-60);
  out('idO',L('الوزن المثالي التقريبي: ','Approx. ideal weight: ','Poids idéal approx. : ')+ideal.toFixed(1)+' kg\n'+L('النطاق الصحي (BMI 18.5-24.9): ','Healthy range (BMI 18.5-24.9): ','Plage saine (IMC 18,5-24,9) : ')+(18.5*h*h).toFixed(1)+' - '+(24.9*h*h).toFixed(1)+' kg');};}

function scEval(s){
  if(!/^[0-9a-zA-Z+\-*/^().,\s\u03c0]*$/.test(s))return null;
  var e=s.replace(/\u03c0/g,'pi').replace(/\^/g,'**')
    .replace(/\blog\(/g,'Math.log10(').replace(/\bln\(/g,'Math.log(')
    .replace(/\b(sin|cos|tan|asin|acos|atan|sqrt|abs|exp)\(/g,'Math.$1(')
    .replace(/\bpi\b/g,'Math.PI').replace(/\be\b/g,'Math.E');
  try{var r=Function('return ('+e+')')();return isNaN(r)?null:r;}catch(x){return null;}}
function scHtml(){return '<input id="scI" placeholder="sin(pi/2)+sqrt(16)*2^3"><button class="btn" id="scG">'+GO()+'</button><div class="out" id="scO"></div><div class="note">sin cos tan asin acos atan sqrt abs exp log ln pi e ^ ('+L('الزوايا بالراديان','angles in radians','angles en radians')+')</div>';}
function scInit(){$('scG').onclick=function(){var r=scEval($('scI').value);out('scO',r===null?'Error':(Math.round(r*1e10)/1e10));};}

function pwdHint(){return '';}

/* ---------- الترفيه ---------- */
function ttWin(){var W=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for(var k=0;k<W.length;k++){var a=W[k];if(TT.b[a[0]]&&TT.b[a[0]]==TT.b[a[1]]&&TT.b[a[0]]==TT.b[a[2]])return TT.b[a[0]];}return null;}
function ttDraw(){var h='';TT.b.forEach(function(v,i){h+='<button class="tile" style="padding:20px 0;font-size:28px" data-c="'+i+'">'+v+'</button>';});
  $('ttB').innerHTML=h;
  document.querySelectorAll('#ttB [data-c]').forEach(function(b){b.onclick=function(){ttMove(+b.dataset.c);};});
  var w=ttWin();
  out('ttS',w?L('الفائز: ','Winner: ','Gagnant : ')+w:(TT.over?L('تعادل','Draw','Égalité'):L('الدور على ','Turn: ','Tour : ')+TT.t));}
function ttMove(i){if(TT.over||TT.b[i])return;TT.b[i]=TT.t;
  if(ttWin()||TT.b.every(function(x){return x;}))TT.over=true;else TT.t=TT.t=='X'?'O':'X';ttDraw();}
function ttHtml(){return '<div id="ttB" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px"></div><div class="out" id="ttS"></div><button class="btn g" id="ttR">'+RESET()+'</button>';}
function ttInit(){$('ttR').onclick=function(){TT={b:['','','','','','','','',''],t:'X',over:false};ttDraw();};ttDraw();}

function wdNew(){var l=WD[lang]||WD.en;WG.w=l[Math.floor(Math.random()*l.length)];WG.g=[];WG.m=0;}
function wdWon(){for(var i=0;i<WG.w.length;i++)if(WG.g.indexOf(WG.w[i])<0)return false;return true;}
function wdShow(){var s=[];for(var i=0;i<WG.w.length;i++){var c=WG.w[i];s.push(WG.g.indexOf(c)>=0?c:'_');}
  out('wdW',s.join(' '));
  var msg=wdWon()?L('أحسنت!','Well done!','Bravo !'):(WG.m>=6?L('الكلمة: ','Word: ','Mot : ')+WG.w:'');
  out('wdS',L('أخطاء: ','Mistakes: ','Erreurs : ')+WG.m+'/6 '+msg);}
function wdHtml(){return '<div class="big" id="wdW" style="letter-spacing:4px"></div><div class="row"><input id="wdI" maxlength="20" placeholder="'+L('حرف أو كلمة','Letter or word','Lettre ou mot')+'"><button class="btn" id="wdG">'+ADD()+'</button></div><div class="note" id="wdS"></div><button class="btn g" id="wdN">'+L('كلمة جديدة','New word','Nouveau mot')+'</button>';}
function wdInit(){if(!WG.w)wdNew();
  $('wdG').onclick=function(){var v=$('wdI').value.trim().toLowerCase();$('wdI').value='';
    if(!v||WG.m>=6||wdWon())return;
    if(v===WG.w){WG.g=WG.w.split('');}
    else if(v.length==1){if(WG.w.indexOf(v)>=0){if(WG.g.indexOf(v)<0)WG.g.push(v);}else WG.m++;}
    else WG.m++;
    wdShow();};
  $('wdN').onclick=function(){wdNew();wdShow();};wdShow();}

function dcHtml(){return '<div class="big" id="dcD">🎲</div><div class="row"><button class="btn" id="dcR">'+L('رمي النرد','Roll dice','Lancer le dé')+'</button><button class="btn g" id="dcC">'+L('رمي العملة','Flip coin','Lancer la pièce')+'</button></div>';}
function dcInit(){$('dcR').onclick=function(){out('dcD',1+Math.floor(Math.random()*6));};
  $('dcC').onclick=function(){out('dcD',Math.random()<.5?L('وجه','Heads','Face'):L('ظهر','Tails','Pile'));};}

/* ---------- المجموعات ---------- */
var GROUPS=[
{id:'g_rel',name:function(){return L('الدين والعبادات','Religion','Religion');},tools:[
  {id:'dh',name:function(){return L('عداد الأذكار','Dhikr counter','Compteur de dhikr');},html:dhHtml,init:dhInit},
  {id:'pt',name:function(){return L('مواقيت الصلاة (يدوي)','Prayer times (manual)','Horaires (manuel)');},html:ptHtml,init:ptInit},
  {id:'zk',name:function(){return L('حاسبة الزكاة','Zakat calculator','Calcul de zakat');},html:zkHtml,init:zkInit},
  {id:'qp',name:function(){return L('عداد صفحات القرآن','Quran pages','Pages du Coran');},html:qpHtml,init:qpInit}]},
{id:'g_money',name:function(){return L('المال','Money','Finances');},tools:[
  {id:'lg',name:function(){return L('دفتر المصاريف والدخل','Income & expenses','Revenus et dépenses');},html:lgHtml,init:lgInit},
  {id:'bd',name:function(){return L('الميزانية الشهرية','Monthly budget','Budget mensuel');},html:bdHtml,init:bdInit},
  {id:'ln',name:function(){return L('حاسبة القروض والأقساط','Loan calculator','Calcul de prêt');},html:lnHtml,init:lnInit},
  {id:'tx',name:function(){return L('الخصم والضريبة','Discount & tax','Remise et taxe');},html:txHtml,init:txInit},
  {id:'db',name:function(){return L('قائمة الديون','Debts','Dettes');},html:dbHtml,init:dbInit}]},
{id:'g_study',name:function(){return L('الدراسة والعمل','Study & work','Études et travail');},tools:[
  {id:'pm',name:function(){return L('مؤقت بومودورو','Pomodoro timer','Minuteur Pomodoro');},html:pmHtml,init:pmInit},
  {id:'gp',name:function(){return L('حاسبة المعدل','GPA calculator','Calcul de moyenne');},html:gpHtml,init:gpInit},
  {id:'nt',name:function(){return L('ملاحظات سريعة','Quick notes','Notes rapides');},html:ntHtml,init:ntInit},
  {id:'cd',name:function(){return L('عدّ تنازلي لحدث','Event countdown','Compte à rebours');},html:cdHtml,init:cdInit},
  {id:'sh',name:function(){return L('قائمة التسوق','Shopping list','Liste de courses');},html:shHtml,init:shInit},
  {id:'fc',name:function(){return L('البطاقات التعليمية','Flashcards','Cartes mémoire');},html:fcHtml,init:fcInit}]},
{id:'g_daily',name:function(){return L('الحياة اليومية','Daily life','Vie quotidienne');},tools:[
  {id:'pw',name:function(){return L('مولّد كلمات المرور','Password generator','Générateur de mot de passe');},html:pwHtml,init:pwInit},
  {id:'ck',name:function(){return L('مؤقت الطبخ','Cooking timer','Minuteur de cuisine');},html:ckHtml,init:ckInit},
  {id:'sc',name:function(){return L('الآلة الحاسبة العلمية','Scientific calculator','Calculatrice scientifique');},html:scHtml,init:scInit},
  {id:'id',name:function(){return L('الوزن المثالي','Ideal weight','Poids idéal');},html:idHtml,init:idInit}]},
{id:'g_fun',name:function(){return L('الترفيه','Fun','Divertissement');},tools:[
  {id:'tt',name:function(){return L('إكس أو','Tic-tac-toe','Morpion');},html:ttHtml,init:ttInit},
  {id:'wd',name:function(){return L('تخمين الكلمة','Word guess','Devinez le mot');},html:wdHtml,init:wdInit},
  {id:'dc',name:function(){return L('نرد وعملة','Dice & coin','Dé et pièce');},html:dcHtml,init:dcInit}]}
];

function buildAll(){
  GROUPS.forEach(function(g){
    var tile=$('tg_'+g.id);
    if(!tile){tile=document.createElement('button');tile.id='tg_'+g.id;tile.className='tile';$('home').appendChild(tile);
      tile.onclick=function(){show('m_'+g.id);};}
    tile.textContent=g.name();
    var m=$('m_'+g.id);
    if(!m){m=document.createElement('div');m.id='m_'+g.id;m.className='panel';MAIN.appendChild(m);}
    var h='<button class="back" id="bk_'+g.id+'">'+BK()+'</button><h2>'+g.name()+'</h2><div class="grid">';
    g.tools.forEach(function(x){h+='<button class="tile" id="go_'+x.id+'">'+x.name()+'</button>';});
    m.innerHTML=h+'</div>';
    $('bk_'+g.id).onclick=function(){show(null);};
    g.tools.forEach(function(x){
      $('go_'+x.id).onclick=function(){show('t_'+x.id);};
      var p=$('t_'+x.id);
      if(!p){p=document.createElement('div');p.id='t_'+x.id;p.className='panel';MAIN.appendChild(p);}
      p.innerHTML='<button class="back" id="bt_'+x.id+'">'+BK()+'</button><h2>'+x.name()+'</h2>'+x.html();
      $('bt_'+x.id).onclick=function(){show('m_'+g.id);};
      x.init();
    });
  });
}

var _sl=setLang;
setLang=function(l){_sl(l);buildAll();};
buildAll();
})();
