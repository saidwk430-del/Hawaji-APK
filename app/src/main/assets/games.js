(function(){
function L(a,e,f){return lang=='ar'?a:lang=='fr'?f:e;}
function $(i){return document.getElementById(i);}
function out(id,s){var e=$(id);if(e)e.textContent=s;}
function gj(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v==null?d:v;}catch(e){return d;}}
function sj(k,v){localStorage.setItem(k,JSON.stringify(v));}
function BK(){return L('← رجوع','← Back','← Retour');}
function pick(a){return a[Math.floor(Math.random()*a.length)];}
var PROMPTS=[
function(){return L('اذكر 3 أنواع فاكهة حمراء','Name 3 red fruits','Citez 3 fruits rouges');},
function(){return L('اذكر 3 عواصم عربية','Name 3 Arab capitals','Citez 3 capitales arabes');},
function(){return L('اذكر 3 حيوانات برية','Name 3 wild animals','Citez 3 animaux sauvages');},
function(){return L('اذكر 3 دول أوروبية','Name 3 European countries','Citez 3 pays européens');}
];
var G5={id:null,left:5};
var FACTS=[
{ar:'الزرافة لا تصدر أي صوت',en:'Giraffes make no sound at all',fr:'Les girafes ne produisent aucun son',t:false,
 x:{ar:'الزرافة تصدر أصواتاً منخفضة نادراً ما تُسمع',en:'Giraffes make low sounds that are rarely heard',fr:'Les girafes émettent des sons graves rarement entendus'}},
{ar:'العسل الطبيعي يمكن أن يبقى صالحاً لآلاف السنين',en:'Natural honey can stay edible for thousands of years',fr:'Le miel naturel peut se conserver des milliers d\'années',t:true,
 x:{ar:'بفضل قلة الماء فيه وحموضته، لذلك لا تنمو فيه البكتيريا',en:'Low water content and acidity keep bacteria from growing',fr:'Sa faible teneur en eau et son acidité empêchent les bactéries de se développer'}},
{ar:'السمكة الذهبية لها ذاكرة لا تتجاوز ثوانٍ',en:'A goldfish remembers things for only a few seconds',fr:'Un poisson rouge n\'a de mémoire que de quelques secondes',t:false,
 x:{ar:'أثبتت الدراسات أنها تتذكر أشياء لأسابيع أو أكثر',en:'Studies show goldfish remember things for weeks or more',fr:'Des études montrent qu\'il se souvient pendant des semaines'}},
{ar:'البرق لا يضرب المكان نفسه مرتين أبداً',en:'Lightning never strikes the same place twice',fr:'La foudre ne frappe jamais deux fois le même endroit',t:false,
 x:{ar:'البرق قد يضرب المكان المرتفع نفسه مراراً، مثل برج أو مبنى عالٍ',en:'Lightning often strikes the same tall object repeatedly',fr:'La foudre frappe souvent plusieurs fois les mêmes objets élevés'}}
];
var FC={i:-1};
var CHOICES=[
{a:{ar:'تستطيع الطيران',en:'Fly',fr:'Voler'},b:{ar:'تستطيع السباحة تحت الماء بلا قيود، لكن لا تتنفس',en:'Swim underwater forever, but never breathe',fr:'Nager sous l\'eau sans limite, mais ne jamais respirer'}},
{a:{ar:'تعرف كل ما يفكر به الناس',en:'Know what everyone thinks',fr:'Savoir ce que tout le monde pense'},b:{ar:'لا يعرف أحد ما تفكر به',en:'Nobody can ever know what you think',fr:'Personne ne peut savoir ce que vous pensez'}},
{a:{ar:'تعيش مئة سنة بلا تكنولوجيا',en:'Live 100 years without technology',fr:'Vivre 100 ans sans technologie'},b:{ar:'تعيش خمسين سنة مع كل التكنولوجيا',en:'Live 50 years with all technology',fr:'Vivre 50 ans avec toute la technologie'}}
];
var CH={i:-1};
function panel(id,title,body){
var p=$(id);
if(!p){p=document.createElement('div');p.id=id;p.className='panel';document.querySelector('main').appendChild(p);}
p.innerHTML='<button class="back" id="bt_'+id+'">'+BK()+'</button><h2>'+title+'</h2>'+body;
$('bt_'+id).onclick=function(){show('m_games');};
}
function ensure(){
var grid=document.querySelector('#home');if(!grid)return;
var tile=$('tg_games');
if(!tile){tile=document.createElement('button');tile.id='tg_games';tile.className='tile';grid.appendChild(tile);tile.onclick=function(){show('m_games');};}
tile.textContent=L('الألعاب والترفيه','Games & fun','Jeux et divertissement');
var m=$('m_games');
if(!m){m=document.createElement('div');m.id='m_games';m.className='panel';document.querySelector('main').appendChild(m);}
m.innerHTML='<button class="back" id="bk_games">'+BK()+'</button><h2>'+L('الألعاب والترفيه','Games & fun','Jeux et divertissement')+'</h2>'+
'<div class="grid"><button class="tile" id="go_g5">'+L('تحدي الـ 5 ثوانٍ','5-second challenge','Défi 5 secondes')+'</button>'+
'<button class="tile" id="go_fact">'+L('حقيقة أم خرافة؟','Fact or myth?','Vrai ou faux ?')+'</button>'+
'<button class="tile" id="go_choice">'+L('اختيارات صعبة','Would you rather','Choix difficiles')+'</button></div>';
$('bk_games').onclick=function(){show(null);};
$('go_g5').onclick=function(){show('t_g5');};
$('go_fact').onclick=function(){show('t_fact');};
$('go_choice').onclick=function(){show('t_choice');};
buildG5();buildFact();buildChoice();
}
function buildG5(){
panel('t_g5',L('تحدي الـ 5 ثوانٍ','5-second challenge','Défi 5 secondes'),
'<div class="out" id="g5Q"></div><div class="big" id="g5T">5</div>'+
'<div class="row"><button class="btn" id="g5S">'+L('ابدأ','Start','Démarrer')+'</button></div>'+
'<div id="g5A" style="display:none"><label>'+L('كم شيئاً ذكرت؟','How many did you name?','Combien en avez-vous cités ?')+'</label>'+
'<input id="g5I" inputmode="numeric"><button class="btn g" id="g5C">'+L('تحقق','Check','Vérifier')+'</button></div>'+
'<div class="out" id="g5O"></div>');
$('g5S').onclick=function(){
clearInterval(G5.id);G5.left=5;
out('g5Q',pick(PROMPTS)());out('g5T','5');out('g5O','');$('g5A').style.display='none';$('g5I').value='';
G5.id=setInterval(function(){
G5.left--;out('g5T',String(G5.left));
if(G5.left<=0){clearInterval(G5.id);G5.id=null;out('g5T','0');$('g5A').style.display='block';
out('g5O',L('الوقت انتهى! كم شيئاً ذكرت؟','Time is up! How many did you name?','Temps écoulé ! Combien en avez-vous cités ?'));
if(navigator.vibrate)navigator.vibrate([300,150,300]);}
},1000);
};
$('g5C').onclick=function(){
var n=parseInt($('g5I').value,10);
if(isNaN(n)||n<0){out('g5O',L('أدخل رقماً صحيحاً','Enter a valid number','Entrez un nombre valide'));return;}
out('g5O',n>=3?L('أحسنت! نجحت في التحدي','Well done! You passed','Bravo ! Défi réussi'):L('حاول مرة أخرى','Try again','Réessayez'));
};
}
function factTxt(){var f=FACTS[FC.i];return f[lang]||f.en;}
function factX(){var f=FACTS[FC.i];return f.x[lang]||f.x.en;}
function nextFact(){
var i;do{i=Math.floor(Math.random()*FACTS.length);}while(FACTS.length>1&&i===FC.i);
FC.i=i;out('fQ',factTxt());out('fX','');
}
function answer(v){
if(FC.i<0)nextFact();
var f=FACTS[FC.i],ok=(f.t===v);
out('fX',(ok?L('إجابة صحيحة! ','Correct! ','Bravo ! '):L('إجابة خاطئة. ','Wrong. ','Faux. '))+(f.t?L('إنها حقيقة.','It is a fact.','C\'est vrai.'):L('إنها خرافة.','It is a myth.','C\'est faux.'))+'\n'+factX());
}
function buildFact(){
panel('t_fact',L('حقيقة أم خرافة؟','Fact or myth?','Vrai ou faux ?'),
'<div class="out" id="fQ"></div><div class="out" id="fX" style="font-size:15px;min-height:0"></div>'+
'<div class="row"><button class="btn" id="fT">'+L('حقيقة','Fact','Vrai')+'</button><button class="btn g" id="fF">'+L('خرافة','Myth','Faux')+'</button></div>'+
'<div class="row"><button class="btn g" id="fN">'+L('التالي','Next','Suivant')+'</button></div>');
$('fT').onclick=function(){if(FC.i<0)nextFact();answer(true);};
$('fF').onclick=function(){if(FC.i<0)nextFact();answer(false);};
$('fN').onclick=nextFact;
nextFact();
}
function chTxt(s){return s[lang]||s.en;}
function chDraw(){
var c=CHOICES[CH.i],v=gj('gc_votes',{}),cnt=v['c'+CH.i]||[0,0],tot=cnt[0]+cnt[1];
out('cQ',L('ماذا تفضّل؟','Which would you choose?','Que choisissez-vous ?'));
$('cA').textContent=chTxt(c.a);$('cB').textContent=chTxt(c.b);
out('cR',tot?L('أصوات هذا الجهاز: ','Votes on this device: ','Votes sur cet appareil : ')+Math.round(cnt[0]/tot*100)+'% / '+Math.round(cnt[1]/tot*100)+'%':'');
}
function chNext(){var i;do{i=Math.floor(Math.random()*CHOICES.length);}while(CHOICES.length>1&&i===CH.i);CH.i=i;chDraw();}
function vote(side){
if(CH.i<0)chNext();
var v=gj('gc_votes',{}),k='c'+CH.i;v[k]=v[k]||[0,0];v[k][side]++;sj('gc_votes',v);chDraw();
}
function buildChoice(){
panel('t_choice',L('اختيارات صعبة','Would you rather','Choix difficiles'),
'<div class="note" id="cQ"></div><button class="btn" id="cA" style="width:100%;white-space:normal;margin:6px 0"></button>'+
'<button class="btn g" id="cB" style="width:100%;white-space:normal;margin:6px 0"></button>'+
'<div class="out" id="cR"></div><div class="row"><button class="btn g" id="cN">'+L('سؤال آخر','Another','Autre')+'</button></div>'+
'<div class="note">'+L('النسب تُحسب من أصوات هذا الجهاز فقط','Percentages are based on votes from this device only','Pourcentages basés uniquement sur les votes de cet appareil')+'</div>');
$('cA').onclick=function(){vote(0);};
$('cB').onclick=function(){vote(1);};
$('cN').onclick=chNext;
chNext();
}
var _prevG=setLang;
setLang=function(l){_prevG(l);ensure();};
ensure();
})();
